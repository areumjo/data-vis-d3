const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {

  const title = 'A Week in San Francisco';

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width/2-100-100)
    .attr('y', 80)
    .text(title);

  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = d => d.timestamp;
  const yValue = d => d.temperature;
  
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  g.append('path')
    .attr('class', 'line-path')
    .attr('d', lineGenerator(data));

}

d3.csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
  .then(data => {
    // console.log(data);
    // console.log(data[0]);
    data.forEach(d => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
    });
    render(data);
});