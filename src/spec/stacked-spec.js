import stackChart from 'stacked';
import * as d3 from "d3";


describe("The stack chart", function(){

	window.d3 = d3;
	jasmine.clock().install();

	var data= [ { "All Others": 0.2,
	  "Department Store": 0.2,
	  "Family Clothing": 0.2,
	  "Fast Food": 0.2,
	  "Grocery": 0.1,
	  "Pharmacies": 0.1,
	  total: 1 } ];
		data.columns = Object.keys(data[0]).filter(function (obj){
		  return obj != "total";
		})


	beforeEach (function(){

		var svg = d3.select("body")
		  .append("div")
			.classed("svg-container", true)
			.append("svg")
			.attr("preserveAspectRatio", "xMinYMin meet")     
			.attr("viewBox","0 0 " + 900 + " " + 300)
			//class to make it responsive
			.classed("svg-content-responsive", true)
		;

		var margin = {top: 30, right: 40, bottom: 50, left: 40};
		var width =900;
		var height =300;

		var classMap =  {"Department Store": "fill-blue bar", "Grocery": "fill-red bar",
		"Family Clothing": "fill-gray-light bar", "Fast Food": "fill-orange-yellow bar",
		"Pharmacies": "fill-teal bar", "All Others": "fill-gray-dark bar" };


		var classMapFunction = function (d){
			return classMap[ d.key ];
		}

		var testStack = stackChart()
		  .margin(margin)
		  .width(width)
		  .height(height)
		  .classMapFunction(classMapFunction)
		  .classMap(classMap)
		;

		testStack(svg, data)
	});

	afterEach ( function(){
		d3.selectAll('.svg-container').remove();
	})
	
	it('should be created, defined, and not null', function() {
		expect(d3.selectAll('svg')._groups[0][0]).not.toBeNull();
		expect(d3.selectAll('svg')._groups[0][0]).toBeDefined();			
	});

	it('should create the correct amount of bars', function() { 
		expect(d3.selectAll('.bar')._groups[0].length).toEqual(6);
	});

	it('should create every bar with two classes', function() {		
		var classes = 0;
			var bars = d3.selectAll('.bar')._groups[0];
			
			for(var i =0; i< bars.length; i++){
				classes = classes + bars[i].classList.length
			}
		expect( classes).toEqual(12);

	});

	it('should create every bar with a valid class', function(done) {
		
		var bars = d3.selectAll('.bar')._groups[0];
		var test = true;

		setInterval(function(){
			for(var i =0; i< bars.length; i++){		
				if ( !(bars[i].classList[0] == "fill-blue" ||
					 bars[i].classList[0] == "fill-red" ||
					 bars[i].classList[0] == "fill-gray-light" ||
					 bars[i].classList[0] == "fill-orange-yellow" ||
					 bars[i].classList[0] == "fill-teal" || 
					 bars[i].classList[0] == "fill-gray-dark" ) && test == true){
						test = false
				}//end if
			}//end for
		
	}, 2000)
		jasmine.clock().tick(2001 /* a space odyssey*/);
		expect (test).toBe(true);
		done();

	});

});
