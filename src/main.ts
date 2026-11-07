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

// ----- Responsive navigation -----
const navbar = document.querySelector<HTMLElement>('.navbar')
const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
const primaryNavigation = document.querySelector<HTMLElement>('#primary-navigation')

if (navbar && menuToggle && primaryNavigation) {
  const setMenuOpen = (isOpen: boolean) => {
    navbar.classList.toggle('menu-open', isOpen)
    menuToggle.setAttribute('aria-expanded', String(isOpen))
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation')
  }

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true')
  })
  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false))
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false)
      menuToggle.focus()
    }
  })
  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !navbar.contains(event.target)) setMenuOpen(false)
  })
}

// ----- Highlight the section currently in view -----
const sectionLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a')
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      sectionLinks.forEach((link) => {
        const isActive = link.hash === `#${entry.target.id}`
        link.classList.toggle('is-active', isActive)
        if (isActive) {
          link.setAttribute('aria-current', 'location')
        } else {
          link.removeAttribute('aria-current')
        }
      })
    })
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
)

document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => {
  sectionObserver.observe(section)
})

// ----- Back-to-top control -----
const backToTop = document.querySelector<HTMLAnchorElement>('.back-to-top')
if (backToTop) {
  const updateBackToTop = () => {
    backToTop.hidden = window.scrollY < 500
  }

  window.addEventListener('scroll', updateBackToTop, { passive: true })
  updateBackToTop()
}

// ----- Fade sections in as you scroll -----
const revealTargets = document.querySelectorAll<HTMLElement>(
  '.section-label, .section-title, .section-subtitle, .about-text, .info-card, .skill-card, .project-card, .credential-card, .timeline-item, .contact-item, .doc-links, .education-grid > *, .gallery-carousel'
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

// ----- Graduation photo slideshow -----
const gallery = document.querySelector<HTMLElement>('.gallery-carousel')
const galleryImage = gallery?.querySelector<HTMLImageElement>('.gallery-image')
const galleryLink = gallery?.querySelector<HTMLAnchorElement>('.gallery-image-link')
const galleryCount = gallery?.querySelector<HTMLElement>('[data-gallery-count]')
const gallerySlides = [
  {
    src: '/images/gallery/gallery-1.jpg',
    alt: 'Sbonelo Nhlebela in his graduation gown and cap on the university lawn',
  },
  {
    src: '/images/gallery/gallery-2.jpg',
    alt: 'Close-up of Sbonelo Nhlebela in graduation gown and cap',
  },
  {
    src: '/images/gallery/gallery-3.jpg',
    alt: 'Sbonelo Nhlebela posing in graduation attire under a blue sky',
  },
  {
    src: '/images/gallery/gallery-4.jpg',
    alt: 'Sbonelo Nhlebela checking his watch in graduation attire',
  },
]

if (gallery && galleryImage && galleryLink && galleryCount) {
  const slideButtons = gallery.querySelectorAll<HTMLButtonElement>('[data-gallery-slide]')
  let currentSlide = 0

  const showSlide = (index: number) => {
    currentSlide = (index + gallerySlides.length) % gallerySlides.length
    const slide = gallerySlides[currentSlide]

    galleryImage.src = slide.src
    galleryImage.alt = slide.alt
    galleryLink.href = slide.src
    galleryLink.style.setProperty('--gallery-backdrop', `url("${slide.src}")`)
    galleryCount.textContent = `${currentSlide + 1} / ${gallerySlides.length}`

    slideButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === currentSlide) {
        button.setAttribute('aria-current', 'true')
      } else {
        button.removeAttribute('aria-current')
      }
    })

    galleryImage.classList.remove('is-changing')
    requestAnimationFrame(() => galleryImage.classList.add('is-changing'))
  }

  gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => {
    showSlide(currentSlide - 1)
  })
  gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => {
    showSlide(currentSlide + 1)
  })
  slideButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showSlide(Number(button.dataset.gallerySlide))
    })
  })
  gallery.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showSlide(currentSlide - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      showSlide(currentSlide + 1)
    }
  })
}

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