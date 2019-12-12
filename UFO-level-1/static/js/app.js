// assign a descriptor variable to the UFO sighting data in data.js
var UFOsightings = data;

// Get reference handle to the tablet body
var tbody = d3.select("tbody");

// create a function that constucts the table inside the tbody tag
function constructTable(data)
{
  //clear any existing data
  tbody.html('');

  // loop through the data and construct the table
  
  console.log(data);

  data.forEach((sightingrow) =>
  {
    //append a row to the tbody
    var row = tbody.append("tr");
    // assign values to the table data from the each row of sightings
    Object.values(sightingrow).forEach(function addRows(value) 
    {
      var cell = row.append("td");
      cell.text(value);
    });
  }); 
}

// get a handle to the button item

var button = d3.select('#filter-btn');

// add a click event handler to the button 

button.on('click', function()
{
  // get the value of the date field
  var dateValue = d3.select("#datetime").property("value");
  let filteredSightings = UFOsightings;

  console.log(dateValue);
  // filter the data if the dateValue was entered
  if (dateValue !="")
  {  
    filteredSightings = filteredSightings.filter(sighting => sighting.datetime === dateValue);  
  }
  // rebuild the table using a construct function and passing the filterd data it
  constructTable(filteredSightings);
});

// construct the table on the initial page load
constructTable(UFOsightings);