import { deleteComments } from "./services/deleteComments";
import { getDeleteButtons } from "./utils/getDeleteButtons";

declare const MIN_KARMA: number;

(async () => {
    const btns = getDeleteButtons({ minKarma: MIN_KARMA })
    
    if (btns.length) await deleteComments({ btns })

    if (document.querySelector("a[rel='nofollow next']")) {
        console.log(`${btns.length} comments deleted. Continuing with next page.`)
        
        setTimeout(() => {
            const nextBtn = document.querySelector("a[rel='nofollow next']") as HTMLAnchorElement
            
            if (nextBtn) nextBtn.click()
        }, 2000)
    }
})()
