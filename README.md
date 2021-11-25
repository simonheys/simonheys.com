![simonheys-com-recording](https://user-images.githubusercontent.com/175607/133434380-80ee4a97-912f-4f5e-a706-512cbca47b72.gif)

# simonheys.com

Source for my personal portfolio site [simonheys.com](https://www.simonheys.com/)

## Getting Started

Install dependencies and run the development server

```
$ yarn
$ yarn dev
```

The site is available on [localhost:3000](http://localhost:3000/)

## Design

I designed and built the site entirely in browser, aiming for a lightweight design system of reusable [React](https://reactjs.org/) components making up each page. I wanted a simple layout and style that would not detract from the content, using the device system font and a very simple 2-column grid (collapsing to single column on smaller devices) with 16:9 picture proportions.

## Content

Pages and their components are described in [`/src/content`](/src/content) as YAML and Markdown for legibility and ease of editing. For compatibility with Next.js the YAML is converted to monolithic JSON at build time.

One single page source [`/src/pages/[[...slug]].tsx`](/src/pages/[[...slug]].tsx) renders each page according to the slug and the components described in the YAML. The component mappings are in [`/src/components/Components.tsx`](/src/components/Components.tsx)

A simple API can be found in [`/src/pages/api/words`](/src/pages/api/words) which provides an index and serves the json configuration files for Word Clock.

The site also derives a JSON catalogue of image properties (width, height and background colour) which make life a little easier when using Next.js `Image`.

## Technology

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and deploying to [Vercel](https://vercel.com/). Some animations are driven by [Framer Motion](https://github.com/framer/motion). Styling selectively uses [Bootstrap](https://getbootstrap.com/) SASS with added CSS variables and automatic dark mode.

## Scripts

Regenerate all derived content - icons, content and properties JSON

```
$ yarn generate
```

## License

[MIT](LICENSE)
