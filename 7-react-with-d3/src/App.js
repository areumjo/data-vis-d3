import React, { useState } from 'react';
import './App.css';
import * as d3 from 'd3';

import FruitBowl from './fruitBowl.js';

const width = 960;
const height = 500;

const makeFruit = type => ({
  type,
  id: Math.random()
});

function App() {

  const [fruits] = useState(
    d3.range(5).map(() => makeFruit('apple'))
  );

  const [ selectedFruit, setSelectedFruit ] = useState(fruits[0].id);
  // console.log({ selectedFruit });

  return (
    <svg width={width} height={height}>
      <FruitBowl
        fruits={fruits}
        height={height}
        selectedFruit={selectedFruit}
        setSelectedFruit={setSelectedFruit}
      />
    </svg>
  );
}

export default App;
