## Fetch data
```js
{
  bathrooms: "1",
  bedrooms: "2",
  date: "20150225T000000",
  floors: "1",
  lat: "47.7379",
  long: "-122.233",
  price: "180000",
  sqft above: "770",
  sqft basement: "0",
  sqft living: "2720",
  sqft lot: "8062",
  year built: "1933",
  year renovated: "0",
  zipcode: "98028"
}
```

## Geo JSON for King county
- To render two-dimensional geometry in a browser, we can use `<svg>`, `<canvas>`.
- `d3.json()` is asynchronous and needs 2 things to render geography
  1. Projection - projects shperical coordinate to the Cartesian plane (display spherical geometry on a 2D screen)
  2. Path generator - takes the projected 2D geometry and formats it for SVG
  ```js
  g.selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr("d", pathGenerator)
    .attr("fill", "#ddc");
  ```
- To render using topojson with `d3.geoPath()`, it needs to convert to geojson
  ```js
  var featureCollection = topojson.feature(Seattle, Seattle.objects.counties)
  // OR
  var features = topojson.feature(Seattle, Seattle.objects.counties).features
  ```
  - this assumes that `topojson.obejcts` contains a property for counties