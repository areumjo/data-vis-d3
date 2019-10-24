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

### 2. Map with basic interaction
- Hover over a specific county and give visual difference
    - add `.hover` to `styles.css`
    - add `.on('mouseover', d => d)` event-listener method to the map svg
        - `mouseover`
        - `mouseout`
        ```js
        .on('mouseover', functiond(d) {
            console.log(d);
        })
        ```
- Select `this`
    - allow access to the context of the event
    - in this case the `svg path` we are hovering over
    - `this` can be applied css class rules like `county` and `county hover`
    ```html
    <path d="M135.6578608213926,325.1791923320916L148.94712987544835,330.96846477197414L156.85700021839295,337.5066728772126L170.02471713461267,342.3194950087782L174.8640722660515,347.7506914297701L183.81927407398263,355.4261710197561L183.37741868720104,366.7670542960359L147.0743565942622,365.0017122362642L146.7641260587979,363.9763167461397L135.05711732490607,325.3568870701429Z"></path>
    ```

### 3. d3 map using `topojson`
- `TopoJSON` is an extension of GeoJSON that encodes topology.
    - rather than representing geometries discretely, geometries in TopoJSON are stitched together from shared line segments called `arcs`.
    - it eliminates redundancy, allowing related geometries to be stored efficiently.
    - load this to html `<script src="https://unpkg.com/topojson@3"></script>`
- `GeoJSON` has shared borders between `polygons` are encoded twice and give redundancy. And bigger file size as well.
```json
// GeoJSON -- FeatureCollection
{
    "type": "FeatureCollection",
    "features": [
        { 
            "type": "Feature", 
            "properties": { "COUNTYFP": "007", "NAME": "Ballard", "ALAND": 638843907 },
            "geometry": { "type": "MultiPolygon", "coordinates": [[[[-89.1719, 37.0682], ... ]]]
            }
        }
    ]
}
// TopoJSON -- Topology -- GeometryCollection
{
    "type": "Topology",
    "objects": {
        "counties": {
            "type": "GeometryCollection",
            "geometries": [{
                "type": "Polygon",
                "properties":{
                    "COUNTYFP": "007", "NAME": "Ballard", "ALAND": 638843907, "oil_wells": 0, "gas_wells": 0}
                    ,
                "arcs": [[0,1,2]]
                },
                ... ]
        }
    }
}
```
- `TopoJSON`: `.data(topojson.feature(countries, countries.objects.counties).features)`
    - invoke `.feature()` method which is taking 2 arguments
    - convert TopoJSON to GeoJSON
    - `.features()` is a property that allows us to use the returned GeoJSON's features as our data
- `GeooJSON`: `.data(counties.feature)`
