// JavaScript Document
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;

//const endTime=new Date(2017,8,16,18,32,55);
//var endTime=new Date();
//endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds=0;
var balls=[];
const colors=["#008f5a","#000000","#d15d5e","#bb1b33","#883040","#ee652e","#94a1a9","#a9987e","#758a8f","#c2a6cc"];
					   
window.onload=function(){
	
	WINDOW_WIDTH=document.documentElement.clientWidth
	WINDOW_HEIGHT=document.documentElement.clientHeight;
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
	var canvas=document.getElementById("canvas");
	
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	var context=canvas.getContext("2d");
	curShowTimeSeconds=getCurShowTimeSeconds();
	setInterval(
		function(){
			render(context);
			update();
		},
		50);
}	


function getCurShowTimeSeconds()
{
	var curTime=new Date();
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	
	
	return ret;
}

function update(){
	
    var nextShowTimeSeconds=getCurShowTimeSeconds();
	var nexthours=parseInt(nextShowTimeSeconds/3600);
	var nextminutes=parseInt((nextShowTimeSeconds-nexthours*3600)/60);
	var nextseconds=parseInt(nextShowTimeSeconds%60);
	
	var curhours=parseInt(curShowTimeSeconds/3600);
	var curminutes=parseInt((curShowTimeSeconds-curhours*3600)/60);
	var curseconds=parseInt(curShowTimeSeconds%60);
	
	if(nextseconds!=curseconds)
		{
			if(parseInt(curhours/10)!=parseInt(nexthours/10))
				{
					addballs(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curhours/10));
				}
			if(parseInt(curhours%10)!=parseInt(nexthours%10))
				{
					addballs(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhours%10));
				}
			if(parseInt(curminutes/10)!=parseInt(nextminutes/10))
				{
					addballs(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curminutes/10));
				}
			if(parseInt(curminutes%10)!=parseInt(nextminutes%10))
				{
					addballs(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curminutes%10));
				}
			if(parseInt(curseconds/10)!=parseInt(nextseconds/10))
				{
					addballs(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curseconds/10));
				}
			if(parseInt(curseconds%10)!=parseInt(nextseconds%10))
				{
					addballs(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
				}
			curShowTimeSeconds=nextShowTimeSeconds;
		}
	updateBalls();
}

function updateBalls()
{
	for(var i=0;i<balls.length;i++)
		{
			balls[i].x+=balls[i].vx;
			balls[i].y+=balls[i].vy;
			balls[i].vy+=balls[i].g;
			
			if(balls[i].y>=WINDOW_HEIGHT-RADIUS)
				{
					balls[i].y=WINDOW_HEIGHT-RADIUS;
					balls[i].vy=-balls[i].vy*0.75;
				}
			/*if(balls[i].x>=WINDOW_WIDTH-RADIUS)
				{
					balls[i].x=WINDOW_WIDTH-RADIUS;
					balls[i].vx=-balls[i].vx;
				}
	*/
		}
			var cnt=0;
	for(var i=0;i<balls.length;i++)
	{
		if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH)
			{
				balls[cnt++]=balls[i];
			}
	}
	while(balls.length>cnt)
		{
			balls.pop();
		}
		
	
}

function addballs(x,y,num)
{
	for(var i=0;i<digit[num].length;i++)
		{
			for(var j=0;j<digit[num][i].length;j++)
				{
					if(digit[num][i][j]==1)
						{
							var aball={
								x:x+j*2*(RADIUS+1)+(RADIUS+1),
								y:y+i*2*(RADIUS+1)+(RADIUS+1),
								r:RADIUS,
								g:1.5+Math.random(),
								vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
								vy:-5,
								color:colors[Math.floor(Math.random()*colors.length)]
							}
							balls.push(aball);
						}
				}
		}
}

function render(ctx)
{
	ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=parseInt(curShowTimeSeconds%60);
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);
	
	for(var i=0;i<balls.length;i++)
		{
			ctx.fillStyle=balls[i].color;
			
			ctx.beginPath();
			ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,false);
			ctx.closePath();
			ctx.fill();
		}
	console.log(balls.length);
}

function renderDigit(x,y,num,ctx)
{
	ctx.fillStyle="rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++)
		{
			for(var j=0;j<digit[num][i].length;j++)
				{
					if(digit[num][i][j]==1)
						{
							ctx.beginPath();
							ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
							ctx.closePath();
							
							ctx.fill();
						}
				}
		}
}