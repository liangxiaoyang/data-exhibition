﻿/*
 Highcharts JS v5.0.0 (2016-09-29)
 Exporting module

 (c) 2010-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(h){"object"===typeof module&&module.exports?module.exports=h:h(Highcharts)})(function(h){(function(f){var h=f.defaultOptions,q=f.doc,u=f.Chart,v=f.addEvent,D=f.removeEvent,E=f.fireEvent,r=f.createElement,w=f.discardElement,x=f.css,p=f.merge,B=f.pick,k=f.each,t=f.extend,H=f.splat,I=f.isTouchDevice,F=f.win,J=f.Renderer.prototype.symbols;t(h.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",
contextButtonTitle:"Chart context menu"});h.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};p(!0,h.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",background:"none",color:"#333333",fontSize:I?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",color:"#ffffff"},buttonOptions:{symbolFill:"#666666",
symbolStroke:"#666666",symbolStrokeWidth:3,theme:{fill:"#ffffff",stroke:"none",padding:5}}});h.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},
{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(a,c,e){var b;a=r("form",p({method:"post",action:a,enctype:"multipart/form-data"},e),{display:"none"},q.body);for(b in c)r("input",{type:"hidden",name:b,value:c[b]},null,a);a.submit();w(a)};t(u.prototype,{sanitizeSVG:function(a){a=a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,
"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad");return a=a.replace(/<IMG /g,"<image ").replace(/<(\/?)TITLE>/g,
"<$1title>").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,' id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},getChartHTML:function(){return this.container.innerHTML},getSVG:function(a){var c=this,e,b,g,C,l,d=p(c.options,a),m=d.exporting.allowHTML;q.createElementNS||
(q.createElementNS=function(a,b){return q.createElement(b)});b=r("div",null,{position:"absolute",top:"-9999em",width:c.chartWidth+"px",height:c.chartHeight+"px"},q.body);g=c.renderTo.style.width;l=c.renderTo.style.height;g=d.exporting.sourceWidth||d.chart.width||/px$/.test(g)&&parseInt(g,10)||600;l=d.exporting.sourceHeight||d.chart.height||/px$/.test(l)&&parseInt(l,10)||400;t(d.chart,{animation:!1,renderTo:b,forExport:!0,renderer:"SVGRenderer",width:g,height:l});d.exporting.enabled=!1;delete d.data;
d.series=[];k(c.series,function(a){C=p(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});C.isInternal||d.series.push(C)});a&&k(["xAxis","yAxis"],function(b){k(H(a[b]),function(a,c){d[b][c]=p(d[b][c],a)})});e=new f.Chart(d,c.callback);k(["xAxis","yAxis"],function(a){k(c[a],function(b,c){var d=e[a][c],g=b.getExtremes(),f=g.userMin,g=g.userMax;!d||void 0===f&&void 0===g||d.setExtremes(f,g,!0,!1)})});g=e.getChartHTML();d=null;e.destroy();w(b);m&&(b=g.match(/<\/svg>(.*?$)/))&&
(b='<foreignObject x="0" y="0" width="200" height="200"><body xmlns="http://www.w3.org/1999/xhtml">'+b[1]+"</body></foreignObject>",g=g.replace("</svg>",b+"</svg>"));g=this.sanitizeSVG(g);return g=g.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},getSVGForExport:function(a,c){var e=this.options.exporting;return this.getSVG(p({chart:{borderRadius:0}},e.chartOptions,c,{exporting:{sourceWidth:a&&a.sourceWidth||e.sourceWidth,sourceHeight:a&&a.sourceHeight||e.sourceHeight}}))},
exportChart:function(a,c){var e=this.getSVGForExport(a,c);a=p(this.options.exporting,a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:e},a.formAttributes)},print:function(){var a=this,c=a.container,e=[],b=c.parentNode,g=q.body,f=g.childNodes,l=a.options.exporting.printMaxWidth,d,m;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);E(a,"beforePrint");if(m=l&&a.chartWidth>l)d=[a.options.chart.width,void 0,!1],a.setSize(l,void 0,!1);k(f,function(a,b){1===
a.nodeType&&(e[b]=a.style.display,a.style.display="none")});g.appendChild(c);F.focus();F.print();setTimeout(function(){b.appendChild(c);k(f,function(a,b){1===a.nodeType&&(a.style.display=e[b])});a.isPrinting=!1;m&&a.setSize.apply(a,d);E(a,"afterPrint")},1E3)}},contextMenu:function(a,c,e,b,g,f,l){var d=this,m=d.options.navigation,h=d.chartWidth,p=d.chartHeight,G="cache-"+a,n=d[G],y=Math.max(g,f),z,A,u,w=function(b){d.pointer.inClass(b.target,a)||A()};n||(d[G]=n=r("div",{className:a},{position:"absolute",
zIndex:1E3,padding:y+"px"},d.container),z=r("div",{className:"highcharts-menu"},null,n),x(z,t({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},m.menuStyle)),A=function(){x(n,{display:"none"});l&&l.setState(0);d.openMenu=!1},v(n,"mouseleave",function(){u=setTimeout(A,500)}),v(n,"mouseenter",function(){clearTimeout(u)}),v(q,"mouseup",w),v(d,"destroy",function(){D(q,"mouseup",w)}),k(c,function(a){if(a){var b;a.separator?b=r("hr",null,null,z):(b=r("div",
{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();A();a.onclick&&a.onclick.apply(d,arguments)},innerHTML:a.text||d.options.lang[a.textKey]},null,z),b.onmouseover=function(){x(this,m.menuItemHoverStyle)},b.onmouseout=function(){x(this,m.menuItemStyle)},x(b,t({cursor:"pointer"},m.menuItemStyle)));d.exportDivElements.push(b)}}),d.exportDivElements.push(z,n),d.exportMenuWidth=n.offsetWidth,d.exportMenuHeight=n.offsetHeight);c={display:"block"};e+d.exportMenuWidth>h?c.right=
h-e-g-y+"px":c.left=e-y+"px";b+f+d.exportMenuHeight>p&&"top"!==l.alignOptions.verticalAlign?c.bottom=p-b-y+"px":c.top=b+f-y+"px";x(n,c);d.openMenu=!0},addButton:function(a){var c=this,e=c.renderer,b=p(c.options.navigation.buttonOptions,a),g=b.onclick,f=b.menuItems,l,d,m=b.symbolSize||12;c.btnCount||(c.btnCount=0);c.exportDivElements||(c.exportDivElements=[],c.exportSVGElements=[]);if(!1!==b.enabled){var h=b.theme,k=h.states,q=k&&k.hover,k=k&&k.select,n;delete h.states;g?n=function(a){a.stopPropagation();
g.call(c,a)}:f&&(n=function(){c.contextMenu(d.menuClassName,f,d.translateX,d.translateY,d.width,d.height,d);d.setState(2)});b.text&&b.symbol?h.paddingLeft=B(h.paddingLeft,25):b.text||t(h,{width:b.width,height:b.height,padding:0});d=e.button(b.text,0,0,n,h,q,k).addClass(a.className).attr({"stroke-linecap":"round",title:c.options.lang[b._titleKey],zIndex:3});d.menuClassName=a.menuClassName||"highcharts-menu-"+c.btnCount++;b.symbol&&(l=e.symbol(b.symbol,b.symbolX-m/2,b.symbolY-m/2,m,m).addClass("highcharts-button-symbol").attr({zIndex:1}).add(d),
l.attr({stroke:b.symbolStroke,fill:b.symbolFill,"stroke-width":b.symbolStrokeWidth||1}));d.add().align(t(b,{width:d.width,x:B(b.x,c.buttonOffset)}),!0,"spacingBox");c.buttonOffset+=(d.width+b.buttonSpacing)*("right"===b.align?-1:1);c.exportSVGElements.push(d,l)}},destroyExport:function(a){var c=a?a.target:this;a=c.exportSVGElements;var e=c.exportDivElements;a&&(k(a,function(a,e){a&&(a.onclick=a.ontouchstart=null,c.exportSVGElements[e]=a.destroy())}),a.length=0);e&&(k(e,function(a,e){D(a,"mouseleave");
c.exportDivElements[e]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;w(a)}),e.length=0)}});J.menu=function(a,c,e,b){return["M",a,c+2.5,"L",a+e,c+2.5,"M",a,c+b/2+.5,"L",a+e,c+b/2+.5,"M",a,c+b-1.5,"L",a+e,c+b-1.5]};u.prototype.renderExporting=function(){var a,c=this.options.exporting,e=c.buttons,b=this.isDirtyExporting||!this.exportSVGElements;this.buttonOffset=0;this.isDirtyExporting&&this.destroyExport();if(b&&!1!==c.enabled){for(a in e)this.addButton(e[a]);this.isDirtyExporting=!1}v(this,
"destroy",this.destroyExport)};u.prototype.callbacks.push(function(a){a.renderExporting();v(a,"redraw",a.renderExporting);k(["exporting","navigation"],function(c){a[c]={update:function(e,b){a.isDirtyExporting=!0;p(!0,a.options[c],e);B(b,!0)&&a.redraw()}}})})})(h)});