# **Pipe Puzzle Game Challenge**

## Level passwords obtained

1. First Level password: `JustWarmingUp`
2. Second Level password: `DefinitelyWarm`

## Known Limitations of the solution

### Basic Architecture

I used **very basic architecture**.
For my opinion, it's good and usefull for fast development of small applications. State management & Side Effects management (in this case Websocket calls & Local storage interactions) were implemented inside "containers" (view components).

Once application has a chance to grow up, state management should go to Redux (or similar) and Side effects should be manged in services.

### Using React-konva

For faster implementation of canvas, I used **React-Konva** 3-rd party. I can imagine, that performance of canvas without konva, will be better.

### UX limitations

Scrolling of the big level maps should be changed to drag & drop, for better usability (now it implemented with buttons).
Animations should be added for better user experience.

## Design (Architecture) decisions

1. Lightweight & fast development implementation, using Hooks & Function Components
2. State management in 'Container' components instead of implementation of Redux Store
3. Websocket communications troughs hook, and not full service implementation
4. SCSS Modules for styling with basic theme & utils imported in each module
5. Kanva for rendering game canvas

## To run the game

### clone repository from `git@github.com:romanro/pipe-puzzle-game.git`

### `yarn install`

To install all dependencies

### `yarn start`

Runs the game in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Game demo

You can see this Game [Demo Published on Surge](http://puzzle-challenge.surge.sh/)
