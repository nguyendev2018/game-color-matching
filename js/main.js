import { COLOR_COUNT, COLOR_DIV } from './constant.js';
import { colorList, getActiveColor, getPlayAgainButton, ListElement } from './selector.js';
import { getRandomColorPairs, hidePlayingAgainButton, setTimerText, showPlayingAgainButton } from './utils.js';
import { GAME_STATUS } from './constant.js'
let selections = [];
let gameStatus = GAME_STATUS.PLAY;
function renderColor() {
    let content = ""
    for (let i = 0; i < COLOR_DIV; i++) {
        content += `<li>
        <div class="overlay"></div>
      </li>`
    }
    colorList.innerHTML = content;
    showColor()
}
function showColor() {
    let getColor = getRandomColorPairs(COLOR_COUNT);
    let listElement = ListElement();

    listElement.forEach((item, index) => {
        item.dataset.color = getColor[index]
        let getItem = item.querySelector(".overlay");
        getItem.style.background = getColor[index];
    });
}
function activeColor() {
    colorList.addEventListener("click", function (e) {
        let shouldItem = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus);
        let itemNode = e.target.closest("#colorList >li");

        if (!itemNode || shouldItem) return
        itemNode.classList.add("active");
        selections.push(itemNode);
        if (selections.length < 2) return;

        let firstColor = selections[0].dataset.color;
        let secondColor = selections[1].dataset.color;
        const isMatch = firstColor === secondColor;
        if (isMatch) {
            selections = [];
            const isWin = getActiveColor().length === 0;
            if (isWin) {
                showPlayingAgainButton();
                setTimerText("YOU WIN")
            }
            return
        }
        gameStatus = GAME_STATUS.BLOCKING;
        setTimeout(() => {
            selections[0].classList.remove("active");
            selections[1].classList.remove("active");
            selections = [];
            gameStatus = GAME_STATUS.PLAY
        }, 500)

    })
}
function resetGame() {
    gameStatus = GAME_STATUS.PLAYING;
    selections = [];
    const liElement = ListElement();
    for (const key of liElement) {
        key.classList.remove("active");
    }
    hidePlayingAgainButton();
    setTimerText("");
    renderColor()
}
function playAgainButton() {
    const ButtonPlayAgain = getPlayAgainButton();
    ButtonPlayAgain.addEventListener("click", resetGame);
}
; (() => {
    renderColor();
    activeColor();
    playAgainButton();
})()