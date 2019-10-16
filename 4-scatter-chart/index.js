import { dropdownMenu } from './dropdownMenu.js';

// dropdownMenu(d3.select('#menus'), {
//   options: ['A', 'B', 'C']
// }); // this is same as below function

d3.select('#menus')
  .call(dropdownMenu, {
    options: ['A', 'B', 'C']
  })

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  // console.log(data.columns); // horserpower, weight, ...

  // constants
  const title = 'Cars: Horsepower vs Weight';

  const xValue = d => d.horsepower;
  const yValue = d => d.weight;
  const circleRadius = 8;
  
  // axes
  const xAxisLabel = "horsepower";
  const yAxisLabel = "weight";

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width/2-100-100)
    .attr('y', 80)
    .text(title);

  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10);

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)

  xAxisG.select('.domain').remove();

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth/2)
    .attr('y', 50)
    .text(xAxisLabel);

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);
  
  const yAxisG = g.append('g').call(yAxis)
  
  yAxisG.select('.domain').remove();

  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -70)
    .attr('x', -innerHeight / 2+30)
    .attr('transform', `rotate(-90)`)
    .text(yAxisLabel);

  // move it down, so circle (even tho it has opacity) is positioned top
  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);

}


d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
  .then(data => {
    // console.log(data);
    // console.log(data[0]);
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;  
    });
  render(data);
});