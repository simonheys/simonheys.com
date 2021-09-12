# simonheys.com

Source for [simonheys.com](https://www.simonheys.com/)

## Getting Started

Install dependencies and run the development server:

```
$ yarn
$ yarn dev
```

The site is available on [localhost:3000](http://localhost:3000/)

## About

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Some animations are driven by [Framer Motion](https://github.com/framer/motion)

The site has a lightweight design system of reusable components which make up each page. Pages and their components are described in `/src/content` as yaml for legibility. For compatibility with Next.js the yaml is converted to monolithic json at build time.

One single page source `/src/pages/[[...slug]].js` renders each page according to the slug and the components described in the yaml. The component mappings are in `/src/components/Components.js`

A simple API can be found in `/src/pages/words/` which provides an index and serves the json configuration files for Word Clock.

## Scripts

Regenerate all content - icons, json, image properties

```
$ yarn generate
```

## License

[MIT](LICENSE)
