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

// svg.append('g')
//   .selectAll('path')
//   .data(counties.features)
//   .enter()
//   .append('path')
//   .attr('d', geoPath)
//   .attr('class', 'county')
//   .attr('fill', function(d) {
    
//   })
//   .on('mouseover', function(d) {
//   // console.log(d.properties.NAME)
//     d3.select('span').text(d.properties.NAME);
//     d3.select(this).attr('class', 'county hover');
//     // console.log(this)
//   })
//   .on('mouseout', function(d) {
//     d3.select('span').text('');
//     d3.select(this).attr('class', 'county');
//   });

// when you use TopoJSON with async
d3.json('ky-counties-topo.json')
  .then(data => {
    // console.log(data);
    console.log(data);
    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(data, data.objects.counties).features)
      .enter()
      .append("path")
      .attr( "d", geoPath )
      .attr("class","county")
      .on('mouseover', function(d) {
        d3.select('span').text(d.properties.NAME);
        d3.select(this).attr('class', 'county hover');
        // console.log(this)
      })
      .on('mouseout', function(d) {
        d3.select('span').text('');
        d3.select(this).attr('class', 'county');
      });
    // ready(data);
});

function ready(counties){
  
  var attribute = "gas_wells"; // alternative is "oil_wells"
  var bbr = counties.objects.counties.geometries.map(function(d) { 
    return d.properties[attribute]/d.properties.ALAND; 
  })
  console.log({bbr});
  var breaks = jenks(bbr, 5);
  
  breaks.shift(); // remove min value from breaks Array before applying to domain
  breaks.pop(); // same for max
  
  var colors = ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"];
  var jenks = d3.scale.threshold()
      .domain(breaks)
      .range(colors);
  
  svg.append("g")
      .selectAll("path")
      .data( topojson.feature(counties, counties.objects.counties).features)
      .enter()
      .append("path")
      .attr( "d", geoPath )
      .attr("class","county")
      .attr( "fill", function(d){
          return jenks(d.properties[attribute]/d.properties.ALAND);  
      }); 
}

    
  function jenksMatrices(data, n_classes) {

    var lower_class_limits = [],
        variance_combinations = [],
        i, j,
        variance = 0;

    for (i = 0; i < data.length + 1; i++) {
        var tmp1 = [], tmp2 = [];

        for (j = 0; j < n_classes + 1; j++) {
            tmp1.push(0);
            tmp2.push(0);
        }
        lower_class_limits.push(tmp1);
        variance_combinations.push(tmp2);
    }

    for (i = 1; i < n_classes + 1; i++) {
        lower_class_limits[1][i] = 1;
        variance_combinations[1][i] = 0;
        for (j = 2; j < data.length + 1; j++) {
            variance_combinations[j][i] = Infinity;
        }
    }

    for (var l = 2; l < data.length + 1; l++) {

        var sum = 0,
            sum_squares = 0,
            w = 0,
            i4 = 0;

        for (var m = 1; m < l + 1; m++) {

            var lower_class_limit = l - m + 1,
                val = data[lower_class_limit - 1];

            w++;

            sum += val;
            sum_squares += val * val;

            variance = sum_squares - (sum * sum) / w;

            i4 = lower_class_limit - 1;

            if (i4 !== 0) {
                for (j = 2; j < n_classes + 1; j++) {

                    if (variance_combinations[l][j] >=
                        (variance + variance_combinations[i4][j - 1])) {
                        lower_class_limits[l][j] = lower_class_limit;
                        variance_combinations[l][j] = variance +
                            variance_combinations[i4][j - 1];
                    }
                }
            }
        }

        lower_class_limits[l][1] = 1;
        variance_combinations[l][1] = variance;
    }

    return {
        lower_class_limits: lower_class_limits,
        variance_combinations: variance_combinations
    };
}

  function jenksBreaks(data, lower_class_limits, n_classes) {

      var k = data.length,
          kclass = [],
          countNum = n_classes;

      kclass[n_classes] = data[data.length - 1];

      while (countNum > 0) {
          kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 1];
          k = lower_class_limits[k][countNum] - 1;
          countNum--;
      }

      return kclass;
  }
function jenks(data, n_classes) {

      if (n_classes > data.length) return null;

      data = data.slice().sort(function (a, b) { return a - b; });

      var matrices = jenksMatrices(data, n_classes),
          lower_class_limits = matrices.lower_class_limits;

      return jenksBreaks(data, lower_class_limits, n_classes);
  };
console.log({jenks})

// function ready(error, counties){
        
//   var attribute = "gas_wells"; // alternative is "oil_wells"
//   var breaks = jenks(counties.objects.counties.geometries.map(function(d) { 
//       return d.properties[attribute]/d.properties.ALAND; 
//   }), 5);
  
//   breaks.shift(); // remove min value from breaks Array before applying to domain
//   breaks.pop(); // same for max
  
//   var colors = ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"];
//   var jenks = d3.scale.threshold()
//       .domain(breaks)
//       .range(colors);
  
//   svg.append("g")
//       .selectAll("path")
//       .data( topojson.feature(counties, counties.objects.counties).features)
//       .enter()
//       .append("path")
//       .attr( "d", geoPath )
//       .attr("class","county")
//       .attr( "fill", function(d){
//           return jenks(d.properties[attribute]/d.properties.ALAND);  
//       }); 
// }

