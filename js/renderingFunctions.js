//----------------------------------------------------------->> FUNCTION: buildCategoryDisplayElement
function buildCategoryDisplayElement(the_label, the_arr)
{
  var small_arr = new Array();

  var str = "<div class='col-md-6 bottom-twenty'><span class='page-subheader-text'>";
  str += convertTableNotation(the_label);
  str += "</span><div class='table-responsive'><table class='tablesorter' id='myTable'><thead><tr><th></th><th>Value</th><th>This Group</th>";
  
  if( defaultMode == false )
  {
	  str += "<th>All Records</th><th>Index</th></tr></thead><tbody>";
  }
  else
  {
	  str += "</tr></thead><tbody>";
  }
  
  	
		 
  for( i=0; i < the_arr.length; i++ )
  {
    the_obj = the_arr[i];
				
	if( ! the_obj.isAcceptableSampleSize )
	{
	  small_arr.push(the_obj.URLLink_str);
	}
	else
	{
	  str += "<tr></td><td>";
	
	  if( defaultMode == false )
	  {	
	    if(the_obj.indexingValue_num > overIndexThreshold_num)
	    {
	      if( population_str == the_obj.columnLabel_str )
		  {
		    str += "<span class='glyphicon glyphicon-star glyph-overindex'></span>";
		  }
		  else
		  {
		    str += "<span class='glyphicon glyphicon-arrow-up glyph-overindex'></span>";
		  }	
	    }
	    else if(the_obj.indexingValue_num < underIndexThreshold_num)
	    {
	      str += "<span class='glyphicon glyphicon-arrow-down glyph-underindex'></span>";
	    }
	  }
			
	  str += "</td><td>" + the_obj.URLLink_str + "</td>"
	  
	  if( defaultMode == false )
	  {
	    str += "<td>" + the_obj.columnInsidePercentage_num + "%";
	  }
	  
	  str += "</td><td>" + the_obj.columnOverallPercentage_num + "%";
	  
	  if( defaultMode == false )
	  {
	   str +=  "</td><td>" + the_obj.indexingValue_num;
	  }
	  
	  str += "</td></tr>";
	}

  }	     		 
			
  str += "</tbody></table></div>";	
	
  if( small_arr.length > 0 )
  {
    str += "<small>Sample size too small: ";
		
	for(var i=0; i< small_arr.length; i++)
	{
	  if(i > 0)
	  {
	    str += ", ";
	  }
	  str += small_arr[i];
	}
	str += "</small>";
  }
  $("#maincontainer").append(str);	
}

//----------------------------------------------------------->> FUNCTION: renderCorrelationTable
function renderCorrelationTable(corr_arr, label_str)
{
  corr_arr.sort(function (a, b) {
  if (a.corr_num < b.corr_num)
    return 1;
  if (a.corr_num > b.corr_num)
	return -1;
  // a must be equal to b
	return 0;
  });
	
  var str = "<div class='col-md-12'><span class='page-subheader-text'>";
  str += label_str;
  str += "</span><div class='table-responsive'><table class='tablesortercorrelation'><thead><tr><th>Behavior #1</th><th>Behavior #2</th><th>Correlation</th></tr></thead><tbody>";

  for( i=0; i < corr_arr.length; i++ )
  {
    the_obj = corr_arr[i];
	str += "<tr></td><td>";
	str += convertTableNotation(the_obj.label1_str);
	str += "</td><td>";
	str += convertTableNotation(the_obj.label2_str);
	str += "</td><td>";
	var the_num = the_obj.corr_num;
	str += the_num.toFixed(3);
	str += "</td></tr>"
  }
	
  str += "</tbody></table></div>";
  $("#correlationcontainer").append(str);
	
  $(".tablesorter").tablesorter(
  	{
	  	// *** APPEARANCE ***
    // Add a theme - try 'blackice', 'blue', 'dark', 'default'
    //  'dropbox', 'green', 'grey' or 'ice'
    // to use 'bootstrap' or 'jui', you'll need to add the "uitheme"
    // widget and also set it to the same name
    // this option only adds a table class name "tablesorter-{theme}"
    theme: 'default',

    // *** FUNCTIONALITY ***
    // prevent text selection in header
    cancelSelection: true,

    // false for German "1.234.567,89" or French "1 234 567,89"
    usNumberFormat: true,

    // *** SORT OPTIONS ***
    // These are detected by default,
    // but you can change or disable them
    // these can also be set using data-attributes or class names
    headers: {
        // set "sorter : false" (no quotes) to disable the column
        0: {
            sorter: "false"
        },
        1: {
            sorter: "false"
        },
        2: {
            sorter: "digit"
        },
        3: {
            sorter: "digit"
        },
        4: {
	        sorter: "digit"
        }
        
    },

    // ignore case while sorting
    ignoreCase: true,

    // initial sort order of the columns, example sortList: [[0,0],[1,0]],
    // [[columnIndex, sortDirection], ... ]
    sortList: [
        [2, 1]
    ],

    // starting sort direction "asc" or "desc"
    sortInitialOrder: "asc",


    // sort empty cell to bottom, top, none, zero
    emptyTo: "bottom",

    // sort strings in numerical column as max, min, top, bottom, zero
    stringTo: "max",

    // use custom text sorter
    // function(a,b){ return a.sort(b); } // basic sort
    textSorter: null,

    // *** WIDGETS ***

    // apply widgets on tablesorter initialization
    initWidgets: true,

    // include zebra and any other widgets, options:
    // 'columns', 'filter', 'stickyHeaders' & 'resizable'
    // 'uitheme' is another widget, but requires loading
    // a different skin and a jQuery UI theme.
    widgets: ['zebra', 'columns'],

    widgetOptions: {

        // zebra widget: adding zebra striping, using content and
        // default styles - the ui css removes the background
        // from default even and odd class names included for this
        // demo to allow switching themes
        // [ "even", "odd" ]
        zebra: [
            "ui-widget-content even",
            "ui-state-default odd"],

        // uitheme widget: * Updated! in tablesorter v2.4 **
        // Instead of the array of icon class names, this option now
        // contains the name of the theme. Currently jQuery UI ("jui")
        // and Bootstrap ("bootstrap") themes are supported. To modify
        // the class names used, extend from the themes variable
        // look for the "$.extend($.tablesorter.themes.jui" code below
        uitheme: 'jui',

        // columns widget: change the default column class names
        // primary is the 1st column sorted, secondary is the 2nd, etc
        columns: [
            "primary",
            "secondary",
            "tertiary"],

        // columns widget: If true, the class names from the columns
        // option will also be added to the table tfoot.
        columns_tfoot: true,

        // columns widget: If true, the class names from the columns
        // option will also be added to the table thead.
        columns_thead: true,

        // filter widget: If there are child rows in the table (rows with
        // class name from "cssChildRow" option) and this option is true
        // and a match is found anywhere in the child row, then it will make
        // that row visible; default is false
        filter_childRows: false,

        // filter widget: If true, a filter will be added to the top of
        // each table column.
        filter_columnFilters: true,

        // filter widget: css class applied to the table row containing the
        // filters & the inputs within that row
        filter_cssFilter: "tablesorter-filter",

        // filter widget: Customize the filter widget by adding a select
        // dropdown with content, custom options or custom filter functions
        // see http://goo.gl/HQQLW for more details
        filter_functions: null,

        // filter widget: Set this option to true to hide the filter row
        // initially. The rows is revealed by hovering over the filter
        // row or giving any filter input/select focus.
        filter_hideFilters: false,

        // filter widget: Set this option to false to keep the searches
        // case sensitive
        filter_ignoreCase: true,

        // filter widget: jQuery selector string of an element used to
        // reset the filters.
        filter_reset: null,

        // Resizable widget: If this option is set to false, resized column
        // widths will not be saved. Previous saved values will be restored
        // on page reload
        resizable: true,

        // saveSort widget: If this option is set to false, new sorts will
        // not be saved. Any previous saved sort will be restored on page
        // reload.
        saveSort: true,

        // stickyHeaders widget: css class name applied to the sticky header
        stickyHeaders: "tablesorter-stickyHeader"

    },

    // *** CALLBACKS ***
    // function called after tablesorter has completed initialization
    initialized: function (table) {},

    // *** CSS CLASS NAMES ***
    tableClass: 'tablesorter',
    cssAsc: "tablesorter-headerSortUp",
    cssDesc: "tablesorter-headerSortDown",
    cssHeader: "tablesorter-header",
    cssHeaderRow: "tablesorter-headerRow",
    cssIcon: "tablesorter-icon",
    cssChildRow: "tablesorter-childRow",
    cssInfoBlock: "tablesorter-infoOnly",
    cssProcessing: "tablesorter-processing",

    // *** SELECTORS ***
    // jQuery selectors used to find the header cells.
    selectorHeaders: '> thead th, > thead td',

    // jQuery selector of content within selectorHeaders
    // that is clickable to trigger a sort.
    selectorSort: "th, td",

    // rows with this class name will be removed automatically
    // before updating the table cache - used by "update",
    // "addRows" and "appendCache"
    selectorRemove: "tr.remove-me",

    // *** DEBUGING ***
    // send messages to console
    debug: false

});
	
$(".tablesortercorrelation").tablesorter(
  	{
	  	// *** APPEARANCE ***
    // Add a theme - try 'blackice', 'blue', 'dark', 'default'
    //  'dropbox', 'green', 'grey' or 'ice'
    // to use 'bootstrap' or 'jui', you'll need to add the "uitheme"
    // widget and also set it to the same name
    // this option only adds a table class name "tablesorter-{theme}"
    theme: 'default',

    // *** FUNCTIONALITY ***
    // prevent text selection in header
    cancelSelection: true,

    // false for German "1.234.567,89" or French "1 234 567,89"
    usNumberFormat: true,

    // *** SORT OPTIONS ***
    // These are detected by default,
    // but you can change or disable them
    // these can also be set using data-attributes or class names
    headers: {
        // set "sorter : false" (no quotes) to disable the column
        0: {
            sorter: "false"
        },
        1: {
            sorter: "false"
        },
        2: {
            sorter: "digit"
        }
        
    },

    // ignore case while sorting
    ignoreCase: true,

    // initial sort order of the columns, example sortList: [[0,0],[1,0]],
    // [[columnIndex, sortDirection], ... ]
    sortList: [
        [2, 1]
    ],

    // starting sort direction "asc" or "desc"
    sortInitialOrder: "asc",


    // sort empty cell to bottom, top, none, zero
    emptyTo: "bottom",

    // sort strings in numerical column as max, min, top, bottom, zero
    stringTo: "max",

    // use custom text sorter
    // function(a,b){ return a.sort(b); } // basic sort
    textSorter: null,

    // *** WIDGETS ***

    // apply widgets on tablesorter initialization
    initWidgets: true,

    // include zebra and any other widgets, options:
    // 'columns', 'filter', 'stickyHeaders' & 'resizable'
    // 'uitheme' is another widget, but requires loading
    // a different skin and a jQuery UI theme.
    widgets: ['zebra', 'columns'],

    widgetOptions: {

        // zebra widget: adding zebra striping, using content and
        // default styles - the ui css removes the background
        // from default even and odd class names included for this
        // demo to allow switching themes
        // [ "even", "odd" ]
        zebra: [
            "ui-widget-content even",
            "ui-state-default odd"],

        // uitheme widget: * Updated! in tablesorter v2.4 **
        // Instead of the array of icon class names, this option now
        // contains the name of the theme. Currently jQuery UI ("jui")
        // and Bootstrap ("bootstrap") themes are supported. To modify
        // the class names used, extend from the themes variable
        // look for the "$.extend($.tablesorter.themes.jui" code below
        uitheme: 'jui',

        // columns widget: change the default column class names
        // primary is the 1st column sorted, secondary is the 2nd, etc
        columns: [
            "primary",
            "secondary",
            "tertiary"],

        // columns widget: If true, the class names from the columns
        // option will also be added to the table tfoot.
        columns_tfoot: true,

        // columns widget: If true, the class names from the columns
        // option will also be added to the table thead.
        columns_thead: true,

        // filter widget: If there are child rows in the table (rows with
        // class name from "cssChildRow" option) and this option is true
        // and a match is found anywhere in the child row, then it will make
        // that row visible; default is false
        filter_childRows: false,

        // filter widget: If true, a filter will be added to the top of
        // each table column.
        filter_columnFilters: true,

        // filter widget: css class applied to the table row containing the
        // filters & the inputs within that row
        filter_cssFilter: "tablesorter-filter",

        // filter widget: Customize the filter widget by adding a select
        // dropdown with content, custom options or custom filter functions
        // see http://goo.gl/HQQLW for more details
        filter_functions: null,

        // filter widget: Set this option to true to hide the filter row
        // initially. The rows is revealed by hovering over the filter
        // row or giving any filter input/select focus.
        filter_hideFilters: false,

        // filter widget: Set this option to false to keep the searches
        // case sensitive
        filter_ignoreCase: true,

        // filter widget: jQuery selector string of an element used to
        // reset the filters.
        filter_reset: null,

        // Resizable widget: If this option is set to false, resized column
        // widths will not be saved. Previous saved values will be restored
        // on page reload
        resizable: true,

        // saveSort widget: If this option is set to false, new sorts will
        // not be saved. Any previous saved sort will be restored on page
        // reload.
        saveSort: true,

        // stickyHeaders widget: css class name applied to the sticky header
        stickyHeaders: "tablesorter-stickyHeader"

    },

    // *** CALLBACKS ***
    // function called after tablesorter has completed initialization
    initialized: function (table) {},

    // *** CSS CLASS NAMES ***
    tableClass: 'tablesorter',
    cssAsc: "tablesorter-headerSortUp",
    cssDesc: "tablesorter-headerSortDown",
    cssHeader: "tablesorter-header",
    cssHeaderRow: "tablesorter-headerRow",
    cssIcon: "tablesorter-icon",
    cssChildRow: "tablesorter-childRow",
    cssInfoBlock: "tablesorter-infoOnly",
    cssProcessing: "tablesorter-processing",

    // *** SELECTORS ***
    // jQuery selectors used to find the header cells.
    selectorHeaders: '> thead th, > thead td',

    // jQuery selector of content within selectorHeaders
    // that is clickable to trigger a sort.
    selectorSort: "th, td",

    // rows with this class name will be removed automatically
    // before updating the table cache - used by "update",
    // "addRows" and "appendCache"
    selectorRemove: "tr.remove-me",

    // *** DEBUGING ***
    // send messages to console
    debug: false

});
	
// Extend the themes to change any of the default class names ** NEW **
$.extend($.tablesorter.themes.jui, {
    // change default jQuery uitheme icons - find the full list of icons
    // here: http://jqueryui.com/themeroller/ (hover over them for their name)
    table: 'ui-widget ui-widget-content ui-corner-all', // table classes
    header: 'ui-widget-header ui-corner-all ui-state-default', // header classes
    icons: 'ui-icon', // icon class added to the <i> in the header
    sortNone: 'ui-icon-carat-2-n-s',
    sortAsc: 'ui-icon-carat-1-n',
    sortDesc: 'ui-icon-carat-1-s',
    active: 'ui-state-active', // applied when column is sorted
    hover: 'ui-state-hover', // hover class
    filterRow: '',
    even: 'ui-widget-content', // even row zebra striping
    odd: 'ui-state-default' // odd row zebra striping
	  	}
  );
}


function renderVariableInterestingOver()
{
  sortVariableInterestingOver();
  variableInterestingOver_arr = variableInterestingOver_arr.slice(0,variableInterestingMaxCount_num);

  for(var i = 0; i < variableInterestingOver_arr.length; i++)
  {
    var obj = variableInterestingOver_arr[i];
	$( "#variableIndexOverColumn" ).append("<br>" + obj.columnLabel_str + "(" + obj.indexingValue_num + ")");
  }
  
}


function renderVariableInterestingUnder()
{
  sortVariableInterestingUnder();
  variableInterestingUnder_arr = variableInterestingUnder_arr.slice(0,variableInterestingMaxCount_num);
	
  for(var i = 0; i < variableInterestingUnder_arr.length; i++)
  {
    var obj = variableInterestingUnder_arr[i];
	$( "#variableIndexUnderColumn" ).append("<br>" + obj.columnLabel_str + "(" + obj.indexingValue_num + ")");
  }
}


function renderCorrelationInterestingStrong(arr)
{
  the_arr = arr.slice(0,variableInterestingMaxCount_num);
  for(var i = 0; i < the_arr.length; i++)
  {
    var obj = the_arr[i];
	$( "#correlationIndexOverColumn" ).append("<br>" + obj.label1_str + " / " + obj.label2_str + "(" + obj.corr_num.toFixed(3) + ")");
  }
}


function renderCorrelationInterestingInverse(arr)
{
  the_arr = arr.slice(0,variableInterestingMaxCount_num);
  for(var i = 0; i < the_arr.length; i++)
  {
    var obj = the_arr[i];
	$( "#correlationIndexUnderColumn" ).append("<br>" + obj.label1_str + " / " + obj.label2_str + "(" + obj.corr_num.toFixed(3) + ")");
  }
}


function renderRecordMostSimilar()
{
  sortRecordSimilar();
  var arr = recordsCorrelation_arr.slice(0,variableInterestingMaxCount_num);
	
  for(var i = 0; i < arr.length; i++)
  {
    var obj = arr[i];
	$( "#recordMostTypical" ).append("<br> ID #" + obj.ID_str + " (" + obj.corr_val.toFixed(3) + ")");
  }
}


function renderRecordLeastSimilar()
{
  sortRecordSimilar();
  var arr = recordsCorrelation_arr.splice((variableInterestingMaxCount_num * -1),variableInterestingMaxCount_num);
  arr.reverse();
	
  for(var i = 0; i < arr.length; i++)
  {
    var obj = arr[i];
	$( "#recordLeastTypical" ).append("<br> ID #" + obj.ID_str + " (" + obj.corr_val.toFixed(3) + ")");
  }
}


function renderRecordOutliers()
{
  sortRecordOutliers();
  recordsOutliers_arr.reverse();
  var arr = recordsOutliers_arr.slice(0 ,variableInterestingMaxCount_num);
	
  for(var i = 0; i < arr.length; i++)
  {
    var obj = arr[i];
	$( "#recordOutliers" ).append("<br> ID #" + obj.ID_str + " (" + obj.corr_val.toFixed(3) + ")");
  }
}


function renderSnapshotCategory( str, arr )
{
  temp_arr = new Array();	
  
  for(var i=0; i<arr.length; i++)
  {
  
  	if(defaultMode)
  	{
	  var val = arr[i].columnOverallPercentage_num;
  	}
  	else
  	{
	  val = arr[i].columnInsidePercentage_num;
  	}
    
	if(val >= snapshotThreshold_num)
	{
	  temp_arr.push( arr[i].columnLabel_str );
	}
  }
	
  if(temp_arr.length > 0)
  {		
    var temp_str = "<span class='list-header-text'>" + str + ": </span><br>";
	
    for(var i=0; i<temp_arr.length; i++)
	{
	  if( i == 0 )
	  {
				
	  }
	  else
	  {
	    temp_str += ", ";	
	  }
	  temp_str += createVariableLinkName(temp_arr[i]);
	}
		
    temp_str += "<br><br>";
		
	if( snapshotColumnIndex == 1 )
	{
	  $( "#snapshotColumn1" ).append(temp_str);
	  snapshotColumnIndex = 2;
	}
	else if( snapshotColumnIndex == 2 )
	{
	  $( "#snapshotColumn2" ).append(temp_str);
      snapshotColumnIndex = 3;
	}
	else if( snapshotColumnIndex == 3 )
	{
	  $( "#snapshotColumn3" ).append(temp_str);
	  snapshotColumnIndex = 1;
	}
  }
}



function updatePageHeader(val)
{
  var per = (val / totalPopulation_num) * 100;
  insidePopulation_num = val;
  
  if(defaultMode)
  {
    $('#popnum').text(totalPopulation_num);
    $('#popname').text('total records');
  }
  else
  {
	$('#popname').text(population_str);
    $('#popnum').text(per.toFixed(1) + "%");	
    $('#insidenum').text(val + " of " + totalPopulation_num);
  }
  
}

function convertTableNotation(str)
{
  var return_str = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  return return_str;
}