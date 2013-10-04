_chronic = {};

_chronic.format = function(time,format){
	//kind of a lame way to do it, but for now each new format will need an if statement
	var d = new Date(time);
	if(format == 'MM/DD HH:MM'){
		return _chronic.padZeros(d.getMonth()+1,2) + '/' + _chronic.padZeros(d.getDate(),2) + ' ' + _chronic.padZeros(d.getHours(),2) +':'+ _chronic.padZeros(d.getMinutes(),2);
	}
	if(format == 'MM/DD/YY'){
		yr = d.getFullYear().toString();
		return _chronic.padZeros(d.getMonth()+1,2) + '/' + _chronic.padZeros(d.getDate(),2) + '/' + yr.slice(yr.length-2,yr.length);
	}
	if(format == 'HH:MM') {
		return _chronic.padZeros(d.getHours(),2) +':'+ _chronic.padZeros(d.getMinutes(),2);
	}
}

_chronic.padZeros = function (number,digits){
	//if you want two digits, ex 04, do padZeros(4,2)
	number = number.toString();
	if(number.length < digits){
		while(number.length < digits){
			number = '0' + number;
		}
	}
	return number;
}

_chronic.today = function(){
	var d = new Date();
	return (new Date(d.getFullYear(),d.getMonth(),d.getDate())).getTime();
}

_chronic.thisWeek = function(sunday){
	//pass in true if you want your dates to start on sunday.
	var d = new Date();
	if(sunday){
		return (new Date(d.getFullYear(),d.getMonth(),d.getDate()-d.getDay())).getTime();
	} else {
		return (new Date(d.getFullYear(),d.getMonth(),d.getDate()-d.getDay()+1)).getTime();	
	}
	
}

_chronic.thisMonth = function(){
	var d = new Date();
	return (new Date(d.getFullYear(),d.getMonth(),1)).getTime();
}

_chronic.timeMachine = function(datetime,shift){
	datetime = (new Date(datetime)).getTime();
	//pass in something like -1h or -1day, can't do more than one thing yet
	//will return a utc timestamp
	var direction = 'forward';
	if(shift[0] == '-') {
		direction = 'reverse';
	}

	var array = shift.split('');
	var number = '';
	for (var i=0; i<array.length; i++){
		if(!isNaN(parseInt(array[i]))){
			number = number + array[i].toString();
		}
	}
	number = parseInt(number);
	var mod = 0;
	if(array[array.length-1] == 'h'){
		mod = number*60*60*1000;
	}
	if(array[array.length-1] == 'd'){
		mod = number*24*60*60*1000;
	}

	if(direction == 'reverse'){
		datetime = datetime - mod;
	} else {
		datetime = datetime + mod;
	}

	return datetime;

}
