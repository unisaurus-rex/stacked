import jquery from 'jquery';
import bootstrap from 'bootstrap-sass';
//import {donutChart} from 'donut-widget/donutWidget.js';
import stackChart from 'stacked';
import * as d3 from "d3";




     var margin = {top: 20, right: 150, bottom: 50, left: 40},
         width = 600 - margin.left - margin.right,
         height = 500 - margin.top - margin.bottom;
    
    
     var svg = d3.select("#stackid").append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
       .append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.3)
    .align(0.3);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal(d3.schemeCategory20);
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var stack = d3.stack();

d3.csv("/scripts/stacked/segments_table2.csv", type, function(error, data) {

  //console.log(data)
  if (error) throw error;

  data.sort(function(a, b) { return b.total - a.total; });

  //x.domain(data.map(function(d) { return d.ethnicity; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
  z.domain(data.columns.slice(1));
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.selectAll(".serie")
    .data(stack.keys(data.columns.slice(0))(data))
    .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      //.attr("x", function(d) { console.log (d); return x(d.data.ethnicity); })
      .attr("y", function(d) { console.log(d); return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth());

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks(10).pop()))
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .attr("fill", "#000")
      .text("Population");

});

function type(d, i, columns) {

  //console.log("before", d)
  var i;
  var t;
  for (i = 0, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
//console.log("after", d)
  return d;
}
