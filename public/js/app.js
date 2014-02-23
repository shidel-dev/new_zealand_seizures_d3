d3.csv("nz_seizure_incidents_data-trimmed.csv", function(totals) {
  var diameter = 960,
  format = d3.format(",d"),
  color = d3.scale.category20c();

  var bubble = d3.layout.pack()
  .sort(null)
  .size([diameter, diameter]).padding(0)

  var force = d3.layout.force()
    .nodes(totals)
    .size([diameter, diameter])
    .gravity(.02)
    .charge(0)
    .on("tick", tick)
    .start();

  var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  var color = d3.scale.linear()
      .domain([1,4,10])
      .range(["yellow","orange","red"])


var x = d3.scale.linear().domain([1,4,10]).range([5,50]),
    y = d3.scale.linear().domain([1,4,10]).range([5,50]),
    r = d3.scale.linear().domain([1,4,10]).range([5,22.5,50]);

  // var r = d3.scale.linear()
  //     .domain(1,4,10)
  //     .range([5,20,50])

  // for(var i=0; i < totals.length; i++) {
  //   x = totals[i];
  //   x['value'] = x.value * 15;
  //   totals[i] = x;
  // }
  // console.log(totals)

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
    .style("text-anchor", "middle");
    // .text(function (t) { return t["Description of Goods"]  })

    node.append("circle")
    // .attr('cx', function(t){return x(t["value"])})
    // .attr('cy', function(t){return y(t["value"])})
    .attr("r", function(t) { return t.r;console.log(t.value);return r(t["value"]) ; })
    .style("fill", function(d) { return "black"; });

   //bubble.value(function (d) { return 100});

    d3.select(self.frameElement).style("height", diameter + "px");
});


function tick(e) {
  node
      .each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.5))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}
