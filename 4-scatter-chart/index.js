import { dropdownMenu } from './dropdownMenu.js';
import { scatterPlot } from './scatterPlot.js';

// dropdownMenu(d3.select('#menus'), {
//   options: ['A', 'B', 'C']
// }); // this is same as below function (in render)

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

// for state
let data;
let xColumn;
let yColumn;

// setState
const onXcolumnClicked = column => {
  xColumn = column;
  render();
};
const onYcolumnClicked = column => {
  yColumn = column;
  render();
}

const render = () => {
  // console.log(data.columns); // horserpower, weight, ...
  d3.select('#x-menus')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onXcolumnClicked
  });

  d3.select('#y-menus')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onYcolumnClicked
  });

  svg.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    circleRadius: 10,
    yAxisLabel: yColumn,
    margin: { top: 30, right: 100, bottom: 100, left: 100 },
    width,
    height,
    data
  })
};

d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
  .then(loadedData => {
    // console.log(data);
    // console.log(data[0]);
    data = loadedData;
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;  
    });
  xColumn = data.columns[4];
  yColumn = data.columns[0];
  render();
});