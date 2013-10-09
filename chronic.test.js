function test(resultString){
	var p = document.createElement('p')
	p.innerHTML = resultString;
	document.body.appendChild(p);
}

function testTitle(resultString){
	var p = document.createElement('h1')
	p.innerHTML = resultString;
	document.body.appendChild(p);
}

function testSection(sectionTitle){
	var p = document.createElement('p')
	p.innerHTML = '<i><b>'+sectionTitle+'</b></i>';
	document.body.appendChild(p);
}

function testFormat(input, format, expected){

	var output = _chronic.format(input,format);

	var result = '_chronic.format() | input: '+input+ ' | format: '+format+' | output: '+output+' | expected: '+expected+'</span>';

	if(output == expected){
		result = '<span class="pass"><b>PASS</b> &#x270C; | ' + result;
	} else {
		result = '<span class="fail"><b>FAIL</b>  &#x2620; | ' + result;
	}

	return result;
}

function testMachine(input, shift, expected){
	var output = new Date(_chronic.timeMachine(input,shift));
	var expected = new Date(expected);
	var result = '_chronic.format() | input: '+input+ ' | shift: '+shift+' | output: '+output+' | expected: '+expected+'</span>';

	if(output.getTime() == expected.getTime()){
		result = '<span class="pass"><b>PASS</b> &#x270C; | ' + result;
	} else {
		result = '<span class="fail"><b>FAIL</b>  &#x2620; | ' + result;
	}
	return result;
}

function testPadding(input,digits,expected){
	var output = _chronic.padZeros(input,digits);

	var result = '_chronic.padZeros() | input: '+input+ ' | digits: '+digits +' | output: '+output+' | expected: '+expected+ '</span>';

	if(output == expected){
		result = '<span class="pass"><b>PASS</b> &#x270C; | ' + result;
	} else {
		result = '<span class="fail"><b>FAIL</b>  &#x2620; | ' + result;
	}

	return result;
}

function simpleTest(test,testResult){
	var result;
	if (typeof(test) === undefined){
		result = '<span class="fail"><b>FAIL</b>  &#x2620; | '+test+' | '+testResult+'</span>';
	} else {
		result = '<span class="pass"><b>PASS</b> &#x270C; | '+test+' | '+testResult+'</span>';
	}

	return result;
}

function runTests(){
	testTitle('chronic test suite -~');
	testSection('_chronic.blips');

	test(simpleTest('_chronic.now()',new Date(_chronic.now())));
	test(simpleTest('_chronic.today()',new Date(_chronic.today())));
	test(simpleTest('_chronic.thisWeek()',new Date(_chronic.thisWeek())));
	test(simpleTest('_chronic.thisMonth()',new Date(_chronic.thisMonth())));
	test(simpleTest('_chronic.thisYear()',new Date(_chronic.thisYear())));

	testSection('_chronic.padZeros()');

	test(testPadding(7,2,'07'));
	test(testPadding(0,2,'00'));
	test(testPadding(30,4,'0030'));
	test(testPadding(90,2,'90'));
	test(testPadding(99,1,'99'));

	testSection('_chronic.format()');

	test(testFormat('12/7/2012 5:30','MM/DD HH:MM','12/07 05:30'));
	test(testFormat('12/7/2012 5:30 PM','MM/DD HH:MM','12/07 17:30'));
	test(testFormat('12/13/2014 15:30','MM/DD/YY','12/13/14'));
	test(testFormat('2/12/1999','HH:MM','00:00'));
	test(testFormat('2/02/2002','m/d/yy','2/2/02'));

	testSection('_chronic.timeMachine()');
	test(testMachine('12/7/2012 5:30','-1d','12/6/2012 5:30'));
	test(testMachine('2/20/2012 5:30','1d','2/21/2012 5:30'));
	test(testMachine('2/21/2012 5:30','-4h','2/21/2012 1:30'));
	test(testMachine('2/21/2012 5:30','6h','2/21/2012 11:30'));
	test(testMachine('2/21/2012 5:30','12h','2/21/2012 17:30'));
	test(testMachine('12/7/2012 12:30','-1.5d','12/6/2012 00:30'));
}