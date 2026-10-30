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

// ----- Fade sections in as you scroll -----
const revealTargets = document.querySelectorAll<HTMLElement>(
  '.section-label, .section-title, .section-subtitle, .about-text, .info-card, .skill-card, .project-card, .timeline-item, .contact-item, .doc-links, .education-grid > *, .gallery-grid a'
)

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)

revealTargets.forEach((el) => {
  const index = Array.from(el.parentElement!.children).indexOf(el)
  el.style.setProperty('--d', `${(index % 4) * 0.1}s`)
  el.classList.add('reveal')
  revealObserver.observe(el)
})

// ----- Count up the numbers in the hero -----
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const target = Number(el.dataset.count)
  let current = 0
  setTimeout(() => {
    const timer = setInterval(() => {
      current += 1
      el.textContent = String(current)
      if (current >= target) clearInterval(timer)
    }, Math.round(1200 / target))
  }, 600)
})