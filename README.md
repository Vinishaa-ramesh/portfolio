# Vinishaa K R Portfolio

A single-page React portfolio built with Vite, Framer Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

## Resume

Replace `public/resume.pdf` with the latest resume to update the Download Resume link.

## Projects

Project entries are managed in `src/data/portfolio.js`. Add an object to the `projects` array with the fields in `projectTemplate` to create a project card. Image previews use a fixed 16:9 aspect ratio.

## Deploy on Netlify (Free plan)

1. Push the project to a Git provider supported by Netlify.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Use these build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Choose Netlify's Free plan and deploy the site.
5. For future updates, push to the connected branch; Netlify will build and publish the site automatically.

To preview a production build locally:

```bash
npm run build
npm run preview
```
