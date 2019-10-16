import { colorLegend } from './colorLegend.js';
import { sizeLegend } from './sizeLegend.js';

const svg = d3.select('svg');

const colorScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon', 'lime', 'orange'])
  .range(['#c11d1d', '#eae600', 'green', 'orange']);

const sizeScale = d3.scaleSqrt()
  .domain([0, 10])
  .range([0, 50]);

svg.append('g')
  .attr('transform', `translate(350,150)`)
  .call(colorLegend, {
    colorScale,
    circleRadius: 30,
    spacing: 80,
    textOffset: 40
  });

svg.append('g')
  .attr('transform', `translate(550,100)`)
  .call(sizeLegend, {
    sizeScale,
    spacing: 80,
    textOffset: 10,
    numTicks: 5,
    circleFill: 'rgba(0, 0, 0, 0.3)'
});
