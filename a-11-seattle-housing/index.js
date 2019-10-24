const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

// const projection = d3.geoAlbersUsa();
// const pathGenerator = d3.geoPath().projection(projection);
const g = svg.append('g');

// state
let long;
let lat;

const onCircleClicked = (clong, clat) => {
  long = clong;
  lat = clat;
  console.log('clicked', long, lat)
}

const render = data => {
  const xValue = d => d.year;
  const yValue = d => d.price;
  const circleRadius = 5;

  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10);

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth/2)
    .attr('y', 50)

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);
  
  const yAxisG = g.append('g').call(yAxis)
  
  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -70)
    .attr('x', -innerHeight / 2+30)
    .attr('transform', `rotate(-90)`)

  // move it down, so circle (even tho it has opacity) is positioned top
  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius)
      .attr('fill', 'navy')
      .attr('opacity', '0.3')
      .on('click', d => {
          onCircleClicked(d.long, d.lat);
      })
}

const map = data => {
  var projection = d3.geoAlbers()
  .scale(100000)
  .rotate([-122, 0])
  .center([0,47])
  .translate([width / 2, height / 2]);

  const pathGenerator = d3.geoPath(projection);

  mapSvg.selectAll('path')
    .data(data)
    .enter().append('path')
      .attr('fill', 'red')
      .attr('d', pathGenerator);
}



// var mapLayer = g.append('g')
//   .attr('d', pathGenerator({type: 'Sphere'}))
//   .attr('transform', `translate(100,100)`)

var mapSvg = d3.select("#map");

// https://github.com/seattleio/seattle-boundaries-data
d3.json('https://boundaries-api.seattle.io/boundaries?long=-122.345002&lat=47.667044')
  .then(data => {
    let features = data.features[0];
    console.log({features});
    // mapLayer.selectAll('path')
    // .data(features)
    // .enter().append('path')
    //   .attr('fill', 'red')
    //   .attr('d', pathGenerator)
    map(features);
    

      // .attr('vector-effect', 'non-scaling-stroke')
      // .style('fill', fillFn)
      // .on('mouseover', mouseover)
      // .on('mouseout', mouseout)
      // .on('click', clicked);
    // console.log(data) // geometry - coordinates
    // const countries = topojson.feature(data, {});
    // console.log({countries})
    // svg.selectAll('path').data(countries)
    //   .enter().append('path')
    //     .attr('class', "country")
    //     .attr('d', pathGenerator)
    //   .append('title')
    //     .text(d => console.log(d.id))
    //     // .text(d => countryName[d.id]);
  });

d3.csv('https://gist.githubusercontent.com/GeniXiong/e7c6bf03262966c543faa26805bf8bc7/raw/8af03bd9fa937910c4046d0ebb65b442c9cb8cc9/seattleHousePrice2015.csv')
  .then(data => {
    console.log(data[0]);
    data.forEach(d => {
      d.bedrooms = +d.bedrooms;
      d.bathrooms = +d.bathrooms;
      d.floors = +d.floors;
      d.lat = +d.lat;
      d.long = +d.long;
      d.zipcode = +d.zipcode;
      d.price = +d.price;
      d.yearReno = +d['year renovated'];
      d.year = +d['year built'];
      d.sqftLiving = +d['sqft living'];
      d.sqftLot = +d['sqft lot'];
    });
    render(data);
  });

