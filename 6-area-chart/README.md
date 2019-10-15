## Make a line chart
### Data
- Fetch SF temperature data
```js
// columns: (2) ["year", "population"] <== celcius (C)
// length: 66
{
  population: "2525149312",
  year: "1950"
}
```

### Display Area
- Define a function `areaGenerator` and append it to group
```js
const lineGenerator = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScale(yValue(d)))
  .curve(d3.curveBasis);

g.append('path')
  .attr('class', 'line-path')
  .attr('d', lineGenerator(data));
```

### Add axis

### Stretch goal
- I can add area with two colors (AM and PM) showing difference between AM and PM temperature in SF.

### End result
- Just added data and line generate function
![](5-1-line-chart.png)

- Added axes and .domain from axis has same color as ticks
![](5-2-line-chart-with-axes.png)