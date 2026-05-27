export const deleteComments = ({ btns }: { btns: HTMLAnchorElement[] }) => {
    btns.forEach(btn => btn.click())

    const confirmDeleteBtns = document.querySelectorAll("span.option.error.active > a.yes")

    return new Promise<void>(resolve => {
        let i = 0
        const interval = setInterval(() => {
            if (confirmDeleteBtns[i]) {
                (<HTMLAnchorElement>confirmDeleteBtns[i]).click()
            }

            i++

            if (i === btns.length) {
                clearInterval(interval)
                resolve()
            }
        }, 500)
    })
}
