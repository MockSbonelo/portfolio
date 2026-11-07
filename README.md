# Sbonelo Nhlebela | Developer Portfolio

A responsive, single-page portfolio showcasing my skills, projects and experience as a Computer Systems Engineering graduate with a background in full-stack development, networking and embedded systems.

**Live site:** [https://your-site-name.netlify.app](https://your-site-name.netlify.app)

---

## Features

- **Single-page layout** with smooth-scrolling navigation between sections
- **Light and dark mode** toggle, with the chosen theme remembered between visits
- **Fully responsive** design that adapts to desktop, tablet and mobile screens
- **Themed with CSS variables**, so colours can be changed in one place
- **Sections:** Hero, About, Skills, Projects, Experience and Contact
- **Automatic deployment** to Netlify on every push to `main`

## Tech Stack

| Area        | Tools                                  |
| ----------- | -------------------------------------- |
| Language    | TypeScript, HTML5                      |
| Styling     | SCSS (Sass) with CSS custom properties |
| Build tool  | Vite                                   |
| Hosting     | Netlify (continuous deployment)        |
| Version control | Git and GitHub                     |

## Project Structure

```
portfolio/
├── public/            # Static assets (favicon, icons)
├── src/
│   ├── main.ts        # Theme toggle logic
│   └── style.scss     # All styling and theme variables
├── index.html         # Page structure and content
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 20.19 or higher (or 22.12+)
- npm (included with Node.js)
- Git

### Run locally

```bash
# Clone the repository
git clone https://github.com/MockSbonelo/portfolio.git

# Move into the project folder
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173/` and reloads automatically as you edit files.

### Build for production

```bash
npm run build
```

This creates an optimised `dist/` folder ready to deploy.

### Preview the production build

```bash
npm run preview
```

## Deployment

The site is deployed on **Netlify** and connected to this repository. Any push to the `main` branch triggers an automatic rebuild and deploy.

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Publish directory | `dist`          |

## Customising

- **Content:** edit the sections in `index.html`
- **Colours and theme:** change the CSS variables at the top of `src/style.scss` (`:root` for dark mode, `[data-theme="light"]` for light mode)
- **Behaviour:** the theme toggle lives in `src/main.ts`

## About Me

I'm a Computer Systems Engineering graduate from Tshwane University of Technology with hands-on experience in front-end development (Angular, Bootstrap), responsive design, QA testing and networking. I'm adaptable, quick to learn, and always looking for opportunities to grow.

## Contact

- **Email:** sbonelonhlebela02@gmail.com
- **LinkedIn:** [linkedin.com/in/sbonelo-nhlebela-70a562331](https://linkedin.com/in/sbonelo-nhlebela-70a562331)
- **GitHub:** [github.com/MockSbonelo](https://github.com/MockSbonelo)

---

&copy; 2026 Sbonelo Nhlebela
