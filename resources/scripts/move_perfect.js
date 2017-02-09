// JavaScript Document

//获取非行间样式公用函数
function getStyle(obj,attr)
{
		if(obj.currentStyle)
		{
			return obj.currentStyle[attr];
		}else
		{
			return getComputedStyle(obj,false)[attr];
		}
}
//任意值运动公用函数(缓冲版)
function move(obj,json,funEnd)
{
	var speed=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
	{	
		var Stop=true;//控制停止的bug
		
		for(var attr in json)
		{
			//判断是否为改变透明度
			var cur=0;
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);//四舍五入避免计算机的小数误差
			}else
			{
				cur=parseInt(getStyle(obj,attr));
			}
			//速度
			speed=(json[attr]-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr]) Stop=false;
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				
				obj.style[attr]=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		if(Stop)
		{
			clearInterval(obj.timer);
			
			if(funEnd)	funEnd();//注意第二个funEnd后的括号不能少 
		}
	},30);
}
