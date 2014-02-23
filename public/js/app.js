d3.csv("nz_seizure_incidents_data.csv", function(totals) {
  // makeBubbleChart(totals, function(d) {return colorsToCategories[descriptionsToCategories[d["Description of Goods"]]]});
  // console.log(totals);
  makeBubbleChart(collapseAllDevices(combinePortInfo(totals)),function(d) {return colorsToCategories[d["Description of Goods"]]});
  // makeBubbleChart(collapseAllDevices(combinePortInfo(totals)));
  collapseAllDevices(combinePortInfo(totals));
});

function makeBubbleChart(totals, colorFunction){
  // var uniqueGoods = extractUniqueGoods(totals)
  var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

  var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter]).padding(0)

  var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  var node = svg.selectAll(".node")
    .data(
      bubble.nodes({children: totals}).filter(function (t) { return !t.children; })
    )
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
    .attr("r", function(t) { return t.r })
    .style("fill", colorFunction);

  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function (t) { return t["Description of Goods"]  });

    d3.select(self.frameElement).style("height", diameter + "px");
    combinePortInfo(totals)
}



function extractUniqueGoods(totals){
  var set = {}
  _.each(totals, function(item){
    set[item["Description of Goods"]] = true;
  });
  return  _.keys(set)
}

function combinePortInfo(portIncidents) {
 return  _.groupBy(portIncidents, function(item){
    return deviceToCategory(item["Description of Goods"])
  })
}

function categoryToColor(device){
  return colorsToCategories[deviceToCategory(device)]
}

function deviceToCategory(device){
 return descriptionsToCategories[device]
}

function collapseAllDevices(grouping) {
  var group = _.map(grouping, function(category, key) {
    var total = 0

    _.each(category, function(event) {
      total += parseInt(event["value"])
    });
    var object = {}
    object["Description of Goods"] = key;
    object["value"] = total;
    return object
  });
  return group
}


var colorsToCategories = {"computer": "11A7FC",
"cellphone": "95D127",
"camera": "F2E415",
"storage device": "FF8638",
"media": "EE3551",
"misc": "999999",
"other": "CCCCCC"}

var descriptionsToCategories = {
  "Antenna - LAN cards": "other",
  "Antenna - USB WiFi":"other",
  "Antenna - WiFi": "other",
  "ATM card slots": "other",
  "ATM keypads": "other",
  "Audio cassettes": "media",
  "Bitcoin mining machine": "other",
  "Blackberry": "cellphone",
  "Cameras - video": "camera",
  "Cameras - web": "camera",
  "Cameras": "camera",
  "Card readers": "other",
  "CD/DVD reader - external": "other",
  "Cellphone circuitboards": "other",
  "Cellphone circuitry": "other",
  "Cellphone parts": "other",
  "Cellphones (iPhone)": "cellphone",
  "Cellphones": "cellphone",
  "Circuit board/chip": "other",
  "Circuit boards": "other",
  "Computer parts": "other",
  "Computer": "computer",
  "Computers - mini towers":  "computer",
  "Computers - tablets": "computer",
  "Computers": "computer",
  "Discs - blu-ray": "media",
  "Discs - CDs": "media",
  "Discs - DVDs": "media",
  "Discs - optical": "storage device",
  "Discs": "storage device",
  "DVD burners": "other",
  "DVD players": "other",
  "DVD recorders": "other",
  "DVD writers": "other",
  "E-book readers": "misc",
  "E-reader": "misc",
  "eReaders": "misc",
  "Film": "media",
  "Frequency/signal jammers": "other",
  "GPS": "misc",
  "Hard drives - external": "storage device",
  "Hard drives - internal": "storage device",
  "Hard drives": "storage device",
  "Infrared detectors": "other",
  "iPods": "computer",
  "Laboratory equipment parts": "other",
  "Laboratory evaporator unit": "other",
  "Laptops": "computer",
  "Laser pointer": "other",
  "Laser pointers": "other",
  "LCD modules": "other",
  "Listening devices": "other",
  "Media players": "misc",
  "Modem stick": "other",
  "Modem": "other",
  "Modems": "other",
  "Mouse USB drive": "other",
  "MP3 players": "misc",
  "Multi-media players": "misc",
  "Net com device": "other",
  "Parts": "other",
  "Police scanners": "other",
  "Portable storage devices": "storage device",
  "Projectors": "other",
  "Radiometer": "other",
  "Receivers": "other",
  "Remote access devices": "other",
  "Remote controls": "other",
  "RF signal detectors": "other",
  "Routers": "other",
  "Scales": "other",
  "Scanners": "other",
  "SIM card packs": "misc",
  "SIM cards": "misc",
  "SIM packs": "misc",
  "Skimmer device": "other",
  "Skimming devices": "other",
  "Skimming equipment": "other",
  "Software": "media",
  "Speakerphone": "other",
  "Swipe cards": "other",
  "Tablet accessories": "other",
  "Time and attendance machines": "other",
  "USB connectors": "other",
  "USB converter": "other",
  "USB receiver/charger": "other",
  "Video recorders": "other",
  "Video tapes": "media",
  "Voice recorders": "other",
  "Walkmans": "misc",
  "Wireless AU senders": "other"
}
