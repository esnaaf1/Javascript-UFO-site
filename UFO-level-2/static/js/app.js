// assign a descriptor variable to the data
var UFOsightings = data;

// Get reference to the tablet body
var tbody = d3.select("tbody");

// create a function that constucts the table inside the tbody
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

// create an empty dictionary for all filters 
// we want to keep track of any changes to table values
filterList = {};


// create a function to update the filter information based on the search field changes 

function updateFilters()
{
    var fieldValue = d3.select(this).select('input').property('value');
    var fieldID = d3.select(this).select('input').attr('id');
    console.log(`filter value  ${fieldValue}`);
    console.log(`filter id ${fieldID}`);

    // check to see if the value was changed
    if (fieldValue)
    {
        filterList[fieldID] = fieldValue;
    }
    else 
    {
        delete filterList[fieldID];
    }

    //filter the table
    filterSightings();
};

function filterSightings()
{
    var filteredSightings = UFOsightings;

    //loop through the filters and filter based marched values
    Object.entries(filterList).forEach(([key, value]) =>
    {
        filteredSightings = filteredSightings.filter(row => row[key] === value);

    });

    // reconstruct the table
    constructTable(filteredSightings);
}

// create an event handler for filter changes
d3.selectAll(".filter").on('change', updateFilters);

// construct the table on the initial load
constructTable(UFOsightings);
