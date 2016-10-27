	var WINDOW_WIDTH = document.documentElement.clientWidth || document.body.clientWidth,
	WINDOW_HEIGHT = document.documentElement.clientHeight ||  document.body.clientHeight,
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/12),
	RADIUS = Math.round(WINDOW_WIDTH*3/4/120) - 1,
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/9),
	d = 2*(RADIUS + 1);

var endTime = new Date();
var  time = 0;
var balls = [];
var colors = ["#ff6666", "#ff9966", "#ffcccc", "#ffff66", "#ccccff", "#cc3333", "#ffff00", "#cccc00", "#cc9966",
			"#999933", "#cc9966", "#0066cc", "#663366", "#ff6600", "#009966", "#ff9933", "#9933ff", "0099cc"]
$(function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	time = showTime();
	setInterval(
       function() {
       		render(ctx);
       		update();
       }
		, 50)
});

function update() {
	var nextTime = showTime();
	var nexthours = parseInt(nextTime/3600);
	var nextminutes = parseInt((nextTime%3600)/60);
	var nextseconds = parseInt(nextTime%60);
	var hours = parseInt(time/3600);
	var minutes = parseInt((time%3600)/60);
	var seconds = parseInt(time%60);
	// console.log(nextseconds, seconds);
	if (seconds != nextseconds) {
		if(parseInt(nexthours/10) != parseInt(hours/10)) {
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10));
		}
		if(parseInt(parseInt(nexthours%10)) != parseInt(hours%10)) {
			addBalls(MARGIN_LEFT+8*d, MARGIN_TOP, parseInt(hours%10));
		}
		if(parseInt(nextminutes/10) != parseInt(minutes/10)) {
			addBalls(MARGIN_LEFT+8*d*2+5*d, MARGIN_TOP, parseInt(minutes/10));
		}
		if(parseInt(nextminutes%10) != parseInt(minutes%10)) {
			addBalls(MARGIN_LEFT+8*d*3+5*d, MARGIN_TOP, parseInt(minutes%10));
		}
		if(parseInt(nextseconds/10) != parseInt(seconds/10)) {
			addBalls(MARGIN_LEFT+8*d*4+10*d, MARGIN_TOP, parseInt(seconds/10));
		}
		if(parseInt(nextseconds%10) != parseInt(seconds%10)) {
			addBalls(MARGIN_LEFT+8*d*5+10*d, MARGIN_TOP, parseInt(seconds%10));
		}
		
		time = nextTime;
		
	}
	updateBalls();

}
function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= WINDOW_WIDTH - RADIUS) {
			balls[i].y = WINDOW_WIDTH - RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}

	}

	var cnt = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x + RADIUS > 0 && balls[i].x-RADIUS < WINDOW_WIDTH) {
			balls[cnt++] = balls[i];//前cnt个小球都在屏幕中，将在屏幕中的小球放在前面
		}
	}
	while (balls.length > Math.min(cnt, 999)){//
		balls.pop();//将多余的小球删除
	} 
}
function addBalls(x, y, num) {
	for (var i = 0 ; i < data[num].length; i++) {
		for (var j = 0; j < data[num][0].length; j++) {
			if (data[num][i][j] == 1) {
				var aBall = {
					x: x + (j-1)*d +d/2,
					y: y + (i-1)*d +d/2,
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random()*1000))*3,
					vy: -3,
					colors: colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}
function showTime() {
	var now = new Date();
	var reg = (endTime.getTime() + 60*60*1000 - now.getTime())/1000;
	return reg > 0 ? reg: 0;
}

function render(ctx) {

	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);//清楚历史数据

	var hours = parseInt(time/3600);
	var minutes = parseInt((time%3600)/60);//时间的算法
	var seconds = parseInt(time%60);
	//绘制每一个数字

	renderData(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), ctx);
	renderData(MARGIN_LEFT+8*d, MARGIN_TOP, parseInt(hours%10), ctx);
	renderData(MARGIN_LEFT+8*d*2, MARGIN_TOP, 10, ctx);
	renderData(MARGIN_LEFT+8*d*2+5*d, MARGIN_TOP, parseInt(minutes/10), ctx);
	renderData(MARGIN_LEFT+8*d*3+5*d, MARGIN_TOP, parseInt(minutes%10), ctx);
	renderData(MARGIN_LEFT+8*d*4+5*d, MARGIN_TOP, 10, ctx);
	renderData(MARGIN_LEFT+8*d*4+10*d, MARGIN_TOP, parseInt(seconds/10), ctx);
	renderData(MARGIN_LEFT+8*d*5+10*d, MARGIN_TOP, parseInt(seconds%10), ctx);

	for (var i = 0; i < balls.length; i++) {
		ctx.fillStyle = balls[i].colors;
		ctx.beginPath();
		ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		ctx.closePath();
		ctx.fill();
	}
}

function renderData(x, y, num, ctx) {
	for (var i = 0 ; i < data[num].length; i++) {
		for (var j = 0; j < data[num][0].length; j++) {
			if (data[num][i][j] === 1) {
				ctx.beginPath();
				ctx.arc(x + (j-1)*d +d/2, y + (i-1)*d +d/2, RADIUS, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fillStyle = "#cc3399";
				ctx.fill();
			}
		}
	}
}
