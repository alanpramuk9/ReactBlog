# Covalence Full Stack Project Boilerplate
This boilerplate includes build scripts and setup for a ReactJS front-end and an ExpressJS back-end.

### Getting Started
Remember to run `npm install` to install all necessary dependencies.

### Careful!
Make sure you are always working within the front-end or back-end `src` directory. Stay out of the `dist` and `lib` directories, as their contents will be erased each time the source code is transpiled.

### Running
* To run the project during development (for automatic transpile and server restart), use `npm run dev`.
* `npm start` will be used in a production environment. It transpiles once and does not look for changes.

### Importing Images and Documents
* This boilerplate sets up `file-loader` in the the `webpack.config.js` file.
* By using `file-loader`, you can keep your images/documents in logical folders within your components, and then import them using their relative paths. During the build process, webpack will copy the files into the `client/dist` folder, giving them a hash-based name and updating your html to use the correct name and path.
* Usage:
  * Files with `png`, `jpg`, and `gif` extensions can be imported into your Component and used as follows (note the braces used in the `src` attribute):

  ```js
  import myLogo from '../relativePath/to/logo.png';

  render() {
      ...
      <img src={myLogo} alt="My Company Logo" />
      // Final html may look like: <img src="/dist/images/1aecb1718293a.png" alt="My Company Logo>
      ...
  }
  ```
  
  * Files with `pdf` extensions can be imported into your Component and used as follows (note the braces used in the `href` attribute):

  ```js
  import myDoc from '../relativePath/to/doc.pdf';

  render() {
      ...
      <a href={myDoc}>Click here!</a>
        // Final html may look like: <a href="/dist/docs/38923afdbc.pdf">Click here!</a>
      ...
  }
  ```
* If you need to support additional file types, feel free to modify the `webpack.config.js`. You should be able to discern the sections for image handling vs document handling.