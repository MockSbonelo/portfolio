import './style.scss'

const root = document.documentElement
const toggleBtn = document.querySelector<HTMLButtonElement>('#theme-toggle')!

// Load saved preference, default to dark
const savedTheme = localStorage.getItem('theme') || 'dark'
if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light')
  toggleBtn.textContent = '☀️'
}

toggleBtn.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light'
  if (isLight) {
    root.removeAttribute('data-theme')
    toggleBtn.textContent = '🌙'
    localStorage.setItem('theme', 'dark')
  } else {
    root.setAttribute('data-theme', 'light')
    toggleBtn.textContent = '☀️'
    localStorage.setItem('theme', 'light')
  }
})