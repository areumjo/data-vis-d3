// set projection
// var projection = d3.geo.mercator()
// 	.scale(1000)
// 	.translate([width / 2, height / 2]);

// var path = d3.geo.path()
//   .projection(projection);
// /** Read the data, create the map and add the point*/
// d3.json(dataLocation, function(error, data) {
//   /** Extract features*/
//   var features = topojson.feature(data, data.objects.example)
//     .features;
//   /** Set the projection parameters*/
//   projection
//     .scale(1000)
//     .center(centerCoordinates);
//   /** Create the svg container for the map*/
//   var svg = d3.select("body")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);
//   /** Add features*/
//   svg.selectAll("path")
//     .data(features)
//     .enter()
//     .append("path")
//     .attr("class", "feature")
//     .style("fill", "white")
//     .attr("d", path);
//   /** Create a circle around the point you want to add*/
//   svg.selectAll("circle")
//     .datum(point)
//     .enter()
//     .append("circle")
//     .attr("cx", function(d) {
//       return projection(d)[0];
//     })
//     .attr("cy", function(d) {
//       return projection(d)[1];
//     })
//     .attr("r", "12px") //radius of the point you have added
//     .attr("fill", "black"); //filling color of the point you have added
// });