![simonheys-com-recording](https://user-images.githubusercontent.com/175607/133434380-80ee4a97-912f-4f5e-a706-512cbca47b72.gif)

# simonheys.com

Source for my personal site [simonheys.com](https://www.simonheys.com/)

## Getting Started

Install [pnpm](https://pnpm.io/), then install dependencies and run the development server:

```
$ pnpm install
$ pnpm dev
```

The site is available on [localhost:3000](http://localhost:3000/)

## Developing locally with wordclock

```
"pnpm": {
    "overrides": {
        "@simonheys/wordclock": "file:../wordclock/packages/wordclock-js",
        "@simonheys/wordclock-words": "file:../wordclock/packages/wordclock-words"
    }
}
```

## License

[MIT](LICENSE)
