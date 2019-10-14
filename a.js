var balls=new Array();
var ball_count=balls.length;
var ball_image=new Image();

function make_ball(seed){
    var x=Math.floor(Math.random() * 100) + 500 - seed*0.5;
    var y=Math.floor(Math.random() * 100) + 100 + seed*0.5;
    var dx=Math.floor(Math.random() * 10 - seed*0.02) + 1;
    var dy=Math.floor(Math.random() * 10 - seed*0.02) + 1;
    var r=Math.floor(Math.random() * 50) + 50;
    var number=ball_count;

    balls.push({'x':x, 'y':y, 'dx':dx, 'dy':dy, 'r':r,'number':number});
}

function init(){
	var canvas = document.getElementById('C');
	var ctx = canvas.getContext('2d');
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

	for(var i=0;i<200;i++){
		make_ball(i);
	}

	ball_image.src='circle.png';
	ball_count=balls.length;

	if ( document.addEventListener ) {
		document.addEventListener("mousemove",resultFun,false);
	} else if ( document.attachEvent ) {
		document.attachEvent("onmousemove",resultFun);
	} else {
		document.onmousemove = resultFun;
	}
	
	ctx.font='50px auto';
	ctx.fillStyle="rgb(8,89,125)"
	ctx.fillText("Brush your screen: "+ball_count,window.innerWidth/2-250,window.innerHeight/2);
}

function resultFun(x) {
	var p_x = x.clientX;
	var p_y = x.clientY;

	for(var i=0;i<balls.length;i++){
		var tmp=balls[i];
		if(p_x>=tmp.x&&p_x<=(tmp.x+tmp.r)&&p_y>=tmp.y&&p_y<=(tmp.y+tmp.r)){
			balls.splice(i,1);
			ball_count=balls.length;
		}
	}
}

function draw(){
	if(ball_count==0) location.href="b.html";
    var canvas = document.getElementById('C');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        }
    
    ctx.fillText("Brush your screen: "+ball_count,window.innerWidth/2-250,window.innerHeight/2);
    
    for(var i=0;i<balls.length;i++){
        var tmp=balls[i];
        ctx.drawImage(ball_image, tmp.x, tmp.y, tmp.r, tmp.r);
    }
}

function move(){
	var canvas = document.getElementById('C');

    for(var i=0;i<balls.length;i++){
        var tmp=balls[i];
        if(tmp.x+tmp.r+tmp.dx>=canvas.width||tmp.x+tmp.dx<=0) tmp.dx*=-1;
        if(tmp.y+tmp.r+tmp.dy>=canvas.height||tmp.y+tmp.dy<=0) tmp.dy*=-1;
        tmp.x+=tmp.dx;
        tmp.y+=tmp.dy;
    }
}
