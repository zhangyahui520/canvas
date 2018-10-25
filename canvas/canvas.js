var vanvas=document.getElementById("canvas");
var ctx=vanvas.getContext("2d");

//绘制三角形

ctx.moveTo(100,100);
ctx.lineTo(700,700);
ctx.lineTo(100,700);
ctx.lineTo(100,100);


ctx.fillStyle="rgb(2,100,30)";
ctx.fill();
ctx.lineWidth=5;
ctx.strokeStyle="#000";

ctx.stroke();