import { getPlayAgainButton, getTimerElement } from "./selector.js";
export const getRandomColorPairs = (count) => {
  const colorList = [];
  const hueList = ["red", "orange", "green", "yellow", "pink", "monochrome"];
  // random "count"colors
  for (let i = 0; i < count; i++) {
    const color = window.randomColor({
      luminosity: "dark",
      hue: hueList[i % hueList.length],
    });
    colorList.push(color);
  }
  const fullColorList = [...colorList, ...colorList].sort(
    () => 0.5 - Math.random()
  );
  return fullColorList;
};
export function showPlayingAgainButton() {
  const playAgainButton = getPlayAgainButton();
  playAgainButton.classList.add("show");
}
export function hidePlayingAgainButton() {
  const playAgainButton = getPlayAgainButton();
  playAgainButton.classList.remove("show");
}
export function setTimerText(text) {
  const timerElement = getTimerElement;
  timerElement.textContent = text;
}
