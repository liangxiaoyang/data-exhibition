/**
 * 
 * @authors 王昱森
 * @date    2015-08-14 11:31:56
 * @version 1.0.3
 */
var Meter = (function () {

    var options = {

        styles: {
            sAngle: 0.95,
            eAngle: 2.05,
            area: {
                radius: 30,
                colors: { 
                    '0': '#1266BC', 
                    '0.15': '#67C6F2',
                    '0.27': '#45F5E6',
                    '0.75': '#FFDE00',
                    '0.93': '#F5694B', 
                    '1': '#FF0202'
                },
                lineWidth: 1,
                scaleLength: 9,
                scaleWidth: 0.2,
                lineColor: '#fff'
            },
            range: {
                color: '#F4674B',
                width: 2,
                arrow: {
                    height: 15,
                    radius: 4
                } 
            },
            value: {
                margin: -30,
                color: '#F4674B',
                font: 'bold 52px Microsoft YaHei'
            },
            title: {
                margin: 0,
                color: '#F4674B',
                font: 'bold 17px Microsoft YaHei'
            },
            subTitle: {
                margin: 25,
                color: '#222',
                font: '12px Microsoft YaHei'
            },
            label: {
                radius: 28,
                color: '#222',
                background: '#f5f5f5',
                font: '10px Microsoft YaHei'
            },
            inner: {
                radius: 97,
                color: '#222',
                dashedWidth: 3
            }
        }
    };

    var element, 
        context, 
        styles,
        sAngle,
        eAngle,
        areaStyle,
        rangeStyle,
        valueStyle,
        titleStyle,
        subTitleStyle,
        labelStyle,
        innerStyle;

    var extend = function(obj1, obj2){
        for(var k in obj2) {
            if(obj1.hasOwnProperty(k) && typeof obj1[k] == 'object') {
                extend(obj1[k], obj2[k]);
            } else {
                obj1[k] = obj2[k];
            }
        }
    }

    var calcLocation = function(r, end){

        return {
            x: options.centerPoint.x + r * Math.cos(Math.PI * end),
            y: options.centerPoint.y + r * Math.sin(Math.PI * end)
        };
    }

    var calcValueRange = function(value){
        var data = options.data.area,
            index = data.length - 1;

        for (var i = index; i >= 0; i--) {
            if(value >= data[i].min && value < data[i].max){
                index = i;
            }
        };
        var r = (eAngle - sAngle)/data.length,
            s = r * index + sAngle,
            e = r * (index + 1) + sAngle,
            o = data[index];

        return {
            range: (value - o.min)/(o.max - o.min) * (e - s) + s,
            index: index
        };
    }

    var drawCircle = function(opts, flag) {
        var x = opts.x || options.centerPoint.x,
            y = opts.y || options.centerPoint.y,
            s = opts.start || 0,
            e = opts.end || 2;

        context.beginPath();
        context.moveTo(x, y);

        switch(flag){
            case 1: 
                context.setLineDash && context.setLineDash([innerStyle.dashedWidth]);
            case 2:
                context.arc(x, y, opts.r, Math.PI*s, Math.PI*e);
                context.closePath();
                context.strokeStyle = opts.style;
                context.stroke();
                break;
            default:
                context.arc(x, y, opts.r, Math.PI*s, Math.PI*e);
                context.closePath();
                context.fillStyle = opts.style;
                context.fill();
                break;
        }      
    }

    var drawArea = function(){
        var grad  = context.createLinearGradient(options.centerPoint.x-options.radius , 0, options.centerPoint.x+options.radius, 0);
        for(var k in areaStyle.colors) {
            grad.addColorStop(k, areaStyle.colors[k]);
        }
		
		drawCircle({
            r: options.radius,
            start: sAngle,
            end: eAngle,
            style: grad
        });

        drawCircle({
            r: options.radius - areaStyle.radius,
            style: options.data.fillColor||'#fff'
        });
    }

    var drawValueRange = function(valueRange){

        var r = options.radius - areaStyle.radius;

        drawCircle({
            r: r,
            start: sAngle,
            end: valueRange.range,
            style: labelStyle.background
        });

        drawCircle({
            r: r - labelStyle.radius,
            start: sAngle,
            end: valueRange.range,
            style: rangeStyle.color
        });

        drawCircle({
            r: r - labelStyle.radius - rangeStyle.width,
            style: options.data.fillColor||'#fff'
        });
    }

    var fillText = function(opts){
        context.font = opts.font; 
        context.fillStyle = opts.color;
        context.textAlign = opts.align || 'center';
        context.textBaseline = opts.vertical || 'middle';  
        context.moveTo(opts.x, opts.y);  
        context.fillText(opts.text, opts.x, opts.y); 
    }

    var drawInnerContent = function(valueRange, value){
        drawCircle({
            r: innerStyle.radius,
            start: sAngle,
            end: eAngle,
            style: innerStyle.color
        }, 1);

        drawCircle({
            r: innerStyle.radius - 1,
            style: options.data.fillColor||'#fff'
        });

        var data = options.data;
		var t_color = '#FFDE00',
		    f_index_b = (valueRange.index + 1) * 1.0 / data.area.length,
		    f_index_e = (valueRange.index + 2) * 1.0 / data.area.length;
        for(var k in areaStyle.colors) {
			var f_k = parseFloat(k);
			if(f_k>=f_index_b && f_k<f_index_e){
				t_color = areaStyle.colors[k];
				break;
			}
		}
		
        fillText({
            font: valueStyle.font,
            color: t_color,
            text: value,
            x: options.centerPoint.x,
            y: options.centerPoint.y + valueStyle.margin
        });

        fillText({
            font: titleStyle.font,
            color: t_color,
            text: data.title.replace('{t}', data.area[valueRange.index].text).replace('{v}', value),
            x: options.centerPoint.x,
            y: options.centerPoint.y + titleStyle.margin
        });

        fillText({
            font: subTitleStyle.font,
            color: subTitleStyle.color,
            text: data.subTitle,
            x: options.centerPoint.x,
            y: options.centerPoint.y + subTitleStyle.margin
        });
    }

    var drawArrow = function(valueRange){
        var r = options.radius - areaStyle.radius - labelStyle.radius,
            loc = calcLocation(r, valueRange.range),
            x = loc.x - 1, 
            y = loc.y + 0.5;

        drawCircle({
            x: x,
            y: y,
            r: rangeStyle.arrow.radius,
            style: rangeStyle.color
        });
        
        var a = calcLocation(r - rangeStyle.arrow.height, valueRange.range),
            b = calcLocation(r, valueRange.range - 0.01),
            c = calcLocation(r, valueRange.range + 0.01);

        context.beginPath();
        context.moveTo(a.x - 1, a.y + 0.5);
        context.lineTo(b.x - 1, b.y + 0.5);
        context.lineTo(c.x - 1, c.y + 0.5);
        context.closePath();
        context.fillStyle = rangeStyle.color;
        context.fill();

        drawCircle({
            x: x,
            y: y,
            r: rangeStyle.arrow.radius - rangeStyle.width,
            style: '#fff'
        });
    }

    var drawLine = function(line) {
        context.beginPath();
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.closePath();
        context.strokeStyle = line.style;
        context.lineWidth = line.width || 1;
        context.stroke();
    }

    var drawTickMarks = function(){
        var scaleLength = areaStyle.scaleLength,
            data = options.data.area,
            len = scaleLength * data.length,
            range = (eAngle - sAngle)/len;

        for(var j = 1; j < len; j++){
            drawLine({
                start: calcLocation(options.radius, sAngle + range * j),
                end: calcLocation(options.radius - areaStyle.radius, sAngle + range * j),
                style: areaStyle.lineColor,
                width: j % scaleLength == 0 ? areaStyle.lineWidth: areaStyle.scaleWidth
            });
        }

        var lblArr = [];
        for(var i = 0; i < data.length; i++){
            var o = data[i];
            // 如果不需兼容IE9以下则不用join
            if(lblArr.join('').indexOf(o.min) == -1) {
                lblArr.push(o.min);
            }
            lblArr.push(o.text);
            lblArr.push(o.max);

        }
        
        var lblLen = lblArr.length - 1,
            lblRange = (eAngle - sAngle)/lblLen,
            lblOpt = labelStyle,
            lblR = options.radius - areaStyle.radius - lblOpt.radius/2;

        for(var k = 0; k <= lblLen; k++){
            var loc = calcLocation(lblR, sAngle + lblRange * k);
            lblOpt.x = loc.x;
            lblOpt.y = loc.y;
            lblOpt.text = lblArr[k];
            fillText(lblOpt);
        }
        
    }

    var drawing = function(w, h, delay) {
        var value = options.data.value,
			valueTemp,
			valueMax = options.data.area[options.data.area.length-1].max,
            valueMin = options.data.area[0].min;
		var val_a=valueMin;
		
        var timer = setInterval(function(){
            context.clearRect(0, 0, w, h);
            context.fillStyle = options.data.fillColor||'#FFF';
            context.fillRect(0, 0, w, h);

			valueTemp = value;
			if(valueMin + 10 > value){ valueTemp = valueMin + 10; }
			if(valueMax - 10 < value){ valueTemp = valueMax - 10; }
            
			if(valueTemp > val_a){
				val_a = val_a + delay;
				if(val_a > valueTemp) { val_a = valueTemp; }
				
				var valueRange = calcValueRange(val_a);

				drawArea();
				drawValueRange(valueRange);
				drawInnerContent(valueRange, val_a);
				drawArrow(valueRange);
				drawTickMarks();

				if(valueTemp === val_a) {
					clearInterval(timer);
				}
			}
        }, 10);
    }

    var exports = {};

    exports.setOptions = function(opts){
        extend(options, opts);

        styles = options.styles;
        sAngle = styles.sAngle;
        eAngle = styles.eAngle;
        areaStyle = styles.area;
        rangeStyle = styles.range;
        valueStyle = styles.value;
        titleStyle = styles.title;
        subTitleStyle = styles.subTitle;
        labelStyle = styles.label;
        innerStyle = styles.inner;

        element = typeof options.element == 'string' ? document.getElementById(options.element) : options.element;
        context = element.getContext('2d');
        return exports;
    };

    exports.init = function(delay){
        drawing(element.offsetWidth, element.offsetHeight, delay);
        return exports;
    }

    return exports;
})();
