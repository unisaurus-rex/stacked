import donutChart from 'donut';
import * as d3 from "d3";


describe("The donut chart", function(){

	
	jasmine.clock().install();
	window.d3 = d3;

	var jsonData = [
	  {
	    "mcc_name": "Department Store",
	    "avg_fee": 0.29486
	  },
	  {
	    "mcc_name": "Grocery",
	    "avg_fee": 0.29486
	  },
	  {
	    "mcc_name": "Family Clothing",
	    "avg_fee": 0.29486
	  },
	  {
	    "mcc_name": "Fast Food",
	    "avg_fee": 0.29486
	  },
	  {
	    "mcc_name": "Pharmacies",
	    "avg_fee": 0.29486
	  }
	];

	var valueFunction = function(d){
	  return d.avg_fee;
	}
	var constancyFunction = function(d){
	  return d.mcc_name;
	}
	var classMapFunction = function(d){
	  return classMap[d.data.mcc_name];
	}

	//This data would be received by the controller
	//where txn_type = sig_debit and fi= "My Financial Institution"
	var classMap = {"Department Store": "fill-blue", "Grocery": "fill-red",
	 "Family Clothing": "fill-gray-light", "Fast Food": "fill-orange-yellow",
	  "Pharmacies": "fill-teal"};

	var innerNumber = 0;
	jsonData.forEach(function(d,j){
	  innerNumber += d.avg_fee;
	});


	innerNumber = innerNumber / jsonData.length;

	beforeEach (function(){

		var svg = d3.select("body")
		  .append("div")
		  .classed("svg-container", true)
		  .append("svg")
		  .attr("viewBox", "0 0 " + 500 + " " + 500)
		  //class for responsivenesss
		  .classed("svg-content-responsive-pie", true)
		  .attr("width", 500)
		  .attr("height", 500)
		  .append("g")
		  .attr("id", "donutchart")
		  .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
		;

		var test = donutChart()
		  .classMap(classMap)
		  .valueFunction(valueFunction)
		  .constancyFunction(constancyFunction)
		  .classMapFunction(classMapFunction)
		  .innerRad(50)
		  .innerNumber(innerNumber)
		  .innerText("AVG INTERCHANGE")
		  .padAngle(0.03)
		;

		test(svg, jsonData);
	
	});

	afterEach ( function(){
		d3.selectAll('.svg-container').remove();
	})
	
	it('should be created, defined, and not null', function() {
		expect(d3.selectAll('svg')._groups[0][0]).not.toBeNull();
		expect(d3.selectAll('svg')._groups[0][0]).toBeDefined();			
	});

	it('should create the correct amount of paths', function() { 
		expect(d3.selectAll('path')._groups[0].length).toEqual(5);
	});

	it('should create every path with one class', function() {		
		var classes = 0;
			var paths = d3.selectAll('path')._groups[0];
			
			for(var i =0; i< paths.length; i++){
				classes = classes + paths[i].classList.length
			}
		expect( classes).toEqual(5);

	});

	it('should create every path with a valid class', function() {	
		var paths = d3.selectAll('path')._groups[0];
		var test = true;

			for(var i =0; i< paths.length; i++){
				if ( !(paths[i].classList == "fill-blue" ||
						 paths[i].classList == "fill-red" ||
						 paths[i].classList == "fill-gray-light" ||
						 paths[i].classList == "fill-orange-yellow" ||
						 paths[i].classList == "fill-teal" )
					  	&& test == true){
					test = false
				}//end if
			}
		expect (test).toBe(true);
	});


	it('should have the correct number of HTML text tags', function() {
		expect(d3.selectAll('text')._groups[0].length).toBe(2);
	});

	it('should have the correct text', function(done) {
		expect(d3.selectAll('text')._groups[0].length).toBe(2);

		var allText = d3.selectAll('text')._groups[0];
		var test = true;

		setInterval(function(){
			for (var i =0; i < allText.length; i++){
				console.log(allText[i].innerHTML)
				if ( allText[i].innerHTML != "AVG INTERCHANGE" && allText[i].innerHTML != "0.29486" ){
					test = false;
				}
			}
		}, 2000)

		jasmine.clock().tick(2001 /* a space odyssey */);
		expect(test).toBe(true);
		done();
	});

});
