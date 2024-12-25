# gatsby-sanity-portfolio

A portfolio using structured content from [Sanity.io](https://www.sanity.io), [Gatsby.js](https://gatsbyjs.org) as a static site builder, [Rive](https://rive.app/) for the loading screen and hosted on [Cloudflare](https://cloudflare.com)

Website: [![Cloudflare Status](https://img.shields.io/endpoint?url=https://cloudflare-pages-badges.sevimuelli.workers.dev/?projectName=portfolio-sanity-studio)](https://dash.cloudflare.com/2708a979cf023e53d8ea05ee254fc093/pages/view/portfolio-website) Studio: [![Cloudflare Status](https://img.shields.io/endpoint?url=https://cloudflare-pages-badges.sevimuelli.workers.dev/?projectName=portfolio-sanity-studio)](https://dash.cloudflare.com/2708a979cf023e53d8ea05ee254fc093/pages/view/portfolio-sanity-studio)

This badges are made with shields.io: [cloudflare-pages-badges](https://github.com/aidenwallis/cloudflare-pages-badges)

![demo](https://raw.githubusercontent.com/sevimuelli/gatsby-sanity-portfolio/master/web/src/images/og.png)

## Quick start

1. Clone this repository from your GitHub account
2. `npm install` in the project root folder on local
3. `npm run dev` to start the Studio and frontend locally
    - Your Studio should be running on [http://localhost:3333](http://localhost:3333)
    - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally

## Enable real-time content preview in development

1. Go to your [project’s API settings on manage.sanity.io](https://manage.sanity.io/projects/34stovf0/settings/api) and create a token with read rights.
2. Copy `.env.development.template` to `.env.development` and paste in the token: `SANITY_READ_TOKEN="yourTokenHere"`.
3. Restart the development server (`ctrl + C` and `npm run dev`).

If you want to disable the preview you can set `watchMode: false` in gatsby-config.js. If you just want to preview published changes you can set `overlayDrafts: false` in gatsby-config.js.

## Color Reference

| Color          | Hex                                                                |
| -------------- | ------------------------------------------------------------------ |
| Navy           | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Light Navy     | ![#172a45](https://via.placeholder.com/10/0a192f?text=+) `#172a45` |
| Dark Grey      | ![#333f58](https://via.placeholder.com/10/333f58?text=+) `#333f58` |
| Slate          | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Light Slate    | ![#a8b2d1](https://via.placeholder.com/10/a8b2d1?text=+) `#a8b2d1` |
| Lightest Slate | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |
| White          | ![#e6f1ff](https://via.placeholder.com/10/e6f1ff?text=+) `#e6f1ff` |
| Green          | ![#64ffda](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |
