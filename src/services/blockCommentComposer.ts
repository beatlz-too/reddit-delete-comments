// Reddit renders most of its UI inside shadow roots, so a page-level stylesheet
// can't reach these elements. We inject the same stylesheet into every shadow
// root (including closed ones) as soon as it exists.
const HIDDEN_SELECTORS = [
    "shreddit-async-loader[bundlename='comment_composer']",
    "comment-composer-host",
    "button.rpl-cab:has(svg[icon-name='comment'])",
]

// One rule per selector: an unsupported selector would invalidate a whole selector list
const sheet = new CSSStyleSheet()
HIDDEN_SELECTORS.forEach(selector => {
    try {
        sheet.insertRule(`${selector} { display: none !important; }`)
    } catch (err) {
        console.warn(`Unsupported selector: ${selector}`, err)
    }
})

const watchedRoots = new WeakSet<Document | ShadowRoot>()

// Reddit's components (Lit) overwrite adoptedStyleSheets after attaching a shadow
// root, which would drop our sheet. Make sure it is always kept.
const keepSheetAdopted = (proto: Document | ShadowRoot) => {
    const descriptor = Object.getOwnPropertyDescriptor(proto, "adoptedStyleSheets")
    if (!descriptor?.set) return

    Object.defineProperty(proto, "adoptedStyleSheets", {
        ...descriptor,
        set(this: Document | ShadowRoot, sheets: CSSStyleSheet[]) {
            descriptor.set!.call(this, sheets.includes(sheet) ? sheets : [...sheets, sheet])
        },
    })
}

const observer = new MutationObserver(records => {
    records.forEach(record => {
        // Declarative shadow roots get attached to the host after it's inserted
        if (record.target instanceof Element) watchShadowRoot(record.target)

        record.addedNodes.forEach(node => {
            if (node instanceof Element) sweep(node)
        })
    })
})

const watchRoot = (root: Document | ShadowRoot) => {
    if (watchedRoots.has(root)) return
    watchedRoots.add(root)

    if (!root.adoptedStyleSheets.includes(sheet)) {
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet]
    }
    observer.observe(root, { childList: true, subtree: true })
    sweep(root)
}

const watchShadowRoot = (el: Element) => {
    if (el.shadowRoot) watchRoot(el.shadowRoot)
}

const sweep = (node: Element | Document | ShadowRoot) => {
    if (node instanceof Element) watchShadowRoot(node)
    node.querySelectorAll("*").forEach(watchShadowRoot)
}

export const blockCommentComposer = () => {
    keepSheetAdopted(Document.prototype as unknown as Document)
    keepSheetAdopted(ShadowRoot.prototype as unknown as ShadowRoot)

    // Catches every programmatically created shadow root, open or closed
    const attachShadow = Element.prototype.attachShadow
    Element.prototype.attachShadow = function (init: ShadowRootInit) {
        const root = attachShadow.call(this, init)
        watchRoot(root)
        return root
    }

    watchRoot(document)
    console.info("[reddit-comment-delete] blocking comment composer and Reply buttons")
    document.addEventListener("DOMContentLoaded", () => sweep(document))
}
