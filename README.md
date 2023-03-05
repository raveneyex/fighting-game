# A Simple JS Fighting Game using HTML Canvas

It's been a while since I coded for fun and I needed the reminder that coding is awesome and creative and relaxing so I decided to follow along a gamedev [tutorial](https://www.youtube.com/watch?v=vyqbNFMDRGQ) that the Youtube algorithm threw at me. But since I am first and foremost a software engineer, I decided to spice things a bit and not follow the tutorial exactly: instead of Javascript for the code I decided to use Typescript and since _that_ introduced the need for code transpilation, I thought that I might as well go full over-engineering and add Webpack for the bundling —specially the asset handling— and the dev-server with hot-reloading.

Previous to this project I had only coded a game once before: It was a Hackaton at one of my previous jobs. The game was a small, ASOIAF-inspired project called [Queen of Westeros](https://github.com/slashman/queenOfWesteros). It was made under the tutelage of the amazing [@slashman](https://github.com/slashman) —who is **truly** a master game-maker. However, that game used React for the UI and lacked any kind of Canvas animations. So I took this opportunity to glimpse what is like to make a game that uses HTML Canvas and performs animations using sprite assets. This is the result.

## Acknowledgements & Credits

This game was created while following along [this tutorial](https://www.youtube.com/watch?v=vyqbNFMDRGQ) made by [@chriscourses](https://github.com/chriscourses/).

It uses the following assets:

- Player 1 is [Martial Hero 1](https://luizmelo.itch.io/martial-hero) made by [Luiz Melo](https://luizmelo.itch.io/)
- Player 2 is [Martial Hero 2](https://luizmelo.itch.io/martial-hero-2) made by [Luiz Melo](https://luizmelo.itch.io/)
- The Shop and Background images were provided by [@chriscourses](https://github.com/chriscourses/) without attribution. If you know who the author(s) is/are please let me know (or add a Pull-Request with the addition of their links).
- The font is [Press Start](https://fonts.google.com/specimen/Press+Start+2P?query=press+start) made available by [Google Fonts](fonts.google.com)

## Tech Stack

- Typescript
- Webpack
- gsap
- prettier

Run `yarn install && yarn start` to execute in dev mode.
