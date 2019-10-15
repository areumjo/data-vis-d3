const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {

  const title = 'World Population';

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width/2-150)
    .attr('y', 80)
    .text(title);

  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = d => d.year;
  const yValue = d => d.population;
  
  // change x, y scale with d3.min and d3.max fn
  const xScale = d3.scaleTime()
    .domain([d3.min(data, xValue), d3.max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const areaGenerator = d3.area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
  .curve(d3.curveBasis);

  // axes
  const xAxisLabel = "Year";
  const yAxisLabel = "Population";

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10);

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth/2)
    .attr('y', 50)
    .attr('fill', 'black')
    .text(xAxisLabel);

  const yAxisTickFormat = number =>
    d3.format('.1s')(number)
      .replace('G', 'B');

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
    .tickFormat(yAxisTickFormat);

  const yAxisG = g.append('g').call(yAxis);

  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight/2+50)
    .attr('y', -50)
    .attr('fill', 'black')
    .attr('transform', `rotate(-90)`)
    .text(yAxisLabel);

  g.append('path')
    .attr('class', 'line-path')
    .attr('d', areaGenerator(data));
}

d3.csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv')
  .then(data => {
    // console.log(data);
    // console.log(data[0]);
    data.forEach(d => {
      d.population = +d.population;
      d.year = new Date(d.year);
    });
    render(data);
});