let keyframeIndex = 0;

let keyframes = [
    {
        activeVerse: 1,
        activeLines: [1, 2],
        svgUpdate: drawFirstGraph
    },
    {
        activeVerse: 1,
        activeLines: [3, 4],
        svgUpdate: drawSecondGraph
    },
    {
        activeVerse: 1,
        activeLines: [5, 6, 7],
        svgUpdate: drawThirdGraph
    },
    {
        activeVerse: 2,
        activeLines: [1, 2],
        svgUpdate: drawFirstGraph
    },
    {
        activeVerse: 2,
        activeLines: [3, 4],
        svgUpdate: drawSecondGraph
    },
    {
        activeVerse: 2,
        activeLines: [5, 6, 7],
        svgUpdate: drawThirdGraph
    },
    {
        activeVerse: 3,
        activeLines: [1],
        svgUpdate: drawInfoGraphics
    },
    {
        activeVerse: 4,
        activeLines: [1, 2],
        svgUpdate: drawFirstGraph
    },
    {
        activeVerse: 4,
        activeLines: [3, 4],
        svgUpdate: drawSecondGraph
    },
    {
        activeVerse: 4,
        activeLines: [5, 6, 7],
        svgUpdate: drawThirdGraph
    },
    {
        activeVerse: 5,
        activeLines: [1, 2],
        svgUpdate: drawFirstGraph
    },
    {
        activeVerse: 5,
        activeLines: [3, 4],
        svgUpdate: drawSecondGraph
    },
    {
        activeVerse: 5,
        activeLines: [5, 6, 7],
        svgUpdate: drawThirdGraph
    },
    {
        activeVerse: 6,
        activeLines: [1],
        svgUpdate: drawInfoGraphics
    },
]
// Done - TODO add svgUpdate fields to keyframes

// Done - TODO write a function that highlights every bar in the colour it represents
// Done - TODO update the keyframe displaying the 4th line of the 3rd verse so that every bar gets highlighted in its respective colour
function highlightColourAll() {
    svg.selectAll(".bar")
        .transition() // call transition immediately before the attribute that you are changing
        .duration(500) // decide how long you want that transition to last in milliseconds
        .attr("fill", d => (d.colour.toLowerCase()));
}

function unhighlightColourAll() {
    svg.selectAll(".bar")
        .transition() // call transition immediately before the attribute that you are changing
        .duration(500) // decide how long you want that transition to last in milliseconds
        .attr("fill", '#665f3b');
}

// Done - TODO update keyframes for verse 4 to show each line one by one




// Done - TODO define global variables
let svg = d3.select("#svg");
const width = 750;
const height = 450;
let chart;
let chartWidth;
let chartHeight;
let xScale;
let yScale;
let chartData;
let violetChartData;
let barClickFlag = false;

// Done - TODO add event listeners to the buttons
document.getElementById("forward-button").addEventListener("click", forwardClicked);
document.getElementById("backward-button").addEventListener("click", backwardClicked);

// Done - TODO write an asynchronous loadData function
// Done - TODO call that in our initalise function
async function loadData() {
    // Because d3.json() uses promises we have to use the keyword await to make sure each line completes before moving on to the next line
    await d3.csv("../data/data.csv").then(data => {
        // Inside the promise we set the global variable equal to the data being loaded from the file
        chartData = data;
    });
}



function drawPieChart(){
 
  var radius = Math.min(width, height) / 2 - 40;
  var color = ['red','pink','white','yellow','orange'];

  

  svg.selectAll("*")
     .remove();

  svg.attr("width", width);
  svg.attr("height", height);
  svg.append("g");
  



  var pie = d3.pie()
  .value(function(d) {
    console.log(d.count);
    return d.count;
  });

  var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);


  var path = svg.selectAll("path")
      .data(pie(roseChartData))
      .enter()
      .append("path")
      .transition()
      .duration(1000)
      .attr("d", arc)
      .attr("fill", function(d, i) {
        console.log(i);
        return color[i];
      })
      .attr("transform", "translate(" + width/2 + "," + height/2 +")");

  var label = d3.arc()
      .innerRadius(0)
      .outerRadius(radius*3/2);

  svg.selectAll("text")
      .data(pie(roseChartData))
      .enter()
      .append("text")
      .transition()
      .duration(1000)
      .attr("transform", function(d) {
        console.log(label.centroid(d)[0] + width/2 );
        return "translate(" + (label.centroid(d)[0]+(width/2)-20) + "," + (label.centroid(d)[1]+(height/2)-0) +")";
      })
      .attr("dy", "0.35em")
      .attr("fill",'#999')
      .text(function(d) {
        return d.data.colour;
      });

    svg.append("text")
      .attr("id", "chart-title")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("fill", "white")
      .text("");
    svg.select("#chart-title")
        .style("fill",'#665f3b')
        .text("Distribution of Rose Colours");
    
}

// Done - TODO write a function to initialise the svg properly
function initialiseSVG(){
    svg.attr("width",width);
    svg.attr("height",height);

    svg.selectAll("*").remove();

    const margin = { top: 50, right: 30, bottom: 50, left: 50 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale = d3.scaleBand()
        .domain([])
        .range([0, chartWidth])
        .padding(0.1);

    yScale = d3.scaleLinear()
        .domain([])
        .nice()
        .range([chartHeight, 0]);

    // Add x-axis
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text");

    // Add y-axis
    chart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale))
        .selectAll("text");

    // Add title
    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "white")
        .text("");

    
}

// TODO write a function which will display the rose data sorted from highest to lowest
// HINT Be careful when sorting the data that you don't change the rosechartData variable itself, otherwise when you a user clicks back to the start it will always be sorted
// HINT If you have correctly implemented your updateBarchart function then you won't need to do anything extra to make sure it animates smoothly (just pass a sorted version of the data to updateBarchart) 
function drawFirstGraph() {
    let chartDataCopy = [...chartData];

    if(keyframes[keyframeIndex].activeVerse == 1){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 42 && obj.Group == "National Estimate"})
        drawLineGraph(filteredData, "December 2021 - February 2022");
    }else if(keyframes[keyframeIndex].activeVerse == 2 || keyframes[keyframeIndex].activeVerse == 3){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 45 && obj.Group == "National Estimate"})
        drawLineGraph(filteredData, "December 2021 - May 2022");
    }else if(keyframes[keyframeIndex].activeVerse == 4){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 48 && obj.Group == "National Estimate"})
        drawLineGraph(filteredData, "December 2021 - August 2022");
    }else{
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 51 && obj.Group == "National Estimate"})
        drawLineGraph(filteredData, "December 2021 - November 2022");
    }
    
    
}

function drawSecondGraph() {
    let chartDataCopy = [...chartData];

    if(keyframes[keyframeIndex].activeVerse == 1){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 42 && obj.Group == "By State"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.State;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'State':data[0],'Value':data[1]}});
    
        drawMap(mergedData, "December 2021 - February 2022 By State");
    }else if(keyframes[keyframeIndex].activeVerse == 2 || keyframes[keyframeIndex].activeVerse == 3){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 45 && obj.Group == "By State"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.State;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'State':data[0],'Value':data[1]}})
        
        drawMap(mergedData, "December 2021 - May 2022 By State");
    }else if(keyframes[keyframeIndex].activeVerse == 4){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 48 && obj.Group == "By State"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.State;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'State':data[0],'Value':data[1]}})
        
        drawMap(mergedData, "December 2021 - August 2022 By State");
    }else{
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 51 && obj.Group == "By State"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.State;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'State':data[0],'Value':data[1]}})
        
        drawMap(mergedData, "December 2021 - November 2022 By State");
    }
    


}

function drawThirdGraph() {
    let chartDataCopy = [...chartData];
    

    if(keyframes[keyframeIndex].activeVerse == 1){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 42 && obj.Group == "By Gender identity"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.Subgroup;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'Subgroup':data[0],'Value':data[1]}});
        console.log(mergedData);
        drawBubbles(mergedData, "December 2021 - February 2022 By Gender");
    }else if(keyframes[keyframeIndex].activeVerse == 2 || keyframes[keyframeIndex].activeVerse == 3){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 45 && obj.Group == "By Gender identity"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.Subgroup;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'Subgroup':data[0],'Value':data[1]}})
        
        drawBubbles(mergedData, "December 2021 - May 2022 By Gender");
    }else if(keyframes[keyframeIndex].activeVerse == 4){
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 48 && obj.Group == "By Gender identity"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.Subgroup;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'Subgroup':data[0],'Value':data[1]}})
        
        drawBubbles(mergedData, "December 2021 - August 2022 By Gender");
    }else{
        let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 51 && obj.Group == "By Gender identity"});
        var mergedData = Object.entries(filteredData.reduce((object, item) => {
            var value = item.Value;
            var state = item.Subgroup;
            if (!object.hasOwnProperty(state)) {
            object[state] = 0;
            }
            
            object[state] += (value/12);
            return object;
        }, {})).map(data => {return {'Subgroup':data[0],'Value':data[1]}})
        
        drawBubbles(mergedData, "December 2021 - November 2022 By Gender");
    }
}

function drawFourthGraph() {
    drawInfoGraphics();
}

// Done - TODO draw a bar chart from the rose dataset
function drawRoseColours() {
    let chartDataCopy = [...chartData];
    
    let filteredData = chartDataCopy.filter((obj) => {return obj.Indicator == "Symptoms of Depressive Disorder" && parseInt(obj['Time Period']) >= 40 && parseInt(obj['Time Period']) <= 51 && obj.Group == "National Estimate"})
    //drawBarChart(roseChartData, "Distribution of Rose Colours");
    updateBarChart(roseChartData, "Distribution of Rose Colours");
}

// Done - TODO draw a bar chart from the violet dataset
function drawVioletColours() {
    updateBarChart(violetChartData, "Distribution of Violet Colours");
}

function highlightColour(colourName, highlightColour) {
    // Done - TODO select bar that has the right value
    // Done - TODO update it's fill colour

    // Done - TODO add a transition to make it smooth
    svg.selectAll(".bar")
        .transition() // call transition immediately before the attribute that you are changing
        .duration(500) // decide how long you want that transition to last in milliseconds
        .attr("fill", d => (d.colour === colourName ? highlightColour : "#665f3b"));
}

function drawMap(data, title = ""){
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    svg.selectAll("*").remove();
    initialiseSVG();
    chart.selectAll("*").remove();

    let colorScale = d3.scaleLinear()
                .domain(d3.extent(data, d => parseFloat(d.Value)))
                .range([255,127]);

  const projection = d3.geoAlbersUsa().translate([width/2,height/2]).scale(700);
  const pathGenerator = d3.geoPath().projection(projection);

  

    d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then((mapdata) => {
        const states = topojson.feature(mapdata, mapdata.objects.states);
        //console.log(states);
    
        chart
          .selectAll('path')
          .data(states.features)
          .enter()
          .append('path')
          .attr('class', 'state')
          
          .attr('d', pathGenerator)
          .attr('fill', function(d){
            //console.log(d.properties.name);
            
            let value = data.filter((obj) => {return obj.State == d.properties.name});
            if (value.length > 0){
                //console.log(value[0].Value);
                let r = colorScale(value[0].Value);
                console.log()
                return "rgb("+102+","+r+","+59+")";
            }else{
                return "rgb("+0+","+0+","+0+")";
            }
            
          })
          .attr("transform", "translate(" + -margin.left + "," + -margin.top + ")");
    });

    if (title.length > 0) {
        svg.select("#chart-title")
            .style("fill",'#665f3b')
            .text(title);
    }

}

function drawLineGraph(data, title = ""){
    svg.selectAll("*").remove();
    initialiseSVG();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    xScale.domain(data.map(d => monthNames[d3.timeParse("%m/%d/%Y")(d['Time Period End Date']).getMonth()]));
    //xScale.domain(data.map(d => d['Time Period']));
    yScale.domain(d3.extent(data, d => parseFloat(d.Value))).nice();


    

    const bars = chart.selectAll(".bar").data(data, d => d.value);

    

    var line = d3.line()
        .x(d => xScale(monthNames[d3.timeParse("%m/%d/%Y")(d['Time Period End Date']).getMonth()]) + xScale.bandwidth()/2)
        .y(d => yScale(parseFloat(d.Value))) 
        .curve(d3.curveLinear)

    bars.enter().append("path")
        .datum(data) 
        .attr("class", "line") 
    //.attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#665f3b")
        .style("stroke-width", "2");

    bars.enter().append("circle")
        .attr("class", "bar")
        .attr("cx", d => xScale(monthNames[d3.timeParse("%m/%d/%Y")(d['Time Period End Date']).getMonth()]) + xScale.bandwidth()/2)
        .attr("cy", d => yScale(parseFloat(d.Value))) // Update the y value so that the bar is in the right location vertically
        .attr("r", 4)
        //.attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("fill", "#665f3b");


    chart.select(".x-axis")
        .call(d3.axisBottom(xScale).tickSizeOuter(0,0));

    chart.select(".y-axis")
        .call(d3.axisLeft(yScale));

    if (title.length > 0) {
            svg.select("#chart-title")
                .style("fill",'#665f3b')
                .text(title);
        }


}

function drawBubbles(data, title = ""){
    svg.selectAll("*").remove();
    initialiseSVG();

    //chart.selectAll("*").remove();
    xScale.domain(data.map(d => d['Subgroup']));
    //xScale.domain(data.map(d => d['Time Period']));
    let sizeScale = d3.scaleLinear()
                .domain(d3.extent(data, d => parseFloat(d.Value)))
                .range([0.2,0.8]);

    let bars = chart.selectAll(".bar").data(data, d => d.value);

    bars.enter().append('g').attr('class',(d,i) => 'symbol_'+i)
    .attr("x", d => xScale(d['Subgroup']) + xScale.bandwidth()/2)
    .attr("y", height/2) // Update the y value so that the bar is in the right location vertically
    //.attr("scale",d => sizeScale(d.Value))
    //.attr("transform", "translate(" + (xScale(d['Subgroup']) + xScale.bandwidth()/2) + "," + (height/2) + ")")
    .attr("fill", "#665f3b");

    chart.select(".x-axis")
        .call(d3.axisBottom(xScale));
    
    chart.selectAll(".tick").select('line')
        .remove();

    chart.select(".y-axis")
        .remove();

    chart.select(".domain")
        .remove();

    let plan_d="m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47"

    let male_d="M 61.374 0 v 6.039 h 18.318 L 57.823 27.907 c -6.124 -5.16 -14.022 -8.278 -22.638 -8.278 C 15.784 19.63 0 35.414 0 54.815 C 0 74.216 15.784 90 35.185 90 s 35.185 -15.784 35.185 -35.185 c 0 -8.616 -3.118 -16.514 -8.278 -22.638 l 21.869 -21.869 v 18.318 H 90 V 0 H 61.374 z M 35.185 83.961 c -16.071 0 -29.147 -13.075 -29.147 -29.146 c 0 -16.071 13.075 -29.147 29.147 -29.147 s 29.147 13.075 29.147 29.147 C 64.332 70.886 51.257 83.961 35.185 83.961 z";
    let trans_d="M 67.238 0 v 6 h 7.545 L 60.421 20.362 c -4.227 -3.26 -9.517 -5.205 -15.255 -5.205 c -5.823 0 -11.184 2.004 -15.441 5.351 l -4.38 -4.38 l 5.273 -5.273 l -4.242 -4.242 l -5.273 5.273 L 15.217 6 h 7.545 V 0 H 4.975 v 17.788 h 6 v -7.545 l 5.885 5.885 L 11.587 21.4 l 4.242 4.242 l 5.273 -5.273 l 4.38 4.38 c -3.347 4.257 -5.351 9.618 -5.351 15.441 c 0 12.788 9.641 23.36 22.035 24.848 v 7.59 h -7.457 v 6 h 7.457 V 90 h 6 V 78.63 h 7.456 v -6 h -7.456 v -7.59 C 60.56 63.552 70.2 52.979 70.2 40.191 c 0 -5.908 -2.062 -11.34 -5.497 -15.627 l 14.322 -14.322 v 7.545 h 6 V 0 H 67.238 z M 45.166 59.226 c -10.496 0 -19.035 -8.539 -19.035 -19.034 c 0 -10.496 8.539 -19.035 19.035 -19.035 c 10.495 0 19.034 8.539 19.034 19.035 C 64.2 50.687 55.661 59.226 45.166 59.226 z";
    let female_d="M 75.016 71.038 H 47.968 v -12.16 c 6.544 -0.655 12.91 -3.481 17.912 -8.484 c 11.513 -11.513 11.513 -30.246 0 -41.759 c -11.513 -11.514 -30.247 -11.514 -41.759 0 c -11.514 11.513 -11.514 30.246 0 41.759 c 5.002 5.003 11.368 7.829 17.912 8.484 v 12.16 H 14.984 v 5.935 h 27.049 V 90 h 5.935 V 76.973 h 27.048 V 71.038 z M 28.317 12.831 c 4.6 -4.6 10.642 -6.899 16.683 -6.899 c 6.042 0 12.083 2.3 16.683 6.899 c 9.199 9.199 9.199 24.167 0 33.366 c -9.199 9.198 -24.167 9.198 -33.367 0 C 19.118 36.999 19.118 22.03 28.317 12.831 z";
    chart.select(".symbol_0").append("path")
            .attr('d',male_d)
            .attr("transform", "translate(" + (xScale(data[0]['Subgroup']) + xScale.bandwidth()/2 - 256*sizeScale(data[0].Value)*0.5)/(2.81*sizeScale(data[0].Value)) + "," + (height/2 - 256*sizeScale(data[0].Value)*0.5)/(sizeScale(data[0].Value)*2.81) + ")")
            .style("scale",2.81*sizeScale(data[0].Value))
            .style("fill", "#665f3b");
    chart.select(".symbol_1").append("path")
            .attr('d',female_d)
            .style("scale",2.81*sizeScale(data[1].Value))
            .attr("transform", "translate(" + (xScale(data[1]['Subgroup']) + xScale.bandwidth()/2 - 256*sizeScale(data[1].Value)*0.5)/(2.81*sizeScale(data[1].Value)) + "," + (height/2 - 256*sizeScale(data[1].Value)*0.5)/(sizeScale(data[1].Value)*2.81) + ")")
            .style("fill", "#665f3b");

    chart.select(".symbol_2").append("path")
            .attr('d',trans_d)
            .style("scale",2.81*sizeScale(data[2].Value))
            .attr("transform", "translate(" + (xScale(data[2]['Subgroup']) + xScale.bandwidth()/2 - 256*sizeScale(data[2].Value)*0.5)/(2.81*sizeScale(data[2].Value)) + "," + (height/2 - 256*sizeScale(data[2].Value)*0.5)/(sizeScale(data[2].Value)*2.81) + ")")
            .style("fill", "#665f3b");

    
    if (title.length > 0) {
        svg.select("#chart-title")
            .style("fill",'#665f3b')
            .text(title);
    }

    
}

function drawInfoGraphics(){
    svg.selectAll("*").remove();

    svg.select("#chart-title")
            .style("fill",'#665f3b')
            .text("hello");


    const margin = { top: 50, right: 30, bottom: 50, left: 50 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    

    // Add title
    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", height / 2 - 60)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "#665f3b")
        .text("Your present circumstances don’t determine where you go;");

    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", height / 2 - 40)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "#665f3b")
        .text("they merely determine where you start");

    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", height / 2 + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "#665f3b")
        .text("If you or anyone you know is in need of help");

    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", height / 2 + 60)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "#665f3b")
        .text("Please contact +1-866-903-3787");



        
}

// Done - TODO recreate the updateBarchart function from the tutorial
function updateBarChart(data, title = "") {
    // Done - TODO Update the xScale domain to match new order
    // Done - TODO Update the yScale domain for new values

    // Done - TODO select all the existing bars
    // Done - TODO remove any bars no longer in the dataset
    // Done - TODO move any bars that already existed to their correct spot
    // Done - TODO Add any new bars

    // Done - TODO update the x and y axis

    // Done - TODO update the title

    // TODO add animation to ALL aspects of updating the bar chart (removing bars, moving bars, adding bars, updating axes, updating the title)
    // HINTS for adding animation remember to call .transition().duration(num_of_ms) immediately before the fields you change
    // for removing bars - you want the height to go down to 0 and the y value to change too. Then you can call .remove()
    // for moving existing bars - you'll have to update their x, y, and height values
    // for adding new bars - see the tutorial
    // for the axes all you need to do is add a transition before the .call function we use in the tutorial
    // for the title .text is the function that actually changes the title


    //Update our scales so that they match the new data
    //As our svg is staying the same dimensions each time we only need to update the domains
    xScale.domain(data.map(d => d.colour));
    yScale.domain([0, d3.max(data, d => d.count)]).nice();

    // We want to make a selection of the existing bars in the chart
    // This line of code will bind the new data we have loaded to our bars
    const bars = chart.selectAll(".bar")
        .data(data, d => d.colour);

    // First we want to remove any bars that we no longer want to display
    // bars.exit() is a d3 selection that will return any bars that are not in the new selection.
    // when we call this function to initially draw the bar chart this won't return anything because their were no bars to begin with
    // when we call this to draw the violet bar chart when the rose one was being displayed the exit selection will be the bars that had values in the rose dataset but don't exist in the violet one
    // calling remove on this selection will remove all these bars from the graph
    bars.exit()
        .transition()
        .duration(250)
        .attr("y", chartHeight)
        .attr("height",0)
        .remove();

    // Now we want to move any bars that had values in the old dataset but now have new values or locations
    bars.transition()
        .duration(250)
        .delay(250)
        .attr("x", d => xScale(d.colour))
        .attr("y", d => yScale(d.count))
        .attr("height", d => chartHeight - yScale(d.count));

    // Finally we will add any bars that are new
    // To do that we will use the d3 built in function .enter() which provides a selection of any new values
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.colour))
        .attr("y", chartHeight) // Set initial y position below the chart so we can't see it
        .attr("width", xScale.bandwidth())
        .attr("height", 0) // Set initial height to 0 so there is nothing to display
        .attr("fill", "#665f3b")
        .transition() // Declare we want to do a transition
        .duration(500) // This one is going to last for one second
        .delay(500)
        .attr("y", d => yScale(d.count)) // Update the y value so that the bar is in the right location vertically
        .attr("height", d => chartHeight - yScale(d.count)); // Update the height value

    // Next let's update the axes so they are displayed correctly
    chart.select(".x-axis")
        .transition() // Declare we want to do a transition
        .duration(1500) // This one is going to last for one second
        .call(d3.axisBottom(xScale));

    chart.select(".y-axis")
        .transition() // Declare we want to do a transition
        .duration(1500)
        .call(d3.axisLeft(yScale));

    // And finally if a new title has been specified we will update the title too
    if (title.length > 0) {
        svg.select("#chart-title")
            .style("fill",'#665f3b')
            .text(title);
    }
}



function forwardClicked() {
    // Done - TODO define behaviour when the forwards button is clicked
    if (keyframeIndex < keyframes.length - 1) {
        keyframeIndex++;
        drawKeyframe(keyframeIndex);
    }
}

function backwardClicked() {
    // Done - TODO define behaviour when the backwards button is clicked
    if (keyframeIndex > 0) {
        if (keyframes[keyframeIndex].activeVerse == 5){
            initialiseSVG();
        }
        keyframeIndex--;
        drawKeyframe(keyframeIndex);
    }
}

function drawKeyframe(kfi) {
    // Done - TODO get keyframe at index position
    let kf = keyframes[kfi];

    // Done - TODO reset any active lines
    resetActiveLines();

    // Done - TODO update the active verse
    updateActiveVerse(kf.activeVerse);

    // Done - TODO update any active lines
    for(line of kf.activeLines){
        updateActiveLine(kf.activeVerse,line);
    }

    // Done - TODO update the svg
    if(kf.svgUpdate){
        // If there is we call it like this
        kf.svgUpdate();
    }

    if(kf.activeVerse == 4){
        makeRedBarClickable();
    }
}

// Done - TODO write a function to reset any active lines
function resetActiveLines() {
    d3.selectAll(".line").classed("active-line",false);
}

// Done -  TODO write a function to update the active verse
function updateActiveVerse(id) {
    d3.selectAll(".verse").classed("active-verse",false);
    d3.selectAll("#verse"+id).classed("active-verse",true);
    scrollLeftColumnToActiveVerse(id);
}

// Done - TODO write a function to update the active line
function updateActiveLine(vid, lid) {
  let thisVerse = d3.select("#verse" + vid);
  thisVerse.select("#line" + lid).classed("active-line", true);
}

// Done - TODO write a function to scroll the left column to the right place
// Done - TODO select the div displaying the left column content
// Done - TODO select the verse we want to display
// Done - TODO calculate the bounding rectangles of both of these elements
// Done - TODO calculate the desired scroll position
// Done - TODO scroll to the desired position
// Done - TODO call this function when updating the active verse

function scrollLeftColumnToActiveVerse(id) {
    // First we want to select the div that is displaying our text content
    var leftColumn = document.querySelector(".left-column-content");

    // Now we select the actual verse we would like to be centred, this will be the <ul> element containing the verse
    var activeVerse = document.getElementById("verse" + id);

    // The getBoundingClientRect() is a built in function that will return an object indicating the exact position
    // Of the relevant element relative to the current viewport.
    // To see a full breakdown of this read the documentation here: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    var verseRect = activeVerse.getBoundingClientRect();
    var leftColumnRect = leftColumn.getBoundingClientRect();

    // Now we calculate the exact location we would like to scroll to in order to centre the relevant verse
    // Take a moment to rationalise that this calculation does what you expect it to
    var desiredScrollTop = verseRect.top + leftColumn.scrollTop - leftColumnRect.top - (leftColumnRect.height - verseRect.height) / 2;

    // Finally we scroll to the right location using another built in function.
    // The 'smooth' value means that this is animated rather than happening instantly
    leftColumn.scrollTo({
        top: desiredScrollTop,
        behavior: 'smooth'
    })
}


// TODO write a function to make every instance of "red" and "purple" in the poem hoverable. When you hover the corresponding bar in the chart (if it exists) should be highlighted in its colour
// HINT when you 'mouseout' of the word the bar should return to it's original colour
// HINT you will wamt to edit the html and css files to achieve this
// HINT this behaviour should be global at all times so make sure you call it when you intialise everything

// TODO write a function so that when you click on the red bar when verse 4 is displayed (and only when verse 4 is displayed) every instance of the word red in the poem are highlighted in red
// HINT you will need to update the keyframes to do this and ensure it isn't global behaviour
// HINT you will again have to edit the html and css

// TODO update the html to add a fifth verse
// TODO add keyframe(s) for your new fifth verse
// TODO the first keyframe should update the svg and display a pie chart of either the roses or violets dataset


function makeRedHoverable() {
    d3.selectAll(".red-span").on("mouseover", () => highlightColour("Red", "red"));
    d3.selectAll(".red-span").on("mouseout", () => highlightColour("Red", "#665f3b"));
}

function makePurpleHoverable() {
    d3.selectAll(".purple-span").on("mouseover", () => highlightColour("Purple", "purple"));
    d3.selectAll(".purple-span").on("mouseout", () => highlightColour("Purple", "#665f3b"));
}

function makeRedBarClickable() {
    // Select the bar associated with the "red" value
    const redBar = chart.select(".bar").filter(d => d.colour === "Red");
    
    // Add a mouseover event listener
    redBar.on("click", () => {
        if(keyframes[keyframeIndex].activeVerse == 4){
            barClickFlag = !barClickFlag;
        d3.selectAll(".red-span").classed("red-text", barClickFlag); //This will select all elements with the class name "red-span" not just one.
        }
        
    });

};

async function initialise() {
    await loadData();
    initialiseSVG();
    drawKeyframe(keyframeIndex);
    makeRedHoverable();
    makePurpleHoverable();
    makeRedBarClickable();
    // Done - TODO draw the first keyframe

    // Done - TODO load the data

    // Done - TODO initalise the SVG


}


initialise();

