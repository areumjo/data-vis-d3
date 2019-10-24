## d3-mapping
- Introduction to d3.js web mapping through [7 simple maps](https://github.com/maptimelex/d3-mapping)

### 1. Simple d3 map
- A basemap consisting of county polygons, which is projected using `Albers Equal Area projection`
    - highly suitable for making choropleth maps
- `ky-counties.js`
    - information encoded as `GeoJson` (our county geometries, stored as a GeoJson FeatureCollection) that's been assigned to `counties`
    - include nominal data values such as `NAME` and numerical data like `ALAND` (the area of each county, which will be useful later for normalizaing data for a choropleth map)
    ```json
    {
        "type": " FeatureCollection",
        "features": [
            { 
                "type": "Feature", 
                "properties": { "COUNTYFP": "007", "NAME": "Ballard", "ALAND": 638843907 },
                "geometry": { "type": "MultiPolygon", "coordinates": [[[[-89.1719, 37.0682], ... ]]]
                }
            }
        ]
    }
    ```
1. Create a new SVG element (or grab it from document) and define width and height
2. Construt a new projection, centered and scaled to fit with the window
    ```js
    const projection = d3.geo.albers() 
        .center([0, 37.8]) // center the project within Kentucky's mid-latitude
        .rotate([85.8,0])  // rotate the globe to center with Kentucky's mid-longitude
        .scale(8000)       // play with the scale until it's 'zoomed' about right
        .translate([width / 2, height / 2]);  // center the svg (0,0 is top, left)
    ```
3. Construct a "path generator" using the `projection`
    - will be used to draw SVG paths from the GeoJson information
    ```js
    var geoPath = d3.geo.path()
        .projection(projection);  // assign the project we just created to it
    ```
4. Create and append a new `g` element 
    - `g` is an SVG container elemenet used for grouping other objects)
    ```js
    svg.append('g')           
        .selectAll('path')  // selectAll the path features that haven't been created yet
        .data(counties.features)  // bind the GeoJSON features data to them
        .enter()               // prepare to
        .append('path')        // append the newly create path elements to the 'g'
        .attr("d", geoPath)  // define the screen coordinates of the new path(s)
        .attr('class','county');
    ```