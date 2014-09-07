pollitt
=======

An open-source library for identifying and rendering outliers and anomalies in data sets — designed for use with Google documents and libraries.

<h4>Overview</h4>
Pollitt was created as a tool for parsing small to medium (1-2000 row) data sets with an eye toward parsing and rendering:
<ul>
<li>The scale and frequency of values within columns/variables</li>
<li>Correlation between columns/variables</li>
<li>Variables/columns that significantly overindex or underindex within a population</li>
<li>Most-typical, least typical, and key outlier records in a data set</li>
</ul>

It was designed to be used by non-technical administrators, primarily for the mining of survey data, sales data and customer information by strategists, researchers and internal teams &mdash; although it could certainly be adapted for other applications.

To that end, Pollitt was built to work with Google Spreadsheets rather than SQL databases, enabling end-to-end deployment with no-cost tools at no (or minimal) cost to the end user.

<h4>Configuration</h4>
There are two parts to the configuration of Pollitt:
<ol>
<h5>Source spreadsheet configuration</h5>

1. Turn on sharing for your Google spreadsheet. You will want to ensure that 'anyone with the link can view' has been selected in the sharing options. There is no need to 'publish to the web'.
2. Your top row should contain column names, without spaces. If you use leading caps, Pollitt will display them with spaces inserted correctly (i.e. 'MidAtlantic' becomes 'Mid Atlantic'). At this time, failure to remove spaces in column names will result in an error.
3. The second row should specify any categorization you would like to apply to the reporting. Leaving this row blank will result in this column being excluded from the report. In our sample data set, columns 'NewEngland' and 'MidAtlantic' are both labled 'Location'.
4. While your data set may include several uniqueIDs, it is important to designate one of them the primary key by categorizing that column 'ID'.

To see these examples in action, reference the sample <a href="http://bit.ly/pollittdata">Running Data 2012 spreadsheet</a>.

<h5>Page configuration</h5>

All of the following settings reference the configuration.js file located in Pollit's root directory:

1. Point your instance of Pollitt to the Google Spreadsheet you've created by updating the value of <strong>googleSpreadsheetURL</strong><code><pre>&lt;var googleSpreadsheetURL = "YOUR URL HERE";&lt;</pre></code>

2. Update the page title and header by updating <strong>pageTitle_str</strong>
3. You can adjust thresholds for identifying a variable as underindexed or overindexed by changing the values of <strong>overIndexThreshold_num</strong> and <strong>underIndexThreshold_num</strong>.
4. As of the current build, sample size is not calculated automatically. To adjust the minimum required sample size, adjust the value of <strong>sampleSizePercentageThreshold_num</strong>. Assigning it a value of 3, for example, is equivalent to declaring any value that represents less than 3% of the overall records in the set too small to work with.

<h4>Deployment</h4>
Pollitt can be deployed either to a web server or run locally through the browser by opening the index.html file. Running the file off a server will likely deliver a better, more predictable experience, as local instances will be subject to restrictions in place from, for example, company firewall policies.

Pollitt requires a web connection, both for access to the data in a Google spreadsheet and for the loading of external libraries.

<h4>About</h4>
Pollitt is built on the <a href="http://getbootstrap.com/">Bootstrap 3.2.0 framework</a>, hosted by <a href="http://www.maxcdn.com/">MaxCDN</a>. It makes use of <a href="http://jquery.com/download/">jQuery 2.1.1</a>, and of both Christian Bach's <a href="http://tablesorter.com/docs/">tablesorter</a> class and Steve Gardner's work on code for calculating Pearson correlation coefficients.

It was developed by <a href="http://www.winding.co">Ian Fitzpatrick</a> in August 2014, and released for the <a href="http://www.planningness.com">2014 Planning-ness conference</a> in Portland, Oregon.

