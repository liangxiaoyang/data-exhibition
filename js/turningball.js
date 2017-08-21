var radius = 80;
var dtr = Math.PI/180;
var d=1000;
var x_skip = 0, y_skip = 15;

var mcList = [];
var turningball_active = false;
var lasta = 1;
var lastb = 1;
var distr = true;
var tspeed=8;
var size=150;

var mouseX=90;
var mouseY=30;

var howElliptical=2;

var aA=null;
var oDiv=null;
var turningball_timer=null;
var aA_max=0;

/*
function showToolTip(e,text){  
    if(document.all)e = event;  
    var obj = document.getElementById('bubble_tooltip');  
    var obj2 = document.getElementById('bubble_tooltip_content');  
    obj2.innerHTML = text;  
    var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);  
    if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0;   
    var leftPos = e.clientX + 20;  //clientX 事件属性返回当事件被触发时鼠标指针相对于浏览器页面（或客户区）的水平坐标  
    if(leftPos<0)leftPos = 0;  
    obj.style.left = leftPos + 'px';  
    obj.style.top = e.clientY + st + 'px';  
    obj.style.display = 'block';  
    fadeIn(obj,5,100);  
}     
  
function hideToolTip()  
{  
    var obj = document.getElementById('bubble_tooltip');  
    //obj.style.display = 'none';  
    fadeOut(obj,5,0);  
}  
  
//设置元素透明度,透明度值按IE规则计,即0~100  
function SetOpacity(ev, v){  
    ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;  
}  
  
//淡入效果(含淡入到指定透明度)  
function fadeIn(elem, speed, opacity){  
     
    // * 参数说明  
    // * elem==>需要淡入的元素  
    // * speed==>淡入速度,正整数(可选)  
    // * opacity==>淡入到指定的透明度,0~100(可选)  
      
    speed = speed || 20;  
    opacity = opacity || 100;  
    //显示元素,并将元素值为0透明度(不可见)  
    elem.style.display = 'block';  
    SetOpacity(elem, 0);  
    //初始化透明度变化值为0  
    var val = 0;  
    //循环将透明值以2递增,即淡入效果  
    (function(){  
        SetOpacity(elem, val);  
        val += 5;  
        if (val <= opacity) {  
            setTimeout(arguments.callee, speed)  
        }  
    })();  
}  
  
//淡出效果(含淡出到指定透明度)  
function fadeOut(elem, speed, opacity){  
     
    // * 参数说明  
    // * elem==>需要淡入的元素  
    // * speed==>淡入速度,正整数(可选)  
    // * opacity==>淡入到指定的透明度,0~100(可选)  
      
    speed = speed || 20;  
    opacity = opacity || 0;  
    //初始化透明度变化值为0  
    var val = 100;  
    //循环将透明值以5递减,即淡出效果  
    (function(){  
        SetOpacity(elem, val);  
        val -= 5;  
        if (val >= opacity) {  
            setTimeout(arguments.callee, speed);  
        }else if (val < 0) {  
            //元素透明度为0后隐藏元素  
            elem.style.display = 'none';  
        }  
    })(); 
*/		

function zzsc(id, opts){
	if (turningball_timer==null){
		clearInterval(turningball_timer);
	};
	
	aA = null;
	oDiv = null;
	aA_max=0;
	mouseX=90;
	mouseY=30;
	mcList = [];
	active = false;
	lasta = 1;
	lastb = 1;
	distr = true;
	tspeed=10;
	size=150;
	
	var i=0, t_wi=0;
	var oTag=null;
	
	oDiv = document.getElementById(id);
	oDiv.innerHTML = opts.obj;
	/* 设置P的属性 */
	oP=oDiv.getElementsByTagName('p')
	if( oP != null) {
		oP[0].style.color = '#BFBFBF';
		oP[0].style.fontWeight = 'bold';
		oP[0].style.fontSize = '12px';
		//oP[0].style.fontFamily = 'KaiTi_GB2312';
		oP[0].style.textAlign = 'center';
		oP[0].style.textShadow = "0 0 2px #000000, 0 0 1px #000000";
	}
	
	aA=oDiv.getElementsByTagName('a');
	
	for(i=0;i<aA.length;i++)
	{
		oTag={};
		oTag.offsetWidth=aA[i].offsetWidth;
		oTag.offsetHeight=aA[i].offsetHeight;
		t_wi = parseInt(aA[i].getAttribute("rel"), 10);
		if(t_wi > aA_max){
			aA_max = t_wi;
		}
		
		mcList.push(oTag);
	}
	
	sineCosine( 0,0,0 );
	
	positionAll();
	
	oDiv.onmouseover=function ()
	{
		turningball_active=true;
	};
	
	oDiv.onmouseout=function ()
	{
		turningball_active=false;
	};
	
	oDiv.onmousemove=function (ev)
	{
		var oEvent=window.event || ev;
		
		mouseX=oEvent.clientX-(oDiv.offsetLeft+oDiv.offsetWidth/2);
		mouseY=oEvent.clientY-(oDiv.offsetTop+oDiv.offsetHeight/2);
		
		mouseX/=10;
		mouseY/=10;
	};
	
	turningball_timer = setInterval("zzsc_update(true)", 300);
};

function zzsc_update(b_active)
{
	var a;
	var b;
	
	if(b_active)
	{
		a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
		b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
	}
	else
	{
		a = lasta * 0.95;
		b = lastb * 0.95;
	}
	
	lasta=a;
	lastb=b;
	
	if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
	{
		return;
	}
	
	var c=0;
	sineCosine(a,b,c);
	for(var j=0;j<mcList.length;j++)
	{
		var rx1=mcList[j].cx;
		var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
		var rz1=mcList[j].cy*sa+mcList[j].cz*ca;
		
		var rx2=rx1*cb+rz1*sb;
		var ry2=ry1;
		var rz2=rx1*(-sb)+rz1*cb;
		
		var rx3=rx2*cc+ry2*(-sc);
		var ry3=rx2*sc+ry2*cc;
		var rz3=rz2;
		
		mcList[j].cx=rx3;
		mcList[j].cy=ry3;
		mcList[j].cz=rz3;
		
		per=d/(d+rz3);
		
		mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
		mcList[j].y=ry3*per;
		mcList[j].scale=per;
		mcList[j].alpha=per;
		
		mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);
	}
	
	doPosition();
	depthSort();
}

function depthSort() {
	var i=0;
	var aTmp=[];
	
	for(i=0;i<aA.length;i++) {
		aTmp.push(aA[i]);
	}
	
	aTmp.sort(
		function (vItem1, vItem2) {
			if(vItem1.cz>vItem2.cz){ return -1; }
			else if(vItem1.cz<vItem2.cz) { return 1; }
			else { return 0; }
		}
	);
	
	for(i=0;i<aTmp.length;i++) {
		aTmp[i].style.zIndex=i;
	}
}

function positionAll()
{
	var phi=0;
	var theta=0;
	var max=mcList.length;
	var i=0;
	
	var aTmp=[];
	var oFragment=document.createDocumentFragment();
	
	//随机排序
	for(i=0;i<aA.length;i++)
	{
		aTmp.push(aA[i]);
	}
	
	aTmp.sort
	(
		function ()
		{
			return Math.random()<0.5?1:-1;
		}
	);
	
	for(i=0;i<aTmp.length;i++)
	{
		oFragment.appendChild(aTmp[i]);
	}
	
	oDiv.appendChild(oFragment);
	
	for( var i=1; i<max+1; i++){
		if( distr )
		{
			phi = Math.acos(-1+(2*i-1)/max);
			theta = Math.sqrt(max*Math.PI)*phi;
		}
		else
		{
			phi = Math.random()*(Math.PI);
			theta = Math.random()*(2*Math.PI);
		}
		//坐标变换
		mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi) + x_skip;
		mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi) + y_skip;
		mcList[i-1].cz = radius * Math.cos(phi);
		
		aA[i-1].style.left=mcList[i-1].cx+oDiv.offsetWidth/2-mcList[i-1].offsetWidth/2+'px';
		aA[i-1].style.top=mcList[i-1].cy+oDiv.offsetHeight/2-mcList[i-1].offsetHeight/2+'px';
	}
}

function doPosition()
{
	var l=oDiv.offsetWidth/2;
	var t=oDiv.offsetHeight/2;
	var wi=0;
	for(var i=0;i<mcList.length;i++)
	{
		wi = parseInt(aA[i].getAttribute("rel"), 10);
		wi = parseInt((Math.log(wi)/Math.log(aA_max)) * 3840);
		aA[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
		aA[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';
		aA[i].style.fontSize=Math.ceil(8*mcList[i].scale+4)+'px';
		if( wi > 100 && wi <= 3840){
			aA[i].style.color='#'+ wi.toString(16);
		};
		
		aA[i].style.filter="opacity("+100*mcList[i].alpha+"%)";
		aA[i].style.opacity=mcList[i].alpha;
	}
}

function sineCosine( a, b, c)
{
	sa = Math.sin(a * dtr);
	ca = Math.cos(a * dtr);
	sb = Math.sin(b * dtr);
	cb = Math.cos(b * dtr);
	sc = Math.sin(c * dtr);
	cc = Math.cos(c * dtr);
}