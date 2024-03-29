# Chatter

The frontend part of a simple chat app with weather API. Check out the backend part [here](https://github.com/ignaspangonis/chatter-service).

## Screenshots and recordings

https://github.com/ignaspangonis/chatter/assets/60753755/a9f017b1-a1b8-4161-ab0d-1a604c98bdad

<img width="504" alt="image" src="https://github.com/ignaspangonis/chatter/assets/60753755/1dc50961-9791-44a6-a781-b4ad3182e2a8">

## Prerequisites

1. Run `npm -v` to make sure you have `npm` installed. [Read more about npm](https://docs.npmjs.com/getting-started).
2. Since this is the frontend app, before running it you first need to pull and run the [backend app](https://github.com/ignaspangonis/chatter-service/).
    - For example, if the backend project is in the same directory as your frontend project, you can use this script to run the backend server (with DB) with `brew` on macOS:

```
cd .. && cd ChatterService && cd ChatterService && brew services start mongodb-community && dotnet run
```

or

```
npm run start-server
```


## Install and run

In the project directory, run:

1. `npm install` to install dependencies.

2. `npm start` to run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Other available scripts

### `npm test -- --watchAll`

Runs all tests in the project.

### `npm test --watch [test name substring]`

Runs the tests that match the provided test substring.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run stop-db`
Stops MongoDB (community edition, using `brew`).

## TODOs

There are some things that I could have done better, have I had more time or put more thought into it. Below is the checklist of things I can improve.

- [ ] Implement auth (incl. admin functionality)
- [ ] Make user and room validation more robust
- [ ] Migrate to `pnpm`
- [ ] Migrate to `nextjs`
