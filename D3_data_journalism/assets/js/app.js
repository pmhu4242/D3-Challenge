// @TODO: YOUR CODE HERE!


function xScale(data, chosenXAxis) {
    
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXAxis]) * 0.75,
            d3.max(data, d => d[chosenXAxis]) * 1.25
        ])
        .range([0. width]);

    return xLinearScalel;
}

function renderAxes(newScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;

}

function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;

}

function updateToolTip(chosenXAxis, circlesGroup) {
    
    var label;

    if (chosenXAxis === "poverty") {
        label = "Poverty";
    }
    else {
        label = "Healthcare";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.obesity}<br>${label} ${d[chosenXAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })  
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}   

d3.csv("../data/data.csv").then(function(data, err) {
    if (err) throw err;

    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
    });

    var xLinearScale = xScale(data, chosenXAxis);

    var yLinearScale = d3.scaleLinear()
        .domaun([0, d3.max(data, d => d.obesity)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.num_hits))
        .attr("r", 20)
        .attr("fill", "pink")
        .attr("opacity", ".5");
    
      // Create group for two x-axis labels
      var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);
    
      var hairLengthLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "hair_length") // value to grab for event listener
        .classed("active", true)
        .text("Hair Metal Ban Hair Length (inches)");
    
      var albumsLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "num_albums") // value to grab for event listener
        .classed("inactive", true)
        .text("# of Albums Released");
    
      // append y axis
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Number of Billboard 500 Hits");
    
      // updateToolTip function above csv import
      var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
    
      // x axis labels event listener
      labelsGroup.selectAll("text")
        .on("click", function() {
          // get value of selection
          var value = d3.select(this).attr("value");
          if (value !== chosenXAxis) {
    
            // replaces chosenXAxis with value
            chosenXAxis = value;
    
            // console.log(chosenXAxis)
    
            // functions here found above csv import
            // updates x scale for new data
            xLinearScale = xScale(hairData, chosenXAxis);
    
            // updates x axis with transition
            xAxis = renderAxes(xLinearScale, xAxis);
    
            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
    
            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
    
            // changes classes to change bold text
            if (chosenXAxis === "num_albums") {
              albumsLabel
                .classed("active", true)
                .classed("inactive", false);
              hairLengthLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else {
              albumsLabel
                .classed("active", false)
                .classed("inactive", true);
              hairLengthLabel
                .classed("active", true)
                .classed("inactive", false);
            }
          }
        });
    }).catch(function(error) {
      console.log(error);
    });
    
})
