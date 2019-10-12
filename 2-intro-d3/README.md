## Making a face with d3
### vizhub
- https://vizhub.com/areumjo/a143741c795948d0a01ba5df1a56f35e

### Process
- Define constants
    - width, height from index.html
    ```js
    const width = parseFloat(svg.attr('width'));
    ```
    - repetitive constants like eyeSpacing, eyeOffset
- Append a group to svg and transform to have all centered position
    - add elements like eyesGroup, mouth
    - add d3.arc API for mouth and position it
- Make eyebrows move
    - group two eyebrows to make them move together
    - transition with 2000 ms duration
    - after added one position `(x1, y1) -> (x2, y2)`, move it to original position `-> (x1, y1)`
    ```js
    eyebrowsG
      .transition().duration(2000)
        .attr('transform', `translate(0, ${eyebrowYOffset - 50})`)
      .transition().duration(2000)
        .attr('transform', `translate(0, ${eyebrowYOffset})`);
    ```
- End result
![](2-d3-face.png)
