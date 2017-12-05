var width3 = 800 - margin.left - margin.right,
            height3 = 400 - margin.top - margin.bottom;
        
          
        var brentSvg = d3.select("#chart3")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height3 + margin.top + margin.bottom)
        
        var brentg = brentSvg.append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        
        var x3 = d3.scaleTime().range([0,width-100]),
            y3 = d3.scaleLinear().rangeRound([height3,0]),
            y4 = d3.scaleLinear().rangeRound([height3,0])
        
        var area = d3.area()
                .x(function(d) { return x3(d.dateMonth); })
                .y1(function(d) { return y3(d.brentCrude); })
                .y0(y(0));
        
        var area2 = d3.area()
                .x(function(d) { return x3(d.dateMonth); })
                .y1(function(d) { return y4(d.exchangeRate); })
                .y0(y(0));

        var line1 = d3.line()
            .x(function(d) { return x3(d.dateMonth); })
            .y(function(d) { return y4(d.exchangeRate); });

        var line2 = d3.line()
            .x(function(d) { return x3(d.dateMonth); })
            .y(function(d) { return y4(d.adjusted); });

        var line3 = d3.line()
            .x(function(d) { return x3(d.dateMonth); })
            .y(function(d) { return y4(d.pumpPrice); });
        
    
        
        
        d3.csv("petrol_price.csv", function (data3) { 
           
            data3.forEach( function (d) { 
                
                d.dateMonth = parseDate(d.dateMonth);
                d.brentCrude = +d.brentCrude;
                d.exchangeRate = +d.exchangeRate;
                d.adjusted = +d.adjusted/100;
                d.pumpPrice = +d.pumpPrice/100;
                d.randPerBarrel = +d.randPerBarrel;
                
            })
            
            x3.domain(d3.extent(data3, function (d) { return d.dateMonth}))
            y3.domain([0, d3.max(data3, function (d) { return d.brentCrude + 30; })])
            y4.domain([0, d3.max(data3, function (d) { return d.exchangeRate; })])
            
            brentg.append("g")
                .attr("class","axis axis--x")
                .attr("transform", "translate(0," + height3 +")")
                .call(d3.axisBottom(x3))
            
            brentg.append("g")
                  .attr("class", "axis axis--y")
                  .call(d3.axisLeft(y3).ticks(5))
            
            brentg.append("g")
                  .attr("class", "axis axis--y")
                  .call(d3.axisRight(y4).ticks(5))
                    .attr("transform","translate(" + (width - 100) + "," + "0)")
            
            
            
            var areaChart = brentg.append("path")
                .datum(data3)
                .attr("class", "area")
                .attr("d", area);
            
//            y3.domain([0, d3.max(data3, function (d) { return d.exchangeRate + 200; })])
            
            brentg.append("path")
                .datum(data3)
                .attr("class", "line1")
                .attr("d", line1);
            
//            brentg.append("path")
//                .datum(data3)
//                .attr("class", "line2")
//                .attr("d", line2);
            
//            brentg.append("path")
//                .datum(data3)
//                .attr("class", "line3")
//                .attr("d", line3);
//                
//             
            
            // Change to $ per barrel 
            
            function barrelPrice() { 
                
                y3.domain([0, d3.max(data3, function (d) { return d.brentCrude + 30; })])
                area.y1(function(d) { return y3(d.brentCrude); })
                
                areaChart
                    .datum(data3)
                    .attr("d",area)
                    
            
            }
            
            d3.select(".changeCurrency")
                .on("click", barrelPrice)
           
            
        })
        
        
         d3.select("#legend2")
            .style("top", (margin.top/3*2) + "px")
            .style("left", margin.left + "px")