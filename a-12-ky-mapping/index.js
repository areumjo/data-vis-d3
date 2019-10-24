import { counties } from './ky-counties.js';

// select the 'svg' 
const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

// construct a new projection using `geoAlbers()`
const projection = d3.geoAlbers()
  .center([0, 37.8])
  .rotate([85.8, 0])
  .scale(8000)
  .translate([width / 2, height / 2]);

const geoPath = d3.geoPath()
  .projection(projection);

svg.append('g')
  .selectAll('path')
  .data(counties.features)
  .enter()
  .append('path')
  .attr('d', geoPath)
  .attr('class', 'county')
  .attr('fill', function(d) {
    
  })
  .on('mouseover', function(d) {
  // console.log(d.properties.NAME)
    d3.select('span').text(d.properties.NAME);
    d3.select(this).attr('class', 'county hover');
    // console.log(this)
  })
  .on('mouseout', function(d) {
    d3.select('span').text('');
    d3.select(this).attr('class', 'county');
  });

// // when you use TopoJSON
// queue()
//   .defer(d3.json, "ky-counties-topo.json")
//   .await(ready);

// function ready(error, counties){
//   svg.append("g")
//      .selectAll("path")
//      .data(topojson.feature(counties, counties.objects.counties).features)
//      .enter()
//      .append("path")
//      .attr("d", geoPath)
//      .attr("class","county");  
// }
