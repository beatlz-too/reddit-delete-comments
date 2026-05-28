export const goToNextPage = ({ totalComments, minKarma }: Record<string, number>) => {
    if (!document.querySelector("a[rel='nofollow next']")) return

    console.log(
        totalComments
            ? `${totalComments} comments deleted.`
            : `No comments met with less than ${minKarma}`
    )
    setTimeout(() => {
        const nextBtn = document.querySelector("a[rel='nofollow next']") as HTMLAnchorElement
        
        if (nextBtn) nextBtn.click()
    }, 2000)
}
