export function cleanBoard() {
  // console.log('cleanBoard')
  const elTds = document.querySelectorAll('.mark, .selected, .eatable, .castle')
  for (let i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected', 'eatable', 'castle')
    // Remove any legacy dot spans that might have been inserted previously
    const dotSpans = elTds[i].querySelectorAll('span.span')
    dotSpans.forEach((el) => el.parentElement && el.parentElement.removeChild(el))
  }
}
