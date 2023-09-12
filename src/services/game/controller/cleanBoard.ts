export function cleanBoard() {
  console.log('cleanBoard')

  const elTds = document.querySelectorAll('.mark, .selected, .eatable, .castle')
  for (let i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected', 'eatable', 'castle')
  }
}
