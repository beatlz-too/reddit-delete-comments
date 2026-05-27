type WaitForElementOptions = {
  parentElement?: Element | Document
  timeout?: number
  selector: string
}

export const waitForElement = (
  options: WaitForElementOptions
): Promise<Element> => {
  const {
    parentElement = document,
    timeout = 10000,
    selector,
  } = options

  return new Promise((resolve, reject) => {
    const found = parentElement.querySelector(selector)
    if (found) return resolve(found)

    const observer = new MutationObserver(() => {
      const el = parentElement.querySelector(selector)
      if (el) {
        observer.disconnect()
        clearTimeout(timer)
        resolve(el)
      }
    })

    const timer = setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Timed out waiting for ${selector}`))
    }, timeout)

    observer.observe(parentElement, {
      childList: true,
      subtree: true,
    })
  })
}
