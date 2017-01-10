# JSPM Project Template 
This repo contains the basic framework for a project that contains jspm, D3 and bootstrap css.

## Install
First, run

    npm install
    
Then, run

    jspm install
    
## Installing Dependencies
Any dev dependencies should be installed with npm.  Any client side dependencies should be installed with jspm.

## This Project is a Dev Envrionment
The files and folders have been organized to support a development workflow.  If you would like to produce a production build, there are npm scripts you can run to install files in the build folder.
## Serving the Development Version
Download your favorite server package of choice ([http-server](https://www.npmjs.com/package/http-server) is nice). 
### A Note on JavaScript Modules
Any module you write needs to be imported in ```scripts/startup.js```, or used by a module imported in ```startup.js```
## Custom NPM Scripts
The following scripts can be run using

    npm run <command-name>
    
For more information see the package.json file

```npm run bundle-js```

Package all javascript dependencies into a single file, minify and write the file to build/build.js

```npm run bundle-sass```

Compile sass files in styles/sass and output the result to build/styles

```npm run build```

Run bundle-js and bundle-sass

```npm run clean-styles```

Remove build/styles/css and build/styles/fonts folders

```npm run sass```

Compile sass files in styles/sass and output to styles/css

```npm run watch-sass```

Watch styles/sass for changes. On any change, compile to styles/css

## Serving the Production Version
Run your server with a root folder of ```./build```

## Testing

### Unit Testing
[Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/1.0/index.html) are used for unit testing.  Jasmine is a testing framework and Karma is a test runner. What's the difference, you ask?  You write your tests using Jasmine and it's libraries.  Once you write your tests, you need to run the code in a browser javascript engine.  We use Karma to handle a lot of the annoying things that come with trying to run your code in different browser engines.  

#### Set up
Most of what you need to run tests will be installed when you run ```npm install```, but there are some additional steps you also need to take.

1) Install Jasmine globally (it's already installed locally) ```npm install -g jasmine```

2) Install the node karma command line tool globally ``` npm install -g karma-cli```

#### Running All Tests
```npm test ```

#### Running Select Tests
coming soon...

#### Adding Tests
All test files live in ```src/spec``` and should have a name that ends in ```-spec.js```  Any file that you want to test will need to be imported, just like you would with any other file in jspm.  For an example, see ```src/spec/hello-spec.js```

#### Errors When Running
When you try to run your new spec, you may encounter errors loading files imported by your new spec.  To fix these, try the following steps:

1) Check the error message in the console and make note of the load path Karma and SystemJS attempted to use. 

2) In ```src/config.js```, if there is not yet an entry in the map object for the file that is causing the error, add an entry and adjust any files that depend on the module accordingly.  

3) This should fix the issue in most cases.  If that doesn't work, you may need to look at ```karma.conf.js```  Specifically the proxies object and the jspm:paths object.

#### Technical Details You Won't Need Until You Do
1) The Karma server serves all files from /base/<your path starts here>

2) karma-jspm is a karma plugin that allows us to use our jspm/es6 modules with Karma and Jasmine. In some instances Karma's server paths may cause conflicts with the paths set up in the jspm config.js file.  To work around this, there is a jspm object in karma.conf.js that can be used to tell Karma how to reconfigure paths for testing only.

#### Using the Module
1) Add the path to system config (optional)
2) Import the module
3) Call the constructor function with optional arguments
4) The constructor function returns a function that takes two parameters: a selection and data

#### Data Structure
Data should consist of an object and an array within an array. The object should have key value pairs that map to every segment of the stacked chart. A key value pair should be added that consists of the total of all the other data. The data object should also have a columns attribute that consists of all the keys (excluding the "total" key value pair). The total is used to determine the domain of the scales.

Example Data Structure:
```
var exampleData = 
[ 
  { 
    "All Others": 0.2, 
    "Department Store": 0.2, 
    "Family Clothing": 0.2, 
    "Fast Food": 0.2, 
    "Grocery": 0.2, 
    "Pharmacies": 0.2,
    total: 1
  }
];
exampleData.columns = 
[ 
    "All Others", 
    "Department Store", 
    "Family Clothing", 
    "Fast Food", 
    "Grocery", 
    "Pharmacies"
]
```

Example: 
``` 
import stackChart from 'stacked';
var function = stackChart();
```

## Configuration
Configuration can be assigned by calling the constructor function and chaining set functions

##### Configurable Options
width (int)
* Sets the max width of the chart

height (int)
* Sets the max height of the chart

margin (key/values)
* The keys are top, left, right, and bottom and the value is the margin that should be applied

classMap (key/values)
* Object holding key-value pairs where key is the rowId and the value is the class that will be applied.

classMapFunction (function)
* Function that returns the correct value from classMap given a rowId

## Example

#### Importing module and creating svg
```
import stackChart from 'stacked/stacked.js';

var svg = d3.select("#stackid")  .append("div")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")     
  .attr("viewBox","0 0 " + 900 + " " + 300)
  //class to make it responsive
  .classed("svg-content-responsive", true)
;
```
#### Example data set
```
var data= [ { "All Others": 0.2,
  "Department Store": 0.2,
  "Family Clothing": 0.2,
  "Fast Food": 0.2,
  "Grocery": 0.1,
  "Pharmacies": 0.1,
  total: 1 } ];

//add columns attribute
data.columns = Object.keys(data[0]).filter(function (obj){
  return obj != "total";
})
```
#### Define variables to be passed to setters
```
var classMapFunction = function (d){
  return classMap[ d.key ];
}
var classMap =  {"Department Store": "fill-blue", "Grocery": "fill-red",
"Family Clothing": "fill-gray-light", "Fast Food": "fill-orange-yellow",
"Pharmacies": "fill-teal", "All Others": "fill-gray-dark" };
var margin = {top: 30, right: 40, bottom: 50, left: 40};
var width =900;
var height =300;

```
#### Configuration and function call
```
var testStack = stackChart()
  .margin(margin)
  .width(width)
  .height(height)
  .classMap(classMap)
  .classMapFunction(classMapFunction)
;

testStack(svg, data);
```