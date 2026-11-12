// A physical horizontal distance (a swipe's clientX delta, an arrow key's ±1)
// along the inline axis: positive toward the end (next), negative toward the
// start (previous). The one direction check the blocks need: layout itself
// uses logical CSS (start/end) and needs none.
export function inlineX(el, dx) {
  return getComputedStyle(el).direction === "rtl" ? -dx : dx;
}
