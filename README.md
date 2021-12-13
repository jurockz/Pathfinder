# Pathfinding Projekt

Dieser Pathfinder ist für das Transferprojekt an der RFH Köln von Jurek Ohrndorf erstellt worden

## Datenstruktur

Pathfinding Algorithmen werden für Graphen genutzt. Diese sind wichtig um dem Nutzer den schnellsten Weg von A nach B zu zeigen. (z.B. Google Maps)
In diesem Projekt wird ein Rechteckiges Raster als Graph erstellt um die Pathfinding Algorithmen zu veranschaulichen.
Weiter Information und Erklärungen sind in [Graph](https://github.com/jurockz/Pathfinder/blob/main/src/components/Grid/datastructure/Graph.js) zu finden

## Aufbau

Aus der ./App.js Datei werden die meisten Funktionalitäten gestartet. React gibt einem die Möglichkeit seine Website in verschiedene Komponenten 
zu zerlegen und diese praktisch wiederzuverwenden. So wird das Raster aus der [Grid](https://github.com/jurockz/Pathfinder/blob/main/src/components/Grid/index.js) Datei importiert und diese wiederrum importiert das Frontend der Knoten des Graphen aus der [Cell](https://github.com/jurockz/Pathfinder/blob/main/src/components/Grid/Cell/index.js) Datei.
Für die [Buttons](https://github.com/jurockz/Pathfinder/blob/main/src/components/Button/index.js) habe ich ebenfalls eine Komponente geschrieben.
Es gibt in vielen Dateien React-Spezifische Syntax auf die ich hier aber nicht eingehen werden.
In einer Vorstellung kann ich darauf mehr eingehen.

## Algorithmen

Die Pathfinding bzw. Wegfindealgorithmen geht es um die Suche eines Weges oder des optimalen Weges von einem Knoten A zu einem Knoten B.
Dafür gibt es verschiedene Algorithmen, von denen ich hier drei umgesetzt habe. Alle dieser Algorithmen lassen sich durch unpassierbare Wände ergänzen, sodass die Resultate etwas spannender werden.

### Breitensuche und Tiefensuche

Dies sind zwei Algorithmen die keine Gewichtung der Kanten mit einberechnen. 
Weitere Erklärungen finden sich in den jeweiligen Dateien zur [Breitensuche](https://github.com/jurockz/Pathfinder/blob/main/src/components/Grid/algorithms/BreadthFirstSearch.js) und zur [Tiefensuche](https://github.com/jurockz/Pathfinder/blob/main/src/components/Grid/algorithms/DepthFirstSearch.js).

### A*

Der A* Algorithmus kann gewichtete Kanten mit einberechnen. In meiner Visualisierung ist dies nicht mit umgesetzt, jedoch wäre das kein großes Problem. Gewichtete Kanten können in der Nutzung von großen Vorteil sein, wenn der Algorithmus z.B. Hindernisse wie ein Wald oder Schlamm mit in die Wegberechnung mit einbeziehen soll. Mehr Information über die Funktionalität des A* Algorithmus befinden sich in der zugehörigen [Datei](https://github.com/jurockz/Pathfinder/blob/main/src/components/Grid/algorithms/Astar.js)

## Zufällige Wände

Zuletzt habe ich noch ein Funktion geschrieben die das Raster mit Wänden füllt die möglichst zusammenhängend liegen ohne den Weg zwischen Start- und Endknoten zu verschließen.
Mehr Informationen dazu [hier](https://github.com/jurockz/Pathfinder/blob/main/src/components/Grid/randomWalls/relatedWalls.js)







# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
