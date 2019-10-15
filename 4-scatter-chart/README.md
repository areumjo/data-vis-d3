## Making scatter plot with d3.js

### Data
- [Using this data format](https://vizhub.com/curran/datasets/auto-mpg.csv), data from [UCI Machine Learning Repository: Auto MPG Data Set](http://mlr.cs.umass.edu/ml/datasets/Auto+MPG)
```js
// when you fetch data
// columns: (9) ["mpg", "cylinders", "displacement", "horsepower", "weight", "acceleration", "year", "origin", "name"]
// length: 392
{
  acceleration: "12"
  cylinders: "8"
  displacement: "307"
  horsepower: "130"
  mpg: "18"
  name: "chevrolet chevelle malibu"
  origin: "USA"
  weight: "3504"
  year: "1970"
}
```

### Add title and axes
- Make constants for title and x/y axis label, when you change the constant, data vis will change
  - will implement selection tool with React.js 
  ![](4-3-different-data.png)


### End result
- Getting data with `d3.csv` and creating dots with style
![](4-1-dots.png)
- Added x-axis with grouping domain-removed-axis and x axis label
![](4-1-dots-with-x-axis.png)
- Added y-axis
![](4-2-scatter-plot.png)