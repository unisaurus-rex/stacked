import jquery from 'jquery';
import bootstrap from 'bootstrap-sass';
//import {donutChart} from 'donut-widget/donutWidget.js';
import stackChart from 'stacked';
import * as d3 from "d3";

var data= [ { "All Others": 0.2,
  "Department Store": 0.2,
  "Family Clothing": 0.2,
  "Fast Food": 0.2,
  "Grocery": 0.1,
  "Pharmacies": 0.1,
  total: 1 } ];

var dataTwo= [ { "All Others": 0.2,
  "Department Store": 0.2,
  "Fast Food": 0.2,
  "Grocery": 0.1,
  total: 1 } ];




//add columns attribute
data.columns = Object.keys(data[0]).filter(function (obj){
  return obj != "total";
})

//add columns attribute
dataTwo.columns = Object.keys(dataTwo[0]).filter(function (obj){
  return obj != "total";
})
  
var svg = d3.select("#stackid")  .append("div")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")     
  .attr("viewBox","0 0 " + 900 + " " + 300)
;

window.data= data;
window.dataTwo = dataTwo;
window.svg = svg;
window.d3 = d3;

  var classMapFunction = function (d){
    return classMap[ d.key ];
  }

  var classMap =  {"Department Store": "fill-blue", "Grocery": "fill-red",
  "Family Clothing": "fill-gray-light", "Fast Food": "fill-orange-yellow",
  "Pharmacies": "fill-teal", "All Others": "fill-gray-dark" };



var margin = {top: 40, right: 40, bottom: 40, left: 40};
var width =900;
var height =300;

var testStack = stackChart()
  .margin(margin)
  .width(width)
  .height(height)
  .classMap(classMap)
  .classMapFunction(classMapFunction)
;

testStack(svg, data);

window.testStack = testStack;