/*

The below code was developed by Steve Gardner to calculate Pearson corrleation coefficients
For reference, the original source can be obtained at:

'stevegardner.net/2012/06/11/javascript-code-to-calculate-the-pearson-correlation-coefficient/'


*/

var mathUtils = {};

mathUtils.getPearsonsCorrelation = function (x, y) {
  var shortestArrayLength = 0;
  if(x.length == y.length)
  {
    shortestArrayLength = x.length;
  }
  else if(x.length > y.length)
  {
    shortestArrayLength = y.length;
	console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
  }
  else
  {
	shortestArrayLength = x.length;
	console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for(var i=0; i<shortestArrayLength; i++)
  {
    xy.push(x[i] * y[i]);
	x2.push(x[i] * x[i]);
	y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for(var i=0; i<shortestArrayLength; i++)
  {
	sum_x += x[i];
	sum_y += y[i];
	sum_xy += xy[i];
	sum_x2 += x2[i];
	sum_y2 += y2[i];
  } 

  var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
  var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
  var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  return answer;
}


