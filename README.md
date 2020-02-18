https://stats-chat.herokuapp.com/

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dpacosta/chat-stats)


This AngularJS app is a simple file upload tool that sends a [JSON Lines](http://jsonlines.org)
 file to a Node.js server for data processing and then builds a chart with the output [ngx-charts](https://swimlane.github.io/ngx-charts) library.

The file represents a lengthy chat conversation that was processed by another system.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `npm test` to execute the server's unit tests.

## Build & Run

Run `ng build && npm start` to build and run the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# How to use

## Upload

You can find a `data_example.json` file on the root folder. It contains the shape of the data that must be uploaded. Upload a file like that on the following page:

<img src=https://i.imgur.com/u95CfrY.png>

## Chart

The file will be sent to the server and processed. Wait a couple seconds while page loads, the following chart will show up.
You can place the cursor on the chart and scroll left to show more information.

<img src=https://imgur.com/wSBdJOP.png>
