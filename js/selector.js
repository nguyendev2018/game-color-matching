const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
export const getTimerElement = $(".game .game__timer");
export const getColorBackground = $(".color-background");
export const colorList = $("#colorList");
export function ListElement() {
  return $$("#colorList > li");
}
export function getActiveColor() {
  return $$("#colorList > li:not(.active)");
}
export function getPlayAgainButton() {
  return $(".game .game__button");
}
