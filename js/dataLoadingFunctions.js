//---------------------------------------------------------------------->> FUNCTION: getSpreadsheetMacroData
function getSpreadsheetMacroData() {
  var query = new google.visualization.Query(googleSpreadsheetURL);  // Loads the Spreadsheet specified in user_variables.js
  var str = 'select *';                                              // For this function, load the entire table
  query.setQuery(str);                                               // Assign str to the query
  query.send(handleSpreadsheetMacroData);                            // Assign a handler, handleSpreadsheetMacroData() - found in dataHandlingFunctions.js
}




function GetQueryStringParams(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  
  return_str = 'default';
  
  for (var i=0; i < sURLVariables.length; i++ )
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
      return_str = sParameterName[1];
    }
  }
  return return_str;
}