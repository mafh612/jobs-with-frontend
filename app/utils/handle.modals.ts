export const closeModal = (id: string) => {
  const backdrop: null | HTMLElement = document.getElementById('backdrop')
  if (backdrop) {
    backdrop.style.display = 'none'
  }
  document.getElementById(id)?.classList.remove('show')
}
