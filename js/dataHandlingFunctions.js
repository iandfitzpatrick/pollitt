function getColumnVariableName(table, index)
{
  var str = table.getColumnLabel(index);
  var arr = str.split(" ");
  return_str= arr[0];
	
  return return_str;	
}

function getColumnCategoryName(table, index)
{
  var str = table.getColumnLabel(index);
  var arr = str.split(" ");
  return_str= arr[1];
	
  return return_str;
}

function getColumnInsideCount(table, v_index, p_index)
{
  var cols = table.getNumberOfRows();
  var count = 0;
	
  for(var i = 2; i < cols; i++)
  {
    var v1 = table.getValue(i, v_index);
    
    if(defaultMode)
    {
	    v2 = 1;
    }
    else
    {
	    v2 = table.getValue(i, p_index);
    }
    
		
    if( v1 == 1 && v2 == 1 )
    {
      count ++;
    }	
  }	
  return count;
}

function getColumnInsidePopulation(table, index)
{
  var cols = table.getNumberOfRows();
  var count = 0;
	
  for(var i = 2; i < cols; i++)
  {
    var v1 = table.getValue(i, index);
		
    if( v1 == 1 )
    {
      count ++;
    }
		
  }	
  return count;
}

function getColumnOverallCount(table, index)
{
  var cols = table.getNumberOfRows();
  var count = 0;
	
  for(var i = 2; i < cols; i++)
  {
    var v1 = table.getValue(i, index);
		
    if( v1 == 1 )
    {
      count ++;
    }	
  }	
  return count;
}

function calculatePercentage( numerator, denominator, decimals )
{
  var num = (numerator/denominator) * 100;
  var return_num = num.toFixed( decimals );
  return return_num;
}

function calculateIndexing(inside, outside)
{
  var return_num =  100 * (inside / outside);
  return return_num.toFixed(0);
}

function createVariableLinkName( str )
{
  var return_str = "<a href='index.html?userID=" + str + "'>" + convertTableNotation(str) + "</a>";
  return return_str;
}

function calculateInterestingValue(index, percent, str)
{
  var return_num = ((1.25 * Math.abs(100 - index )) * percent) / 100;
  return_num = return_num.toFixed(2);
	
  if( str == population_str )
  {
    return_num = 0;
  }
  return return_num;
}

function compareInterestingObject(a, b) {
  if (a.columnInteresting_num < b.columnInteresting_num) {
    return -1;
  }
  if (a.columnInteresting_num > b.columnInteresting_num) {
    return 1;
  }
  return 0;
}

function addInterestingVariableToArray( str, index, num)
{
  var obj = new Object();
  obj.columnLabel_str = str;
  obj.indexingValue_num = index;
  obj.columnInteresting_num = num;
	
  if(index > 100)
  {
    variableInterestingOver_arr.push(obj);
  }
  else
  {
    variableInterestingUnder_arr.push(obj);
  }
}


function sortVariableInterestingOver()
{
  variableInterestingOver_arr.sort(function (a, b) 
  {
    if (a.columnInteresting_num < b.columnInteresting_num)
      return 1;
    if (a.columnInteresting_num > b.columnInteresting_num)
      return -1;
    // a must be equal to b
      return 0;
  });
}

function sortVariableInterestingUnder()
{
  variableInterestingUnder_arr.sort(function (a, b) {
    if (a.variableInterestingUnder_arr > b.variableInterestingUnder_arr)
      return 1;
    if (a.variableInterestingUnder_arr < b.variableInterestingUnder_arr)
      return -1;
    // a must be equal to b
	  return 0;
  });
}

function sortRecordSimilar()
{
  recordsCorrelation_arr.sort(function (a, b) {
    if (a.corr_val < b.corr_val)
      return 1;
    if (a.corr_val > b.corr_val)
      return -1;
    // a must be equal to b
	  return 0;
  });
}

function sortRecordOutliers()
{
  recordsOutliers_arr.sort(function (a, b) {
    if (a.corr_val > b.corr_val)
      return 1;
    if (a.corr_val < b.corr_val)
      return -1;
    // a must be equal to b
	  return 0;
	});
}

function checkSampleSize(num)
{
  if( num > minimumSampleSize_num )
  {
    var boo = true;
  }
  else
  {
    boo = false;
  }
  return boo;
}



//----------------------------------------------------------->> FUNCTION: handleSpreadsheetMacroData
function handleSpreadsheetMacroData(response)
{
  masterTable = response.getDataTable();								// extract the datatable from the returned query
  totalPopulation_num = masterTable.getNumberOfRows() - 2;			// assign the total size of the data set, minus the header and category rows
  
  minimumSampleSize_num = (totalPopulation_num * sampleSizePercentageThreshold_num) / 100;
	
  //first, get the number of columns
  var cols_num = masterTable.getNumberOfColumns();					// extract the number of columns in the dataset
	
  for (var i=0; i < cols_num; i++ )
  {
    var rawLabel_str = masterTable.getColumnLabel(i);				// get the column label - this will be both the variable name and the category
    var raw_arr = rawLabel_str.split(" ");							// so split the label on the [space]
		
    if( raw_arr[0] == population_str )
    {
      myPopulationIndex = i;
      break;
    }	
  }
	
	
  for (i = 0; i < cols_num; i++) { 							// cycle through the columns

    conditionalCount = getColumnInsideCount(masterTable, i, myPopulationIndex);
		
    var rawLabel_str = masterTable.getColumnLabel(i);				// get the column label - this will be both the variable name and the category
    var raw_arr = rawLabel_str.split(" ");					// so split the label on the [space]

    var category_str = getColumnCategoryName(masterTable, i);
    
    var test_str = category_str + "_arr";					// define the name for the category array that this should be inserted into
		
	var myObj = new Object();								
	myObj.columnLetter_str = masterTable.getColumnId(i);			// assign the column letter to the object
	myObj.columnLabel_str = getColumnVariableName(masterTable, i);
	myObj.columnInsideCount_num = getColumnInsideCount(masterTable, i, myPopulationIndex);
	
	myObj.columnInsidePopulation_num = getColumnInsidePopulation(masterTable, myPopulationIndex);
	myObj.columnOverallCount_num = getColumnOverallCount(masterTable, i);
	
	myObj.columnInsidePercentage_num = calculatePercentage( myObj.columnInsideCount_num, myObj.columnInsidePopulation_num, 1);
	myObj.columnOverallPercentage_num = calculatePercentage( myObj.columnOverallCount_num, totalPopulation_num, 1 );
	myObj.indexingValue_num = calculateIndexing(myObj.columnInsidePercentage_num, myObj.columnOverallPercentage_num );
	myObj.isAcceptableSampleSize = checkSampleSize(myObj.columnInsideCount_num);
	
	myObj.URLLink_str = createVariableLinkName( myObj.columnLabel_str );
	  
	myObj.columnInteresting_num = calculateInterestingValue(myObj.indexingValue_num, myObj.columnInsidePercentage_num, myObj.columnLabel_str );
				
	if( myObj.columnInteresting_num > variableInterestingThreshold_num )
	{
	  addInterestingVariableToArray(myObj.columnLabel_str, myObj.indexingValue_num, myObj.columnInteresting_num);
	}
	else
	{
		
	}
	
	
		
	var correlation_obj = new Object();						// instantiate a new object for the correlation
	correlation_obj.label = raw_arr[0];						// assign that object a label value			
															// create a grouped table from which to grab a count	
	var tempresult = google.visualization.data.group(masterTable, [i], [{'column': i, 'aggregation': google.visualization.data.count, 'type': 'number'}]);
	
	var tcol = tempresult.getNumberOfColumns();				// find the # of columns in the grouped table
	var trow = tempresult.getNumberOfRows();				// find the # of rows in the grouped table				
	
	if( tcol > 1 && trow > 1)								// check to see if the grouped table has scale
	{
		
		
	  myObj.count_num = tempresult.getValue(1,1);			// grab the count from that table
	}
		
		
																// if the category array is not undefined
	if(categories_arr.indexOf(category_str) == -1 && category_str != "" && category_str != 'undefined' && category_str != undefined && category_str != "ID" )
	{
	  if( typeof window[test_str] == 'undefined' )		// and if it doesn't exist
	  {
	    window[test_str] = new Array();					// create a new array
	    categories_arr.push(category_str);				// tell the categories array about it
	  }	
	}
		
		
	if( category_str != "" && category_str != 'undefined' && category_str != undefined && category_str != "ID" )	// if the category has a value
	{
	  correlation_obj.entry_arr = createArrayFromColumn(masterTable, i);		// create an array for correlation testing
	  var myArr = window[test_str];									// create a new array
	  myArr.push(myObj);												// assign the object to it
		
	  if( myObj.isAcceptableSampleSize )
	  {
	    correlationData_arr.push(correlation_obj);						// add it to the array
	  }
	  
	  
	  if( defaultMode == false)
	  {
		if ( myObj.columnInsidePercentage_num >= 50)
	    {
	      perfectRecord_arr.push(1);
	    }
	    else
	    {
	      perfectRecord_arr.push(0);
	    }	  
	  }
	  else
	  {
	    if ( myObj.columnOverallPercentage_num >= 50)
	    {
	      perfectRecord_arr.push(1);
	    }
	    else
	    {
	      perfectRecord_arr.push(0);
	    }
	  }
	  
	}	
	
	if( raw_arr[0] == population_str)
	{
		updatePageHeader(myObj.count_num);
	}
	
  }
  
  if( defaultMode )
  {
    updatePageHeader();
  }
	
		
  renderVariableInterestingOver();
  renderVariableInterestingUnder();
  parseRowsForCorrelation();
  handleArraysData();
	
}


function parseRowsForCorrelation()
{
  var cols_num = masterTable.getNumberOfColumns();					// extract the number of columns in the dataset
  var rows_num = masterTable.getNumberOfRows();
	
  for(var r=0; r < rows_num; r++)
  {
    var arr = new Array();
    var str = "";
	
    for(var c = 0; c < cols_num; c++)
    {
      var category_str = getColumnCategoryName(masterTable, c);
			
      if( category_str == "ID" )
	  {
	    str = masterTable.getValue(r,c);
	  }
	  else if (category_str != "" && category_str != 'undefined' && category_str != undefined )
	  {
		var val = masterTable.getValue(r,c);
		arr.push(val);
	  }
	  else
	  {
		
	  }		
	}
		
    var corr = mathUtils.getPearsonsCorrelation(arr, perfectRecord_arr);
    
		
	if( isNaN(corr) )
	{
		
	}
	else
	{
	  var test_num = masterTable.getValue(r,myPopulationIndex);
	  var obj = new Object();
	  obj.ID_str = str;
	  obj.corr_val = corr;
			
	  if( test_num == 1 )
	  {
	    recordsCorrelation_arr.push(obj);
	  }
	  else
	  {
	    recordsOutliers_arr.push(obj);
	  }	
    }	
  }
	
  renderRecordMostSimilar();
  renderRecordLeastSimilar();
  renderRecordOutliers();
	
}



//----------------------------------------------------------->> FUNCTION: handleArraysData
function handleArraysData()
{
  categories_arr.sort();
	
  for (i=0; i < categories_arr.length; i++ )
  {
    var the_arr = window[categories_arr[i] + "_arr"];
		
	the_arr.sort(function (a, b) {
      if (a.columnInsideCount_num < b.columnInsideCount_num)
	    return 1;
	  if (a.columnInsideCount_num > b.columnInsideCount_num)
		return -1;
	  // a must be equal to b
		return 0;
	});	
		
	if(i%2 == 0)
	{
	  $("#maincontainer").append("<div class='row data-view-row' id='mainrow'>");	
	}
	buildCategoryDisplayElement(categories_arr[i], the_arr);
	renderSnapshotCategory(categories_arr[i], the_arr);
		
	if(i%2 == 0)
	{
      $("#maincontainer").append("</div>");
	}	
  }
	
  calculateCorrelation();
	
}

//-------------------------------------------------------------->> FUNCTION: createArrayFromColumn
																// USED: for calculating correlation between columns
																// RETURNS: an array of 0s and 1s from the column
																// PARAMS: 	table_datatable: the whole table we're working with
																//			col_num: the column we want to grab values from
function createArrayFromColumn(table_datatable, col_num)
{
  var return_arr = new Array();								// define a return array
  var rowCount = table_datatable.getNumberOfRows();			// get the number of rows through which to cycle

  for(var i=2; i < rowCount; i++)								// cycle through each row
  {
    var val_str = table_datatable.getValue(i, col_num);	// get the value from the cell
    
    if( defaultMode == false )
    {
	  var testval_str = table_datatable.getValue(i, myPopulationIndex);
		
	  if( testval_str == '1')
	  {
	    return_arr.push(val_str);								// insert it into the return array
	  }
    }
    else
    {
	  return_arr.push(val_str);   
    }
		
  }			
  return return_arr;											// return the array
}


//-------------------------------------------------------------->> FUNCTION: calculateCorrelation
function calculateCorrelation()
{
	
	
  for(var a=0; a < correlationData_arr.length; a++)
  {
    var label1_str = correlationData_arr[a].label;
	var label1_arr = correlationData_arr[a].entry_arr;
		
	for( var b = a + 1; b < correlationData_arr.length; b++ )
	{
	  var label2_str = correlationData_arr[b].label;
	  var label2_arr = correlationData_arr[b].entry_arr;
			
	  var corr_num = mathUtils.getPearsonsCorrelation(label1_arr, label2_arr);
	  
			
	  var output_str = label1_str + " to " + label2_str + " : " + corr_num;
			
	  var obj = new Object();
	  obj.label1_str = label1_str;
			
	  obj.label2_str = label2_str;
	  obj.corr_num = corr_num;
			
	  if(corr_num > moderateCorrelationThreshold_num && corr_num < strongCorrelationThreshold_num)
	  {
	    moderatePositiveCorr_arr.push(obj);
	  }
	  else if(corr_num > strongCorrelationThreshold_num)
	  {
	    strongPositiveCorr_arr.push(obj);
	  }
	  else if(corr_num < (moderateCorrelationThreshold_num * -1) && corr_num > (strongCorrelationThreshold_num * -1))
	  {
	    moderateNegativeCorr_arr.push(obj);
	  }
	  else if(corr_num < (strongCorrelationThreshold_num * -1))
	  {
	    strongNegativeCorr_arr.push(obj);
	  }		
	}		
  }
	
  $("#maincontainer").append("<div class='row' id='mainrow'>");
  renderCorrelationTable(strongPositiveCorr_arr, 'Strongly Correlated');
  renderCorrelationTable(moderatePositiveCorr_arr, 'Moderately Correlated');
  $("#maincontainer").append("</div>");
  $("#maincontainer").append("<div class='row' id='mainrow'>");
  renderCorrelationTable(moderateNegativeCorr_arr, 'Weak Negative Correlation');
  renderCorrelationTable(strongNegativeCorr_arr, 'Strong Negative Correlation');
  $("#maincontainer").append("</div>");

  renderCorrelationInterestingStrong(strongPositiveCorr_arr);
  renderCorrelationInterestingInverse(strongNegativeCorr_arr);	
  
  $("#mainvisiblebody").show();
  $("#loadanimation").hide();
}

