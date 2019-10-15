import React from 'react';
import * as d3 from 'd3';

const colorScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range(['#db4a30', 'yellow']);

const radiusScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range([50, 30]);

const xPosition = (d, i) => i * 150 + 60;

const FruitBowl = props => {
  // console.log({props});
  const {
    fruits,
    height,
    selectedFruit,
    setSelectedFruit
  } = props;
  
  return fruits.map((fruit, i) => (
    <circle 
      key={fruit.id}
      cx={xPosition(fruit, i)}
      cy={height / 2}
      r={radiusScale(fruit.type)}
      fill={colorScale(fruit.type)}
      strokeWidth={5}
      stroke={
        fruit.id === selectedFruit
          ? 'black'
          : 'none'
      }
      onClick={()=> {setSelectedFruit(fruit.id)}}
    />
  ))
};

export default FruitBowl;