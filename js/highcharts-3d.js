﻿/*
 Highcharts JS v5.0.0 (2016-09-29)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function(E){"object"===typeof module&&module.exports?module.exports=E:E(Highcharts)})(function(E){(function(a){var r=a.deg2rad,k=a.pick;a.perspective=function(p,q,w){var n=q.options.chart.options3d,g=w?q.inverted:!1,h=q.plotWidth/2,l=q.plotHeight/2,e=n.depth/2,d=k(n.depth,1)*k(n.viewDistance,0),f=q.scale3d||1,b=r*n.beta*(g?-1:1),n=r*n.alpha*(g?-1:1),c=Math.cos(n),x=Math.cos(-b),y=Math.sin(n),z=Math.sin(-b);w||(h+=q.plotLeft,l+=q.plotTop);return a.map(p,function(b){var a,n;n=(g?b.y:b.x)-h;var k=(g?
b.x:b.y)-l,q=(b.z||0)-e;a=x*n-z*q;b=-y*z*n+c*k-x*y*q;n=c*z*n+y*k+c*x*q;k=0<d&&d<Number.POSITIVE_INFINITY?d/(n+e+d):1;a=a*k*f+h;b=b*k*f+l;return{x:g?b:a,y:g?a:b,z:n*f+e}})}})(E);(function(a){function r(b){var c=0,m,a;for(m=0;m<b.length;m++)a=(m+1)%b.length,c+=b[m].x*b[a].y-b[a].x*b[m].y;return c/2}function k(b){var c=0,m;for(m=0;m<b.length;m++)c+=b[m].z;return b.length?c/b.length:0}function p(b,c,m,a,f,d,D,e){var l=[],n=d-f;return d>f&&d-f>Math.PI/2+1E-4?(l=l.concat(p(b,c,m,a,f,f+Math.PI/2,D,e)),l=
l.concat(p(b,c,m,a,f+Math.PI/2,d,D,e))):d<f&&f-d>Math.PI/2+1E-4?(l=l.concat(p(b,c,m,a,f,f-Math.PI/2,D,e)),l=l.concat(p(b,c,m,a,f-Math.PI/2,d,D,e))):["C",b+m*Math.cos(f)-m*t*n*Math.sin(f)+D,c+a*Math.sin(f)+a*t*n*Math.cos(f)+e,b+m*Math.cos(d)+m*t*n*Math.sin(d)+D,c+a*Math.sin(d)-a*t*n*Math.cos(d)+e,b+m*Math.cos(d)+D,c+a*Math.sin(d)+e]}var q=Math.cos,w=Math.PI,n=Math.sin,g=a.animObject,h=a.charts,l=a.color,e=a.defined,d=a.deg2rad,f=a.each,b=a.extend,c=a.inArray,x=a.map,y=a.merge,z=a.perspective,F=a.pick,
A=a.SVGElement,B=a.SVGRenderer,u=a.wrap,t=4*(Math.sqrt(2)-1)/3/(w/2);B.prototype.toLinePath=function(b,c){var m=[];f(b,function(b){m.push("L",b.x,b.y)});b.length&&(m[0]="M",c&&m.push("Z"));return m};B.prototype.cuboid=function(b){var c=this.g();b=this.cuboidPath(b);c.attr({"stroke-linejoin":"round"});c.front=this.path(b[0]).attr({"class":"highcharts-3d-front",zIndex:b[3]}).add(c);c.top=this.path(b[1]).attr({"class":"highcharts-3d-top",zIndex:b[4]}).add(c);c.side=this.path(b[2]).attr({"class":"highcharts-3d-side",
zIndex:b[5]}).add(c);c.fillSetter=function(b){this.front.attr({fill:b});this.top.attr({fill:l(b).brighten(.1).get()});this.side.attr({fill:l(b).brighten(-.1).get()});this.color=b;return this};c.opacitySetter=function(b){this.front.attr({opacity:b});this.top.attr({opacity:b});this.side.attr({opacity:b});return this};c.attr=function(b){if(b.shapeArgs||e(b.x))b=this.renderer.cuboidPath(b.shapeArgs||b),this.front.attr({d:b[0],zIndex:b[3]}),this.top.attr({d:b[1],zIndex:b[4]}),this.side.attr({d:b[2],zIndex:b[5]});
else return a.SVGElement.prototype.attr.call(this,b);return this};c.animate=function(b,c,a){e(b.x)&&e(b.y)?(b=this.renderer.cuboidPath(b),this.front.attr({zIndex:b[3]}).animate({d:b[0]},c,a),this.top.attr({zIndex:b[4]}).animate({d:b[1]},c,a),this.side.attr({zIndex:b[5]}).animate({d:b[2]},c,a),this.attr({zIndex:-b[6]})):b.opacity?(this.front.animate(b,c,a),this.top.animate(b,c,a),this.side.animate(b,c,a)):A.prototype.animate.call(this,b,c,a);return this};c.destroy=function(){this.front.destroy();this.top.destroy();
this.side.destroy();return null};c.attr({zIndex:-b[6]});return c};B.prototype.cuboidPath=function(b){function c(b){return n[b]}var a=b.x,f=b.y,d=b.z,e=b.height,D=b.width,l=b.depth,n=[{x:a,y:f,z:d},{x:a+D,y:f,z:d},{x:a+D,y:f+e,z:d},{x:a,y:f+e,z:d},{x:a,y:f+e,z:d+l},{x:a+D,y:f+e,z:d+l},{x:a+D,y:f,z:d+l},{x:a,y:f,z:d+l}],n=z(n,h[this.chartIndex],b.insidePlotArea),d=function(b,a){var f=[];b=x(b,c);a=x(a,c);0>r(b)?f=b:0>r(a)&&(f=a);return f};b=d([3,2,1,0],[7,6,5,4]);a=[4,5,2,3];f=d([1,6,7,0],a);d=d([1,
2,5,6],[0,7,4,3]);return[this.toLinePath(b,!0),this.toLinePath(f,!0),this.toLinePath(d,!0),k(b),k(f),k(d),9E9*k(x(a,c))]};a.SVGRenderer.prototype.arc3d=function(a){function e(b){var a=!1,f={},d;for(d in b)-1!==c(d,h)&&(f[d]=b[d],delete b[d],a=!0);return a?f:!1}var m=this.g(),n=m.renderer,h="x y r innerR start end".split(" ");a=y(a);a.alpha*=d;a.beta*=d;m.top=n.path();m.side1=n.path();m.side2=n.path();m.inn=n.path();m.out=n.path();m.onAdd=function(){var b=m.parentGroup,a=m.attr("class");m.top.add(m);
f(["out","inn","side1","side2"],function(c){m[c].addClass(a+" highcharts-3d-side").add(b)})};m.setPaths=function(b){var a=m.renderer.arc3dPath(b),c=100*a.zTop;m.attribs=b;m.top.attr({d:a.top,zIndex:a.zTop});m.inn.attr({d:a.inn,zIndex:a.zInn});m.out.attr({d:a.out,zIndex:a.zOut});m.side1.attr({d:a.side1,zIndex:a.zSide1});m.side2.attr({d:a.side2,zIndex:a.zSide2});m.zIndex=c;m.attr({zIndex:c});b.center&&(m.top.setRadialReference(b.center),delete b.center)};m.setPaths(a);m.fillSetter=function(b){var a=
l(b).brighten(-.1).get();this.fill=b;this.side1.attr({fill:a});this.side2.attr({fill:a});this.inn.attr({fill:a});this.out.attr({fill:a});this.top.attr({fill:b});return this};f(["opacity","translateX","translateY","visibility"],function(b){m[b+"Setter"]=function(b,a){m[a]=b;f(["out","inn","side1","side2","top"],function(c){m[c].attr(a,b)})}});u(m,"attr",function(a,c,f){var d;"object"===typeof c&&(d=e(c))&&(b(m.attribs,d),m.setPaths(m.attribs));return a.call(this,c,f)});u(m,"animate",function(b,a,c,
f){var d,m=this.attribs,l;delete a.center;delete a.z;delete a.depth;delete a.alpha;delete a.beta;l=g(F(c,this.renderer.globalAnimation));if(l.duration){a=y(a);if(d=e(a))l.step=function(b,a){function c(b){return m[b]+(F(d[b],m[b])-m[b])*a.pos}a.elem.setPaths(y(m,{x:c("x"),y:c("y"),r:c("r"),innerR:c("innerR"),start:c("start"),end:c("end")}))};c=l}return b.call(this,a,c,f)});m.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();A.prototype.destroy.call(this)};
m.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};m.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();this.side2.show()};return m};B.prototype.arc3dPath=function(b){function a(b){b%=2*Math.PI;b>Math.PI&&(b=2*Math.PI-b);return b}var c=b.x,f=b.y,d=b.start,e=b.end-1E-5,l=b.r,h=b.innerR,x=b.depth,g=b.alpha,k=b.beta,y=Math.cos(d),r=Math.sin(d);b=Math.cos(e);var z=Math.sin(e),v=l*Math.cos(k),l=l*Math.cos(g),t=h*Math.cos(k),
u=h*Math.cos(g),h=x*Math.sin(k),C=x*Math.sin(g),x=["M",c+v*y,f+l*r],x=x.concat(p(c,f,v,l,d,e,0,0)),x=x.concat(["L",c+t*b,f+u*z]),x=x.concat(p(c,f,t,u,e,d,0,0)),x=x.concat(["Z"]),F=0<k?Math.PI/2:0,k=0<g?0:Math.PI/2,F=d>-F?d:e>-F?-F:d,A=e<w-k?e:d<w-k?w-k:e,B=2*w-k,g=["M",c+v*q(F),f+l*n(F)],g=g.concat(p(c,f,v,l,F,A,0,0));e>B&&d<B?(g=g.concat(["L",c+v*q(A)+h,f+l*n(A)+C]),g=g.concat(p(c,f,v,l,A,B,h,C)),g=g.concat(["L",c+v*q(B),f+l*n(B)]),g=g.concat(p(c,f,v,l,B,e,0,0)),g=g.concat(["L",c+v*q(e)+h,f+l*n(e)+
C]),g=g.concat(p(c,f,v,l,e,B,h,C)),g=g.concat(["L",c+v*q(B),f+l*n(B)]),g=g.concat(p(c,f,v,l,B,A,0,0))):e>w-k&&d<w-k&&(g=g.concat(["L",c+v*Math.cos(A)+h,f+l*Math.sin(A)+C]),g=g.concat(p(c,f,v,l,A,e,h,C)),g=g.concat(["L",c+v*Math.cos(e),f+l*Math.sin(e)]),g=g.concat(p(c,f,v,l,e,A,0,0)));g=g.concat(["L",c+v*Math.cos(A)+h,f+l*Math.sin(A)+C]);g=g.concat(p(c,f,v,l,A,F,h,C));g=g.concat(["Z"]);k=["M",c+t*y,f+u*r];k=k.concat(p(c,f,t,u,d,e,0,0));k=k.concat(["L",c+t*Math.cos(e)+h,f+u*Math.sin(e)+C]);k=k.concat(p(c,
f,t,u,e,d,h,C));k=k.concat(["Z"]);y=["M",c+v*y,f+l*r,"L",c+v*y+h,f+l*r+C,"L",c+t*y+h,f+u*r+C,"L",c+t*y,f+u*r,"Z"];c=["M",c+v*b,f+l*z,"L",c+v*b+h,f+l*z+C,"L",c+t*b+h,f+u*z+C,"L",c+t*b,f+u*z,"Z"];z=Math.atan2(C,-h);f=Math.abs(e+z);b=Math.abs(d+z);d=Math.abs((d+e)/2+z);f=a(f);b=a(b);d=a(d);d*=1E5;e=1E5*b;f*=1E5;return{top:x,zTop:1E5*Math.PI+1,out:g,zOut:Math.max(d,e,f),inn:k,zInn:Math.max(d,e,f),side1:y,zSide1:.99*f,side2:c,zSide2:.99*e}}})(E);(function(a){function r(a,e){var d=a.plotLeft,f=a.plotWidth+
d,b=a.plotTop,c=a.plotHeight+b,g=d+a.plotWidth/2,h=b+a.plotHeight/2,n=Number.MAX_VALUE,k=-Number.MAX_VALUE,q=Number.MAX_VALUE,r=-Number.MAX_VALUE,u,t=1;u=[{x:d,y:b,z:0},{x:d,y:b,z:e}];p([0,1],function(b){u.push({x:f,y:u[b].y,z:u[b].z})});p([0,1,2,3],function(b){u.push({x:u[b].x,y:c,z:u[b].z})});u=w(u,a,!1);p(u,function(b){n=Math.min(n,b.x);k=Math.max(k,b.x);q=Math.min(q,b.y);r=Math.max(r,b.y)});d>n&&(t=Math.min(t,1-Math.abs((d+g)/(n+g))%1));f<k&&(t=Math.min(t,(f-g)/(k-g)));b>q&&(t=0>q?Math.min(t,
(b+h)/(-q+b+h)):Math.min(t,1-(b+h)/(q+h)%1));c<r&&(t=Math.min(t,Math.abs((c-h)/(r-h))));return t}var k=a.Chart,p=a.each,q=a.merge,w=a.perspective,n=a.pick,g=a.wrap;k.prototype.is3d=function(){return this.options.chart.options3d&&this.options.chart.options3d.enabled};k.prototype.propsRequireDirtyBox.push("chart.options3d");k.prototype.propsRequireUpdateSeries.push("chart.options3d");a.wrap(a.Chart.prototype,"isInsidePlot",function(a){return this.is3d()||a.apply(this,[].slice.call(arguments,1))});var h=
a.getOptions();q(!0,h,{chart:{options3d:{enabled:!1,alpha:0,beta:0,depth:100,fitToPlot:!0,viewDistance:25,frame:{bottom:{size:1},side:{size:1},back:{size:1}}}}});g(k.prototype,"setClassName",function(a){a.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});a.wrap(a.Chart.prototype,"setChartSize",function(a){var e=this.options.chart.options3d;a.apply(this,[].slice.call(arguments,1));if(this.is3d()){var d=this.inverted,f=this.clipBox,b=this.margin;
f[d?"y":"x"]=-(b[3]||0);f[d?"x":"y"]=-(b[0]||0);f[d?"height":"width"]=this.chartWidth+(b[3]||0)+(b[1]||0);f[d?"width":"height"]=this.chartHeight+(b[0]||0)+(b[2]||0);this.scale3d=1;!0===e.fitToPlot&&(this.scale3d=r(this,e.depth))}});g(k.prototype,"redraw",function(a){this.is3d()&&(this.isDirtyBox=!0);a.apply(this,[].slice.call(arguments,1))});g(k.prototype,"renderSeries",function(a){var e=this.series.length;if(this.is3d())for(;e--;)a=this.series[e],a.translate(),a.render();else a.call(this)});k.prototype.retrieveStacks=
function(a){var e=this.series,d={},f,b=1;p(this.series,function(c){f=n(c.options.stack,a?0:e.length-1-c.index);d[f]?d[f].series.push(c):(d[f]={series:[c],position:b},b++)});d.totalStacks=b+1;return d}})(E);(function(a){var r,k=a.Axis,p=a.Chart,q=a.each,w=a.extend,n=a.merge,g=a.perspective,h=a.pick,l=a.splat,e=a.Tick,d=a.wrap;d(k.prototype,"setOptions",function(a,b){var c;a.call(this,b);this.chart.is3d()&&(c=this.options,c.tickWidth=h(c.tickWidth,0),c.gridLineWidth=h(c.gridLineWidth,1))});d(k.prototype,
"render",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var b=this.chart,c=b.renderer,d=b.options.chart.options3d,e=d.frame,g=e.bottom,h=e.back,e=e.side,l=d.depth,n=this.height,k=this.width,q=this.left,p=this.top;this.isZAxis||(this.horiz?(h={x:q,y:p+(b.xAxis[0].opposite?-g.size:n),z:0,width:k,height:g.size,depth:l,insidePlotArea:!1},this.bottomFrame?this.bottomFrame.animate(h):(this.bottomFrame=c.cuboid(h).attr({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",
zIndex:b.yAxis[0].reversed&&0<d.alpha?4:-1}).add(),this.bottomFrame.attr({fill:g.color||"none",stroke:g.color||"none"}))):(d={x:q+(b.yAxis[0].opposite?0:-e.size),y:p+(b.xAxis[0].opposite?-g.size:0),z:l,width:k+e.size,height:n+g.size,depth:h.size,insidePlotArea:!1},this.backFrame?this.backFrame.animate(d):(this.backFrame=c.cuboid(d).attr({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:-3}).add(),this.backFrame.attr({fill:h.color||"none",stroke:h.color||"none"})),b={x:q+(b.yAxis[0].opposite?
k:-e.size),y:p+(b.xAxis[0].opposite?-g.size:0),z:0,width:e.size,height:n+g.size,depth:l,insidePlotArea:!1},this.sideFrame?this.sideFrame.animate(b):(this.sideFrame=c.cuboid(b).attr({"class":"highcharts-3d-frame highcharts-3d-frame-side",zIndex:-2}).add(),this.sideFrame.attr({fill:e.color||"none",stroke:e.color||"none"}))))}});d(k.prototype,"getPlotLinePath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||null===b)return b;var c=this.chart,d=c.options.chart.options3d,
c=this.isZAxis?c.plotWidth:d.depth,d=this.opposite;this.horiz&&(d=!d);b=[this.swapZ({x:b[1],y:b[2],z:d?c:0}),this.swapZ({x:b[1],y:b[2],z:c}),this.swapZ({x:b[4],y:b[5],z:c}),this.swapZ({x:b[4],y:b[5],z:d?0:c})];b=g(b,this.chart,!1);return b=this.chart.renderer.toLinePath(b,!1)});d(k.prototype,"getLinePath",function(a){return this.chart.is3d()?[]:a.apply(this,[].slice.call(arguments,1))});d(k.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d())return a.apply(this,[].slice.call(arguments,1));
var b=arguments,c=b[1],b=this.getPlotLinePath(b[2]);(c=this.getPlotLinePath(c))&&b?c.push("L",b[10],b[11],"L",b[7],b[8],"L",b[4],b[5],"L",b[1],b[2]):c=null;return c});d(e.prototype,"getMarkPath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.axis.chart.is3d())return b;b=[this.axis.swapZ({x:b[1],y:b[2],z:0}),this.axis.swapZ({x:b[4],y:b[5],z:0})];b=g(b,this.axis.chart,!1);return b=["M",b[0].x,b[0].y,"L",b[1].x,b[1].y]});d(e.prototype,"getLabelPosition",function(a){var b=a.apply(this,
[].slice.call(arguments,1));this.axis.chart.is3d()&&(b=g([this.axis.swapZ({x:b.x,y:b.y,z:0})],this.axis.chart,!1)[0]);return b});a.wrap(k.prototype,"getTitlePosition",function(a){var b=this.chart.is3d(),c,d;b&&(d=this.axisTitleMargin,this.axisTitleMargin=0);c=a.apply(this,[].slice.call(arguments,1));b&&(c=g([this.swapZ({x:c.x,y:c.y,z:0})],this.chart,!1)[0],c[this.horiz?"y":"x"]+=(this.horiz?1:-1)*(this.opposite?-1:1)*d,this.axisTitleMargin=d);return c});d(k.prototype,"drawCrosshair",function(a){var b=
arguments;this.chart.is3d()&&b[2]&&(b[2]={plotX:b[2].plotXold||b[2].plotX,plotY:b[2].plotYold||b[2].plotY});a.apply(this,[].slice.call(b,1))});k.prototype.swapZ=function(a,b){if(this.isZAxis){var c=b?0:this.chart.plotLeft,d=this.chart;return{x:c+(d.yAxis[0].opposite?a.z:d.xAxis[0].width-a.z),y:a.y,z:a.x-c}}return a};r=a.ZAxis=function(){this.isZAxis=!0;this.init.apply(this,arguments)};w(r.prototype,k.prototype);w(r.prototype,{setOptions:function(a){a=n({offset:0,lineWidth:0},a);k.prototype.setOptions.call(this,
a);this.coll="zAxis"},setAxisSize:function(){k.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.ignoreMinPadding=a.ignoreMaxPadding=null;a.buildStacks&&a.buildStacks();q(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries)a.hasVisibleSeries=!0,c=c.zData,c.length&&(a.dataMin=Math.min(h(a.dataMin,
c[0]),Math.min.apply(null,c)),a.dataMax=Math.max(h(a.dataMax,c[0]),Math.max.apply(null,c)))})}});d(p.prototype,"getAxes",function(a){var b=this,c=this.options,c=c.zAxis=l(c.zAxis||{});a.call(this);b.is3d()&&(this.zAxis=[],q(c,function(a,c){a.index=c;a.isX=!0;(new r(b,a)).setScale()}))})})(E);(function(a){function r(a){var e=a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&(e.stroke=this.options.edgeColor||e.fill,e["stroke-width"]=w(this.options.edgeWidth,1));return e}function k(a){if(this.chart.is3d()){var e=
this.chart.options.plotOptions.column.grouping;void 0===e||e||void 0===this.group.zIndex||this.zIndexSet||(this.group.attr({zIndex:10*this.group.zIndex}),this.zIndexSet=!0)}a.apply(this,[].slice.call(arguments,1))}var p=a.each,q=a.perspective,w=a.pick,n=a.Series,g=a.seriesTypes,h=a.svg;a=a.wrap;a(g.column.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var e=this.chart,d=this.options,f=d.depth||25,b=(d.stacking?d.stack||0:this._i)*(f+(d.groupZPadding||
1));!1!==d.grouping&&(b=0);b+=d.groupZPadding||1;p(this.data,function(a){if(null!==a.y){var d=a.shapeArgs,g=a.tooltipPos;a.shapeType="cuboid";d.z=b;d.depth=f;d.insidePlotArea=!0;g=q([{x:g[0],y:g[1],z:b}],e,!0)[0];a.tooltipPos=[g.x,g.y]}});this.z=b}});a(g.column.prototype,"animate",function(a){if(this.chart.is3d()){var e=arguments[1],d=this.yAxis,f=this,b=this.yAxis.reversed;h&&(e?p(f.data,function(a){null!==a.y&&(a.height=a.shapeArgs.height,a.shapey=a.shapeArgs.y,a.shapeArgs.height=1,b||(a.shapeArgs.y=
a.stackY?a.plotY+d.translate(a.stackY):a.plotY+(a.negative?-a.height:a.height)))}):(p(f.data,function(a){null!==a.y&&(a.shapeArgs.height=a.height,a.shapeArgs.y=a.shapey,a.graphic&&a.graphic.animate(a.shapeArgs,f.options.animation))}),this.drawDataLabels(),f.animate=null))}else a.apply(this,[].slice.call(arguments,1))});a(g.column.prototype,"init",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var e=this.options,d=e.grouping,f=e.stacking,b=w(this.yAxis.options.reversedStacks,
!0),c=0;if(void 0===d||d){d=this.chart.retrieveStacks(f);c=e.stack||0;for(f=0;f<d[c].series.length&&d[c].series[f]!==this;f++);c=10*(d.totalStacks-d[c].position)+(b?f:-f);this.xAxis.reversed||(c=10*d.totalStacks-c)}e.zIndex=c}});a(g.column.prototype,"pointAttribs",r);g.columnrange&&a(g.columnrange.prototype,"pointAttribs",r);a(n.prototype,"alignDataLabel",function(a){if(this.chart.is3d()&&("column"===this.type||"columnrange"===this.type)){var e=arguments[4],d={x:e.x,y:e.y,z:this.z},d=q([d],this.chart,
!0)[0];e.x=d.x;e.y=d.y}a.apply(this,[].slice.call(arguments,1))});g.columnrange&&a(g.columnrange.prototype,"drawPoints",k);a(g.column.prototype,"drawPoints",k)})(E);(function(a){var r=a.deg2rad,k=a.each,p=a.pick,q=a.seriesTypes,w=a.svg;a=a.wrap;a(q.pie.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var g=this,h=g.options,l=h.depth||0,e=g.chart.options.chart.options3d,d=e.alpha,f=e.beta,b=h.stacking?(h.stack||0)*l:g._i*l,b=b+l/2;!1!==h.grouping&&(b=
0);k(g.data,function(a){var e=a.shapeArgs;a.shapeType="arc3d";e.z=b;e.depth=.75*l;e.alpha=d;e.beta=f;e.center=g.center;e=(e.end+e.start)/2;a.slicedTranslation={translateX:Math.round(Math.cos(e)*h.slicedOffset*Math.cos(d*r)),translateY:Math.round(Math.sin(e)*h.slicedOffset*Math.cos(d*r))}})}});a(q.pie.prototype.pointClass.prototype,"haloPath",function(a){var g=arguments;return this.series.chart.is3d()?[]:a.call(this,g[1])});a(q.pie.prototype,"pointAttribs",function(a,g,h){a=a.call(this,g,h);h=this.options;
this.chart.is3d()&&(a.stroke=h.edgeColor||g.color||this.color,a["stroke-width"]=p(h.edgeWidth,1));return a});a(q.pie.prototype,"drawPoints",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&k(this.points,function(a){var h=a.graphic;if(h)h[a.y&&a.visible?"show":"hide"]()})});a(q.pie.prototype,"drawDataLabels",function(a){if(this.chart.is3d()){var g=this.chart.options.chart.options3d;k(this.data,function(a){var l=a.shapeArgs,e=l.r,d=(l.start+l.end)/2,f=a.labelPos,b=-e*(1-Math.cos((l.alpha||
g.alpha)*r))*Math.sin(d),c=e*(Math.cos((l.beta||g.beta)*r)-1)*Math.cos(d);k([0,2,4],function(a){f[a]+=c;f[a+1]+=b})})}a.apply(this,[].slice.call(arguments,1))});a(q.pie.prototype,"addPoint",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});a(q.pie.prototype,"animate",function(a){if(this.chart.is3d()){var g=arguments[1],h=this.options.animation,k=this.center,e=this.group,d=this.markerGroup;w&&(!0===h&&(h={}),g?(e.oldtranslateX=e.translateX,e.oldtranslateY=
e.translateY,g={translateX:k[0],translateY:k[1],scaleX:.001,scaleY:.001},e.attr(g),d&&(d.attrSetters=e.attrSetters,d.attr(g))):(g={translateX:e.oldtranslateX,translateY:e.oldtranslateY,scaleX:1,scaleY:1},e.animate(g,h),d&&d.animate(g,h),this.animate=null))}else a.apply(this,[].slice.call(arguments,1))})})(E);(function(a){var r=a.perspective,k=a.pick,p=a.seriesTypes;a=a.wrap;a(p.scatter.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var p=this.chart,
n=k(this.zAxis,p.options.zAxis[0]),g=[],h,l,e;for(e=0;e<this.data.length;e++)h=this.data[e],l=n.isLog&&n.val2lin?n.val2lin(h.z):h.z,h.plotZ=n.translate(l),h.isInside=h.isInside?l>=n.min&&l<=n.max:!1,g.push({x:h.plotX,y:h.plotY,z:h.plotZ});p=r(g,p,!0);for(e=0;e<this.data.length;e++)h=this.data[e],n=p[e],h.plotXold=h.plotX,h.plotYold=h.plotY,h.plotZold=h.plotZ,h.plotX=n.x,h.plotY=n.y,h.plotZ=n.z}});a(p.scatter.prototype,"init",function(a,k,n){k.is3d()&&(this.axisTypes=["xAxis","yAxis","zAxis"],this.pointArrayMap=
["x","y","z"],this.parallelArrays=["x","y","z"],this.directTouch=!0);a=a.apply(this,[k,n]);this.chart.is3d()&&(this.tooltipOptions.pointFormat=this.userOptions.tooltip?this.userOptions.tooltip.pointFormat||"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>":"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>");return a})})(E);(function(a){var r=a.Axis,k=a.SVGRenderer,p=a.VMLRenderer;p&&(a.setOptions({animate:!1}),p.prototype.cuboid=k.prototype.cuboid,p.prototype.cuboidPath=
k.prototype.cuboidPath,p.prototype.toLinePath=k.prototype.toLinePath,p.prototype.createElement3D=k.prototype.createElement3D,p.prototype.arc3d=function(a){a=k.prototype.arc3d.call(this,a);a.css({zIndex:a.zIndex});return a},a.VMLRenderer.prototype.arc3dPath=a.SVGRenderer.prototype.arc3dPath,a.wrap(r.prototype,"render",function(a){a.apply(this,[].slice.call(arguments,1));this.sideFrame&&(this.sideFrame.css({zIndex:0}),this.sideFrame.front.attr({fill:this.sideFrame.color}));this.bottomFrame&&(this.bottomFrame.css({zIndex:1}),
this.bottomFrame.front.attr({fill:this.bottomFrame.color}));this.backFrame&&(this.backFrame.css({zIndex:0}),this.backFrame.front.attr({fill:this.backFrame.color}))}))})(E)});