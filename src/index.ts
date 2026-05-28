import { deleteComments } from "./services/deleteComments";
import { goToNextPage } from "./services/goToNextPage";
import { getDeleteButtons } from "./utils/getDeleteButtons";

declare const MIN_KARMA: number;

(async () => {
    const btns = getDeleteButtons({ minKarma: MIN_KARMA })
    await deleteComments({ btns })
    goToNextPage({ totalComments: btns.length, minKarma: MIN_KARMA })
})()
