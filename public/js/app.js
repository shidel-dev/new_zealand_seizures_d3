d3.csv("nz_seizure_incidents_data.csv", function(totals) {
  var diameter = 960,
  format = d3.format(",d"),
  color = d3.scale.category20c();

  var bubble = d3.layout.pack()
  .sort(null)
  .size([diameter, diameter])
  .padding(1.5);

  var svg = d3.select("body").append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");

  // for(var i; i < totals.length;)
  var node = svg.selectAll(".node")
  .data(
    bubble.nodes({children: totals}).filter(function (t) { return !t.children; })
  )
  //.data(totals)
  .enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    // .text(function (t) { return t["Description of Goods"]  })

    node.append("circle")
    .attr("r", function(t) { return t["value"]; })
    .style("fill", function(d) { return color("blue"); });



    d3.select(self.frameElement).style("height", diameter + "px");
});
