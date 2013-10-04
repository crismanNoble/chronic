function test(resultString){
	var p = document.createElement('p')
	p.innerHTML = resultString;
	document.body.appendChild(p);
}

function testFormat(input, format, expected){

	var output = _chronic.format(input,format);

	var result = '_chronic.format() | input: '+input+ ' | format: '+format+' | output: '+output+' | expected: '+expected+'</span>';

	if(output == expected){
		result = '<span class="pass"><b>PASS :)</b> | ' + result;
	} else {
		result = '<span class="fail"><b>FAIL :( </b>| ' + result;
	}

	return result;
}

function testPadding(input,digits,expected){
	var output = _chronic.padZeros(input,digits);

	var result = '_chronic.padZeros() | input: '+input+ ' | digits: '+digits +' | output: '+output+' | expected: '+expected+ '</span>';

	if(output == expected){
		result = '<span class="pass"><b>PASS :)</b> | ' + result;
	} else {
		result = '<span class="fail"><b>FAIL :( </b>| ' + result;
	}

	return result;
}

function runTests(){

	test(testPadding(7,2,'07'));
	test(testPadding(0,2,'00'));
	test(testPadding(30,4,'0030'));
	test(testPadding(90,2,'90'));

	test(testFormat('12/7/2012 5:30','MM/DD HH:MM','12/07 05:30'));
	test(testFormat('12/7/2012 5:30 PM','MM/DD HH:MM','12/07 17:30'));
	test(testFormat('12/13/2014 15:30','MM/DD/YY','12/13/14'));
	test(testFormat('2/12/1999','HH:MM','00:00'));
}