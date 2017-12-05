var width2 = 600,
    height2 = 300;

var colorrange = ["#2e9968","#44a092",
//"#4be79b",
"#4b6f67",
"#61f1ce",
"#3e785d",
"#b6e6d4",

//"#66d9d2",
"#85ad9e",
"#63c99d"];

//var colorrange = chroma.scale(['#3E785D','#85AD9E']).colors(14);
var colorrange = ["#649480", "#85ad9e", "#7aa494", "#538871", "#488067", "#74a08f", "#3e785d", "#598c76", "#4e846c", "#5e907b", "#699885", "#437c62", "#7fa899", "#6f9c8a"];

var colorrange = ["#85AD9E","#3E785D", "#85AD9E","#3E785D", "#85AD9E","#3E785D", "#85AD9E","#3E785D", "#85AD9E","#3E785D", "#85AD9E"];

//function shuffleArray(array) {
//    for (var i = array.length - 1; i > 0; i--) {
//        var j = Math.floor(Math.random() * (i + 1));
//        var temp = array[i];
//        array[i] = array[j];
//        array[j] = temp;
//    }
//    return array;
//}

//colorrange = shuffleArray(colorrange);
//console.log(colorrange);


var svg2 = d3.select("#chart2")
    .append("svg")
    .attr("width", width)
    .attr("height", height2)

var levyg = svg2.append("g")
    .append("g")
    .attr("transform", "translate(" + margin.left + ",20)")

var x2 = d3.scaleLinear().rangeRound([0,width-100])






d3.csv("petrol_levies.csv", function (data2) { 
    console.log(data2);
    
    var levyTotal = data2[14].valueRounded; 
    
    console.log(levyTotal);
    
    x2.domain([0,levyTotal]);
    
    var dataTemp = data2.filter( function (d) { return (d.levy !== "pumpPrice") && (d.value > 0); })
   
    
    console.log(dataTemp);
    
    var addUp = 0; 
    var labely = 0; 
    
    dataTemp.forEach( function (d, i) { 
        d.value = +d.value;
        d.valueRounded = +d.valueRounded;
         
        
        levyg.append("rect")
//        .attr("rx", 10)
//        .attr("ry", 10)
        .attr("x", addUp)
        .attr("y",60)
       
        .attr("width", x2(d.valueRounded))
        .attr("height", 20)
        .style("fill", function ()  { 
            return colorrange[i];
        })
//        .on("mouseover", function () { 
//            
//            var classlabel = ".label" + i; 
//            
//            d3.select(".label" + i)
//                .style("visibility", "visible")
//                
//                
//        
//        })
//        
//        .on("mouseout", function () { 
//            d3.select(".label" + i)
//                .style("visibility","hidden")
//        
//        })
        
        levyg.append("text")
//            
            .text(d.label + " ( " + d.value + " cents )")
            .attr("x", addUp + (x2(d.valueRounded) / 2) + 4)
            .attr("y", labely + 10)
            .attr("class", "label")
            .style("text-anchor","end")
            .classed("label" + i, true)
            .classed("chart2labels", true)

        

//        
//        levyg.append("line")
//            .attr("y1", addUp + (y2(d.valueRounded) / 2))
//            .attr("y2", addUp + (y2(d.valueRounded) / 2))
//            .attr("x1", 180)
//            .attr("x2", labely)
//            .attr("class","annotateline")
        
        
            
        

        
//        labely == 150 ? labely = 250 : labely = 150;
//        if(i >3) labely += 15;
        
         addUp += (x2(d.valueRounded) );
        
        
    })
    
    // markers
    
    var origin = 90,
        offset = 110;
    
    function addMarkers(start, end, labeltop, labelbottom, labelpercent, labelpoint) { 
        
        levyg.append("line")
            .attr("x1", start)
            .attr("x2", end)
            .attr("y1", offset)
            .attr("y2", offset)
            .attr("class","annotationline")
        
        levyg.append("line")
            .attr("x1",start)
            .attr("x2",start)
            .attr("y1",origin)
            .attr("y2",offset)
            .attr("class","annotationline")
        
        levyg.append("line")
            .attr("x1",end)
            .attr("x2",end)
            .attr("y1",origin)
            .attr("y2",offset)
            .attr("class","annotationline")
        
        levyg.append("foreignObject")
            .attr("x",labelpoint)
            .attr("y",offset+10)
            .html(labelbottom)
            .attr("class","label")
            .style("text-anchor","middle")
            .style("font-size","0.75em")
            
        
        levyg.append("foreignObject")
            .attr("x",labelpoint)
            .attr("y",offset-20)
            .html(labeltop)
            .attr("class","label")
            .style("text-anchor","middle")
            .style("font-size","0.75em")
            .classed("labeltopcents", true)
        
        levyg.append("foreignObject")
            .attr("x",labelpoint)
            .attr("y",offset-20)
            .html(labelpercent)
            .attr("class","label")
            .style("text-anchor","middle")
            .style("font-size","0.75em")
            .classed("labeltoppercent", true)
//            .style("shape-rendering","crispEdges")
        
        
        // add option button
        
       
    }  
    
    
    // ADD PUMP PRICE LABEL/MARKER
    
    levyg.append("line")
            .attr("x1", 0)
            .attr("x2", x2(1235.4))
            .attr("y1", 20)
            .attr("y2", 20)
            .attr("class","annotationline")
            .style("stroke", "gray")
        
        levyg.append("line")
            .attr("x1",0)
            .attr("x2",0)
            .attr("y1",20)
            .attr("y2",50)
            .attr("class","annotationline")
            .style("stroke", "gray")
//        
        levyg.append("line")
            .attr("x1",x2(1235.4))
            .attr("x2",x2(1235.4))
            .attr("y1",20)
            .attr("y2",50)
            .attr("class","annotationline")
            .style("stroke", "gray")
//        
        levyg.append("foreignObject")
            .attr("x",(x2(1235.4)/2) - x2(50))
            .attr("y",10)
            .html("<div class='pumplabel'>R12,35/LITRE</div>")
//            .attr("class","pumplabel")
            .style("text-anchor","middle")
            .style("font-size","0.75em")
        
         levyg.append("foreignObject")
            .attr("x",(x2(1235.4)/2) - x2(200))
            .attr("y",35)
            .html("<div class='pumplabel2'>This price is made up of the following costs and levies: </div>")
//            .attr("class","pumplabel")
            .style("text-anchor","middle")
            .style("font-size","0.75em")
        
    
        
        
    // ADD ASTERISK DESCRIPTIONS
    
    levyg.append("foreignObject")
        .attr("x", 0)
        .attr("y", 170)
        .html("<div class='levyExpl'>* The <span style='color: #fff;'>Basic Fuel Price</span> is the base cost of shipping petroleum products to South Africa. This cost includes insurance, storage, harbouring costs and storage facilities.</div>")
    
    levyg.append("foreignObject")
        .attr("x", 350)
        .attr("y", 170)
        .html("</div><div class='levyExpl'>** The <span style='color:#fff;'>Demand Side Management Levy (DSML)</span> is applied to 95 unleaded petrol in inland areas. Most vehicles inland don't need to use 95 unleaded petrol and the DSM levy is intended to curtail demand.</div>")
    
//     levyg.append("foreignObject")
//            .attr("x", 0)
//            .attr("y", 100)
//            .html("<div class='levycheck'><input name='hidelevy' type='checkbox'> <span class='levylabel'>Show as percent</span> </div>")
     
      d3.select("[name=hidelevy]")
                .on("change", function () { 
                    var checked = d3.select("[name=hidelevy]").property('checked');
                    if(checked) { 
                        console.log("Checked");
                        d3.selectAll(".labeltoppercent")
                            .style("visibility", "visible")
                        d3.selectAll(".labeltopcents")
                            .style("visibility", "hidden")
                        d3.select(".levylabel")
                            .text("Show as cents")
                        
                       
                    }
                    else { 
                        d3.selectAll(".labeltopcents")
                            .style("visibility","visible")
                        d3.selectAll(".labeltoppercent")
                            .style("visibility","hidden")
                        d3.select(".levylabel")
                            .text("Show as percent")
                        
                        
                    }
                })
        
    
    
    // BFP Marker
      
    
    
    
    var markerLabelTop = Math.round(dataTemp[0].value) + " cents";  
    var markerLabelTopPercent = Math.round((dataTemp[0].value/1235.4)*100) + "%"; 
    var markerLabelBottom = dataTemp[0].label + "*" ;
    var endPoint = x2(dataTemp[0].value),
        startPoint = 0,
        labelPoint = (x2(dataTemp[0].value)/2)-100;
    
    addMarkers(startPoint, (endPoint-2), markerLabelTop, markerLabelBottom, markerLabelTopPercent, labelPoint);  
    
    var markerLabelTop = Math.round(dataTemp[1].value) + " cents";  
    var markerLabelTopPercent = Math.round((dataTemp[1].value/1235.4)*100) + "%";
    var markerLabelBottom = dataTemp[1].label ; 
    var startPoint = endPoint,
        endPoint = startPoint + x2(dataTemp[1].value),
        labelPoint = startPoint + (x2(dataTemp[1].value) /2)-100
    
    addMarkers(startPoint, (endPoint-2), markerLabelTop, markerLabelBottom, markerLabelTopPercent, labelPoint);
    
    var markerLabelTop = Math.round(dataTemp[2].value) + " cents";  
    var markerLabelTopPercent = Math.round((dataTemp[2].value/1235.4)*100) + "%";
    var markerLabelBottom = dataTemp[2].label ;
    var startPoint = endPoint,
        endPoint = startPoint + x2(dataTemp[2].value),
        labelPoint = startPoint + (x2(dataTemp[2].value) /2)-100
    
    addMarkers(startPoint, (endPoint-2), markerLabelTop, markerLabelBottom, markerLabelTopPercent, labelPoint);
    
    var markerLabelTop = dataTemp[3].value + " cents";  
    var markerLabelTopPercent = Math.round((dataTemp[3].value/1235.4)*100) + "%";
    var markerLabelBottom = dataTemp[3].label ;
    var startPoint = endPoint,
        endPoint = startPoint + x2(dataTemp[3].value),
        labelPoint = startPoint + (x2(dataTemp[3].value) /2)-100
    
    addMarkers(startPoint, (endPoint-2), markerLabelTop, markerLabelBottom, markerLabelTopPercent, labelPoint);
    
    var markerLabel = dataTemp[4].label + "<br />"; 
    var markerLabel = markerLabel + dataTemp[5].label + "<br />"; 
    var markerLabel = markerLabel + dataTemp[6].label + "<br />"; 
    var markerLabel = markerLabel + dataTemp[7].label + "<br />"; 
    var markerLabel = markerLabel + dataTemp[8].label + "**<br />"; 
    var markerLabelBottom = markerLabel + dataTemp[9].label + "<br />"; 
    var markerLabelTop = "121 cents<br />"
    var markerLabelTopPercent = Math.round((120.73/1235.4)*100) + "%";
    var startPoint = endPoint,
        endPoint = (startPoint + x2(123.73)),
        labelPoint = startPoint + (123.73 /2)-108
    
    addMarkers(startPoint, (endPoint-2), markerLabelTop, markerLabelBottom, markerLabelTopPercent, labelPoint);
    
    
    
    
    
//    console.log(dataTemp);
    
    
    
})
    