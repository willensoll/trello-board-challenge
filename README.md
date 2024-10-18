

# Core App functionality (Challenge requirements)
- A user can add and label columns.
- A user can  add and edit cards.
- A user can  move cards between columns.
- A users board is persisted in Localstorage
- Do make sure the available interactions are intuitive. In other words, we will be considering usability.
- Persistence in LocalStorage

## Additional Implemented Functionality

- Delete card / column.
- Drag and drop cards
- Dockerized the solution (see below for instructions)
  - Accessibility / quality of life
    - Colors WCAG 2.1 AA based on a contrast ratio of 4.5:1, 
    - Enter keypress on inputs to save where applicable
    - Able to navigate and interact with board using just the keyboard
    - Click outside to close modal

##Constraints
- 4 Hours
- No react libs

## Given more time...

- Codebase
  - Structure CSS better, variables, inheritance. (I was not clear on whether or not i was allowed to use a library like emotion so opted for bare bones CSS-IN-JS. On reflection, not sure what it's proved.) 
  - Evaluate if i can Enhance Types / interfaces
  - Evaluate if i can enhance unit tests 
  - Optimise for Screenreader
- Features I hoped to implement
  - Set card / column order with drag & drop - (drag and drop is set up, needs to be implemented at a column level)
  - Enrich cards with more data / editable options (tags, assigned user, etc)
  - Mobile view??! 
  

# Running the solution

# Node

In the project directory, you can run:


### `npm i`

To install dependencies if neccesary 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Docker

To run the application using Docker:

1. Build the docker image

### ```docker build -t trello-board .```

2. Run the docker container

### ```docker run -p 80:80 trello-board```

The application will be available at http://localhost.




