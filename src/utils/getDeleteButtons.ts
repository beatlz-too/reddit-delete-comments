export const getDeleteButtons = ({ minKarma }: { minKarma: number } = { minKarma: 10 }) => {
    const commentElements = document.querySelectorAll("[data-type='comment']")
    const deleteButtons: HTMLAnchorElement[] = []

    Object.entries(commentElements).forEach(([_, commentElement]) => {
        const el = commentElement.querySelector(".score.likes") as HTMLDivElement
        const karma = Number(el?.innerText.replace(/[^\d.-]/g, ''))
        const deleteButton = commentElement.querySelector("[data-event-action='delete']") as HTMLAnchorElement

        if (karma < minKarma) deleteButtons.push(deleteButton)
    })

    return deleteButtons
}
