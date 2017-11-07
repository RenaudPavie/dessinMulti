var path = [];
var myMouse = false;

var dernierX = 0;
var dernierY = 0;

function drawPath(){
		var ctx = $('#myCanvas')[0].getContext('2d');
		ctx.moveTo(dernierX,dernierY);
		ctx.lineTo(event.offsetX,event.offsetY);
		ctx.strokeStyle = document.getElementById('colorPicker').value;
		ctx.lineWidth = document.getElementById('sizeT').value;
		ctx.stroke();
		dernierX = event.offsetX;
		dernierY = event.offsetY;

}

$('#myCanvas')
	.mousemove(function(){
		if (myMouse === true) {
			path.push([event.offsetX, event.offsetY]);
			drawPath()
		}
	})
	.mousedown(function(){
		path = [];
		myMouse = true;
		dernierX = event.offsetX;
		dernierY = event.offsetY;
	})
	.mouseup(function(){
		myMouse=false;
			var data = {
				path: path,
				strokeColor : document.getElementById('colorPicker').value,
				lineWidth : document.getElementById('sizeT').value
			}

			var query = {
				url : 'http://draw.api.niamor.com/paths/add',
				method: 'POST',
				data: data
				
			}
		$.ajax(query);	
	})

$.ajax('http://draw.api.niamor.com/paths').done(function (lesChemins) {
	var ctx = $('#myCanvas')[0].getContext('2d');
	for ( i = 0 ; i < lesChemins.length; i++ ) {
		ctx.beginPath();
		for (j =  0; j < lesChemins[i].path.length; j++) {
	 		ctx.lineTo(lesChemins[i].path[j][0],lesChemins[i].path[j][1]); 
		}
		ctx.stroke();
	}

	
}); 

	




		