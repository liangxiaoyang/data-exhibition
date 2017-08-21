/*
	从全局结构中获取需要显示的DPI数据，并绘制在相关的dom中
*/

Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}
/////////////////////////////////////////////////////////////////////////////////////////////
//柱状图
function getEcharts_scatter(id,opts){
	var x_list = opts.data_time;
	var m_list = opts.data_name;
	var n_list = opts.data_val;
	var series_lists = [];
	var series_listm = [];
	$.each(n_list, function(key, val) {
		var series_list = [];
		for(var i=0;i<val[0].length;i++){
			series_list.push({
				name: m_list[i],
				value: val[0][i]
			});
		}
		series_listm.push({
			data: series_list
		});
	});
	for(var n in series_listm){
		series_lists[n]={
			series: series_listm[n]
		};
	}
	var myChart = echarts.init(document.getElementById(id));
	option = {
        baseOption: {
            timeline: {
                // y: 0,
                axisType: 'category',
                // realtime: false,
                // loop: false,
                autoPlay: true,
                // currentIndex: 2,
                playInterval: 3000,
                // controlStyle: {
                //     position: 'left'
                // },
                data: x_list,
                label: {
                    formatter : '{value}',
					textStyle:{
						color:'#A09792',
					}
                },
				left: '5%',
				right: '5%'
            },
			// color:[ '#d48265'],
            tooltip: {
            },
            // legend: {
                // x: 'right',
                // data: ['第一产业']
            // },
            calculable : true,
            grid: {
				top: 40,
                bottom: 100,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            },
            xAxis: [
                {
                    type:'category',          
                    data: m_list,
                    splitLine: {
						lineStyle: {
							type: 'dashed'
						}
					},
					axisLabel: {
						show:true,
						interval: 0,//横轴信息全部显示
						
						rotate: 30,
						textStyle:{
							color:'#A09792',
							fontFamily:'sans-serif',
							fontStyle:'normal',
							fontWeight:'1',
						}
					},
					axisLine:{
						show:true,
						lineStyle:{
							color:'#4C596E',
							//type:'dashed',
							width:1
						}
					}
                }
            ],
            yAxis: [
				{
					name: '指数',
					nameTextStyle:{
						color:'#A09792',
					},
					splitLine: {
						lineStyle: {
							type: 'dashed'
						}
					},
					axisLabel: {
						show:true,
						//interval: 0,//横轴信息全部显示
						
						//rotate: 30,
						textStyle:{
							color:'#A09792',
							fontFamily:'sans-serif',
							fontStyle:'normal',
							fontWeight:'1',
						}
					},
					axisLine:{
						show:true,
						lineStyle:{
							color:'#4C596E',
							//type:'dashed',
							width:1
						}
					}
					//scale: true
				}
            ],
			itemStyle: {
                normal: {
                 
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(17, 168,171, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(17, 168,171, 0.1)'
                    }]),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
			checkpointStyle:{
				color:'#c23531'
			},
            series: [
                {type: 'bar'}
            ]
        },
        options: series_lists
    };
	myChart.setOption(option);
}

function getEcharts_pictorialBar(id,opts){
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart2 = echarts.init(document.getElementById(id)); 
	option = {
		/*title: {
			text: '智慧宽带各行业分布',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		grid:{
			top:'6%',
			left: '0%',
			right: '10%',
			bottom: '0%',
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'none'
			},
			formatter: function (params) {
				return params[0].name + ': ' + params[0].value;
			}
		},
		xAxis: {
			boundaryGap: false,
			data: data_list,
			axisTick: {show: false},
			axisLine: {show: false},
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: -90,
				formatter:function(val){
					return val.split("").join("\n");
				},
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif',
					fontStyle:'normal',
					fontWeight:'1',
				}
					//color: '#48899B'

			}
		},
		yAxis: {
			splitLine: {show: false},
			axisTick: {show: false},
			axisLine: {show: false},
			axisLabel: {show: false}
		},
		color:['#0065c0','#63949B','#7C9F9B','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		series: [{
			name: 'hill',
			type: 'pictorialBar',
			barCategoryGap: '-140%',
			// symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
			symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
			itemStyle: {
				normal: {
					color:'#58feff',
					opacity:0.7
				},
				emphasis: {
					opacity: 1
				}
			},
			data: series_list,
			z: 10
		}, {
			name: 'glyph',
			type: 'pictorialBar',
			barGap: '-100%',
			symbolPosition: 'end',
			symbolSize: 50,
			symbolOffset: [0, '-120%'],
			data: [{
				value: 13,
				symbol: 'none',
				symbolSize: [60, 60]
			}, {
				value: 60,
				symbol: 'none',
				symbolSize: [50, 60]
			}, {
				value: 25,
				symbol: 'none',
				symbolSize: [65, 35]
			}, {
				value: 18,
				symbol: 'none',
				symbolSize: [50, 30]
			}, {
				value: 12,
				symbol: 'none',
				symbolSize: [50, 35]
			}, {
				value: 9,
				symbol: 'none',
				symbolSize: [40, 30]
			}, {
				value: 2,
				symbol: 'none',
				symbolSize: [40, 50]
			}, {
				value: 1,
				symbol: 'none',
				symbolSize: [40, 50]
			}]
		}]
	};
	myChart2.setOption(option);
}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//企业网络服务  6个侧边栏
//左上图
function getEcharts_pie2(id,opts){
	var series_list = opts.data_val ;
	var title = opts.title;
	//加上名称
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart3 = echarts.init(document.getElementById(id)); 
	option = {
		//backgroundColor: 'rgba(130,130,130,0)',
		color:['#48899B','#63949B','#7C9F9B','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: [0, '50%'],
				center: ['45%', '52%'],
				label:{
					normal:{
						textStyle:{
							fontFamily:'sans-serif',
							fontSize: 1, //设置无效果
						},
						formatter:"{b}"+'\n'+"({d}%)"
					}
				},
				labelLine:{
					normal:{
						textStyle:{
							width: 1,
						}
					}
				},
				//roseType: 'radius',
				data: series_list
			}
		],
		textStyle:{
			fontSize: 5,
			fontStyle:'normal'
		}
	};
	// 为echarts对象加载数据 
	myChart3.setOption(option);
}

//左中图
function getEcharts_area(id,opts){
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart4 = echarts.init(document.getElementById(id));
	option = {
		color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		//backgroundColor: 'rgba(130,130,130,0)',
		/*title: {
			text: '智慧宽带互联网访问情况',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		tooltip: {
			trigger: 'axis'
		},
		grid:{
			left: '5%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			/*axisLine: {
				onZero: false
			},*/
			data : data_list,
			axisLabel: {
				show:true,
				//interval: 0,//横轴信息全部显示
				
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif',
					fontStyle:'normal',
					fontWeight:'1',
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					//type:'dashed',
					width:1
				}
			}
		},
		yAxis: {
			type: 'value',
			name:'点击数(个)',
			nameTextStyle:{
				color:'#A09792'
			},
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif',
					fontStyle:'normal'
				},
				formatter:function (value,index){
					var value1= parseInt(value);
					if(value1 >= 1000000){
						value1 = value1/1000000 + ' M';
					}
					else if(value1>=1000){
						value1=value1/1000+ ' K';
					}
					return value1;
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			}
		},
		series:[
			{
				name: '流量',
				type: 'line',
				//symbol:'none',
                stack: '总量',
				smooth: true,
				areaStyle: {
					normal: {
						//color:'#eee'
					}
				},
				data: series_list
			}
		]
	};
	// 为echarts对象加载数据 
	myChart4.setOption(option); 
}

//左下图
function getEcharts_pie3(id,opts){
	var series_list = opts.data_val ;
	var series_list1 = opts.data_val1 ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart5 = echarts.init(document.getElementById(id));
	option = {
		color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		//backgroundColor: 'rgba(130,130,130,0)',
		/*title: {
			text: '智慧宽带访问互联网设备',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		series: [
			{
				name:'访问来源',
				type:'pie',
				//selectedMode: 'single',
				radius: [0, '55%'],
				center: ['50%', '60%'],
				label: {
					normal: {
						position: 'outside',
						formatter:"{b}({d}%)"
					}
				},
				labelLine: {
					normal: {
						show: true
					}
				},
				data:series_list
			}
		]
	}
	myChart5.setOption(option);
}

//右上图 词云
function getEcharts_ciyun(id,opts){
	
}

//右中图
function getEcharts_bar1(id,opts){

	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;

	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart6 = echarts.init(document.getElementById(id)); 
	
	option = {
		/*title: {
			text: '智慧宽带流控功能行业分布',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#BFBFBF',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		color:['#48889A','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid:{
			left: '10%',
			right: '10%',
			bottom: '15%',
			containLabel: true
		},
		xAxis:{
			//boundaryGap: false,
			type: 'category',
			data: data_list,
			axisTick: {
				alignWithLabel: false
			},
			axisLabel:{
				interval:0,
				rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			}
		},
		yAxis: {
			type: 'value',
			name:'占比(%)',
			nameTextStyle:{
				color:'#A09792'
			},
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			}			
		},
		series:[
			{
				name: '直接访问',
				type: 'bar',
//                barWidth: '60%',
				data: series_list
			}
		]
	};
	myChart6.setOption(option);
}
//右下图
function getEcharts_line4(id,opts){
	var series_list = opts.value;
	var title = '智慧宽带加速功能';
	
	var mtime= opts.name;
	
	/* for(i=0;i<opts.data_val.length;i++){
		mtime.push(opts.data_val[i].name);
		series_list.push(opts.data_val[i].value);
	} */
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart7 = echarts.init(document.getElementById(id));
	option = {
		color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		//backgroundColor: 'rgba(130,130,130,0)',
		/*title: {
			text: '智慧宽带加速功能的情况',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		tooltip: {
			trigger: 'axis'
		},
		grid:{
			left: '10%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: mtime,
			
			/*
			formatter:function (value, index) {
				// 格式化成月/日，只在第一个刻度显示年份
				var date = new Date(value);
				var texts = [(date.getMonth() + 1), date.getDate(),date.getHours()];
				if (index === 0) {
					texts.unshift(date.getYear());
				}
				return texts.join('/');
			},
			*/
			boundaryGap: false,
			/*axisLine: {
				onZero: false
			},*/
			axisLabel: {
				show:true,
				interval: 6,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif',
					fontStyle:'normal',
					fontWeight:'1',
				},
				formatter:function(value,index){
					return value.split(" ").join("\n");
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					type:'dashed',
					width:1
				}
			}
		},
		yAxis: {
			type: 'value',
			name: '总流量(M)',
			nameTextStyle:{
				color:'#A09792'
			},
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				},
				formatter:function (value, index){
					var value1= parseInt(value);
					if(value1 >= 1000000){
						value1 = value1/1000000 + ' M';
					} else if(value1>=1000){
						value1=value1/1000+ ' K';
					}
					return value1;
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			}
		},
		series:[
			{
				name: '流量',
				type: 'line',
				//symbol:'none',
                stack: '总量',
				smooth: true,
				areaStyle: {
					normal: {
						//color:'#eee'
					}
				},
				data: series_list
			}
		]
	};
	setInterval(function () {

		for (var i = 0; i < 1; i++) {
			
			series_list.shift();
			mtime.shift();
			var series_list1=dds_accinfo();
			series_list=series_list1.value;
			var mtime1=dds_accinfo();
			mtime=mtime1.name;
			//series_list.push(dds_accinfo());
			//console.log(series_list1);
		}
		//console.log(mtime);
		//console.log(series_list);
		//console.log(series_list);
		myChart7.setOption({
			xAxis:[{
				data:mtime
			}],
			series: [{
				data: series_list
			}]
		});		 
				
	}, 1000);
	// 为echarts对象加载数据 
	myChart7.setOption(option);
}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//插件化服务
/* Echart饼图绘制，后续需要把参数直接带进来 */
//左上图
function getEcharts_pie(id, opts){	
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;
	
    var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
			// 基于准备好的dom，初始化echarts图表
	var myChart8 = echarts.init(document.getElementById(id)); 
	/*var data_list = opts.data ||
		[
			{value:535, name:'斗鱼'},
			{value:510, name:'360安全卫士'},
			{value:1034, name:'爱奇艺'},
			{value:1235, name:'QQ'},
			{value:1548, name:'微信'}
		];*/
	option = {
		//backgroundColor: 'rgba(130,130,130,0)',
		color:['#48899B','#63949B','#7C9F9B','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				labelLine:{
					normal:{
						length:0
					}
				},
				radius: [10, 70],
				center: ['55%', '55%'],
				roseType: 'radius',
				data: series_list
			}
		]
	};
	// 为echarts对象加载数据 
	myChart8.setOption(option); 
}
/////////////////////////////////////////////////////////////////////////////////////////////
//中间底部左侧底部效果图
function getEcharts_pie1(id){
	var myChart9 = echarts.init(document.getElementById(id));
	var dataStyle = {
		normal: {
			//color:
			label: {show:false},
			labelLine: {show:false}
		}
	};
	var placeHolderStyle = {
		normal : {
			color: 'rgba(0,0,0,0)',
			label: {show:false},
			labelLine: {show:false}
		},
		emphasis : {
			color: 'rgba(0,0,0,0)'
		}
	};
	option = {
    //backgroundColor: '#2c343c',
		color:['#48899B','#63949B','#7C9F9B','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		series : [
			{
				name:'1',
				type:'pie',
				startAngle: 70,
				hoverAnimation:false,
				clockWise:false,
				radius : [15, 20],
				itemStyle : dataStyle,
				/*itemStyle : {
					normal: {
						label: {show:false},
						labelLine: {show:false}
					}
				},*/
				data:[
					{
						value:50,
						name:'68%的人表示过的不错'
					},
					{
						value:50,
						name:'invisible',
						itemStyle : placeHolderStyle
					}
				]
			},
			{
				name:'2',
				type:'pie',
				startAngle: 50,
				hoverAnimation:false,
				clockWise:false,
				radius : [10, 15],
				itemStyle : dataStyle,
				data:[
					{
						value:29, 
						name:'29%的人表示生活压力很大'
					},
					{
						value:71,
						name:'invisible',
						itemStyle : placeHolderStyle
					}
				]
			},
			{
				name:'3',
				type:'pie',
				startAngle: 60,
				hoverAnimation:false,
				clockWise:false,
				radius : [5, 10],
				itemStyle : dataStyle,
				data:[
					{
						value:40, 
						name:'3%的人表示“我姓曾”'
					},
					{
						value:60,
						name:'invisible',
						itemStyle : placeHolderStyle
					}
				]
			},
			{
				name:'4',
				type:'pie',
				startAngle: 80,
				hoverAnimation:false,
				clockWise:false,
				radius : [20, 25],
				itemStyle : dataStyle,
				data:[
					{
						value:60, 
						name:'3%的人表示“我姓曾”'
					},
					{
						value:40,
						name:'invisible',
						itemStyle : placeHolderStyle
					}
				]
			},
			{
				name:'5',
				type:'pie',
				startAngle: 60,
				hoverAnimation:false,
				clockWise:false,
				radius : [25, 30],
				itemStyle : dataStyle,
				data:[
					{
						value:60, 
						name:'3%的人表示“我姓曾”'
					},
					{
						value:40,
						name:'invisible',
						itemStyle : placeHolderStyle
					}
				]
			}
		]
	};
	myChart9.setOption(option);
}
//中间底部左侧顶部效果图
function getEcharts_gauge(id){
	var myChart10 = echarts.init(document.getElementById(id));
	option = {
    series : [
        {
            name: '速度',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 0,
            startAngle: 0,
            endAngle: 359,
            splitNumber: 8,
            radius: '75%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 0
                }
            },
            axisLabel:{
                show:false
            },
            axisTick: {            // 坐标轴小标记
                length: 8,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
			splitLine:{
				show:false
			},
            detail : {
                show:false,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            //data:[{value: 0}]
        }
    ]
	};
	myChart10.setOption(option);
}
//底部对图形的描述文字
function getDescription(id,opts){
	var title = opts.title;
	//if(id!=='bottomdiv_top'|| id=!=='bottomdiv_bottom'){
	$("#"+id+"").html('<p style="margin-top:8px;">'+title+'</p>');
	//}
	//$("#"+id+" p").css({'font-size':1});
	//return
}
//中间底部左侧中间效果图
function getEcharts_gauge1(id){
	var myChart11 = echarts.init(document.getElementById(id));
	option = {
    series : [
        {
            name: '速度',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 0,
            startAngle: 0,
            endAngle: 359,
            splitNumber: 8,
            radius: '75%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 0
                }
            },
            axisLabel:{
                show:false
            },
            axisTick: {            // 坐标轴小标记
                length: 3,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
					type:'dashed'
                }
            },
			splitLine:{
				show:false
			},
            detail : {
                show:false,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            //data:[{value: 0}]
        },
		{
			name: '访问来源',
			type: 'pie',
			radius: '50%',
			center: ['50%', '50%'],
			//roseType: 'radius',
			labelLine:{
				normal: {
					show:false
				}
			},
			hoverAnimation:false,
			itemStyle:{
				normal: {
					color:'#063D65'
				}
			},
			data: [
			{value:1}		
			]
		}
    ]
	};
	myChart11.setOption(option);
}
//中间底部中间效果图
function getEcharts_line3(id,opts){
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var data_name = [];
	for(i=0;i<opts.data_val.length;i++){
		data_name.push(opts.data_val[i].name);
	}
	//选中的点
	var sel_data = opts.data_val[0].data.length-1;
	
	//console.log(data_name);
	var myChart12 = echarts.init(document.getElementById(id));
	option = {
		color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		tooltip: {
			trigger: 'axis',
			alwaysShowContent: true,
			position: ['30%', '30%'],
			formatter: function (params) {
				return params[0].name + '<br>'+ data_name[0] + ': ' + params[0].value + '<br>' + data_name[1] + ': ' + params[1].value + '万';
			}
		},
		legend: {
			data:data_name,
			textStyle:{
				color:'auto'
			}
		},
		grid: {
			left: '5%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: data_list,
			axisLabel: {
				show:true,
				interval: 0,//横轴信息全部显示
				rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif',
					fontStyle:'normal',
					fontWeight:'1'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					//type:'dashed',
					width:1
				}
			}
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				interval: 0,//横轴信息全部显示
				rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			},
			splitLine:{
				show:true,
				lineStyle:{
					color:'#334052'
				}
			}
		},
		series: series_list
	};
	myChart12.setOption(option);
	var timer = 0;

    function autoTip() {
        timer = setTimeout(function () {
            //var curr = count % total;

            //3.0以上版本的showTip使用方式
            myChart12.dispatchAction({type: 'showTip', seriesIndex: ''+sel_data+'', dataIndex: ''+sel_data+''});
            //tooltip.showTip({seriesIndex: '0', dataIndex: curr});
        }, 1000);
    }
    autoTip();
}

//中间底部右侧效果图
function getEcharts_gauge2(id,opts){
	var data1 = opts.title;
	var data2 = opts.title1;
	var data3 = opts.title2;
	var myChart13 = echarts.init(document.getElementById(id));
	//弧度和角度的换算
	var radian = Math.PI/180;
	//计算外部空间大小
	//var border_width = (window.screen.width)*(55/100)*(40/100)*(75/100);
	var border_width = (window.innerWidth)*(55/100)*(40/100)*(75/100);
	//圆心X坐标
	var pie_dot_width = border_width*(65/100);
	var border_height = (window.screen.width/16*9/100*32-1)*(95/100)*(95/100);
	//圆的半径，计算方法 宽和高最小值的一半，再乘以（设置的值半分比+5%）
	var pie_width = Math.min(border_height,border_width)/2*50/100;
	//圆心y坐标
	var pie_dot_height = border_height/2;
	//圆上点一,以圆上面110度角的点为交点
	var dot1 = [pie_dot_width-pie_width*Math.sin(radian*20),pie_dot_height-pie_width*Math.sin(radian*70)];
	//圆上点二
	var dot2 = [pie_dot_width-pie_width,pie_dot_height];
	//圆上点三
	var dot3 = [pie_dot_width-pie_width*Math.sin(radian*20),pie_dot_height+pie_width*Math.sin(radian*70)];
	//圆上点四
	var dot4 = [pie_dot_width+pie_width*Math.sin(radian*30),pie_dot_height-pie_width*Math.sin(radian*60)];
	//圆上点五
	var dot5 = [pie_dot_width+pie_width*Math.sin(radian*30),pie_dot_height+pie_width*Math.sin(radian*60)];
	var dataStyle = {
		normal: {
			//color:
			label: {show:false},
			labelLine: {show:false}
		}
	};
	var placeHolderStyle = {
		normal : {
			color: 'rgba(0,0,0,0)',
			label: {show:false},
			labelLine: {show:false}
		},
		emphasis : {
			color: 'rgba(0,0,0,0)'
		}
	};
	var angle1=0;
	var angle2=359;
	var angle3=0;
	option = {
    series : [
        {
            name: '3',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 0,
            startAngle: angle1,
			endAngle: angle2,
			center: ['65%', '50%'],
			markLine:{
				symbol:'none',
				silent: true,
				lineStyle:{
					normal:{
						type:'solid'
					},
					emphasis:{
						type:'solid'
					}
				},
				textStyle:{
					fontSize: 12
				},
				data: [
					[
						//左上线
						{
							x: 40,
							y: dot1[1]-20,
							value: opts.title,
							label:{
								normal:{
									show:true,
									position:'middle'
								}
							},
							symbol:'emptycircle',
							lineStyle:{
								color:'#eee'
							}
						},
						{
							x: dot1[0]-20,
							y: dot1[1]-20
						}
					],
					[
						{
							x: dot1[0]-20,
							y: dot1[1]-20
						},
						{
							x: dot1[0],
							y: dot1[1]
						}
					],
					[
						//左中线
						{
							x: 20,
							y:dot2[1]-20,
							value:opts.title1,
							label:{
								normal:{
									show:true,
									position:'middle'
								}
							},
							symbol:'emptycircle',
							lineStyle:{
								color:'#eee'
							}
						},
						{
							//x: 100,
							//y: 140
							x:dot2[0]-20,
							y:dot2[1]-20
						}
					],
					[
						{
							//x: 100,
							//y: 140
							x:dot2[0]-20,
							y:dot2[1]-20
						},
						{
							//x: 115,
							//y: 160
							x:dot2[0],
							y:dot2[1]
						}
					],
					[	
						//左下线
						{
							x: 50,
							y: dot3[1]+20,
							value:opts.title2,
							label:{
								normal:{
									show:true,
									position:'middle'
								}
							},
							symbol:'emptycircle'
						},
						{
							x: dot3[0]-20,
							y: dot3[1]+20
						}
					],
					[
						{
							x: dot3[0]-20,
							y: dot3[1]+20
						},
						{
							x: dot3[0],
							y: dot3[1]
						}
					],
					[
						//右上线				
						{
							x: dot4[0],
							y: dot4[1],
							//value:'data',
						},
						{
							x: border_width-5,
							y: dot4[1]-20
						}
					],
					[
						//右下线
						{
							x: dot5[0],
							y: dot5[1]
						},
						{
							x: border_width-5,
							y: dot5[1]+20
						}
					]
				]
			},
            splitNumber: 7,
            radius: '45%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 0
                }
            },
            axisLabel:{
                show:false
            },
            axisTick: {            // 坐标轴小标记
                length: 8,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#008DE5',
                }
            },
			splitLine:{
				show:false
			},
            detail : {
                show:false,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            //data:[{value: 0}]
        },
		{
            name:'2',
            type:'pie',
			startAngle: angle3,
			hoverAnimation:false,
            clockWise:false,
			center: ['65%', '50%'],
            radius : ['30%', '35%'],
			itemStyle : dataStyle,
            data:[
                {
                    value:10,
                    name:'68%的人表示过的不错',
					itemStyle:{
						normal:{
							color:'#008DE5'
						}
					}
                },
                {
                    value:15,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                },
				{
                    value:25,
                    name:'68%的人表示过的不错',
					itemStyle:{
						normal:{
							color:'#008DE5'
						}
					}
                },
                {
                    value:10,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                },
				{
                    value:25,
                    name:'68%的人表示过的不错',
					itemStyle:{
						normal:{
							color:'#008DE5'
						}
					}
                },
                {
                    value:15,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        },
		{
            name: '速度',
            type: 'gauge',
            z: 2,
            min: 0,
            max: 0,
            startAngle: 0,
            endAngle: 359,
            splitNumber: 4,
            radius: '27%',
			center: ['65%', '50%'],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: -2,
					color:[[0.2,'#708DE5'],[0.8,'#108DE5'],[1,'#008DE5']]
                }
            },
            axisLabel:{
                show:false
            },
            axisTick: {            // 坐标轴小标记
                length: 2,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#008DE5',
					type:'dashed',
					width:3
                }
            },
			splitLine:{
				show:false
			},
            detail : {
                show:false,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            //data:[{value: 0}]
        },
		{
            name:'1',
            type:'pie',
			startAngle: 120,
			hoverAnimation:false,
            clockWise:false,
            radius : ['23%', '24%'],
			center: ['65%', '50%'],
			itemStyle : dataStyle,
            /*itemStyle : {
				normal: {
					label: {show:false},
					labelLine: {show:false}
				}
			},*/
            data:[
                {
                    value:10,
                    name:'68%的人表示过的不错',
					itemStyle:{
						normal:{
							color:'#008DE5'
						}
					}
                },
                {
                    value:20,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                },
				{
                    value:20,
                    name:'68%的人表示过的不错',
					itemStyle:{
						normal:{
							color:'#008DE5'
						}
					}
                },
                {
                    value:10,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                },
				{
                    value:20,
                    name:'68%的人表示过的不错',
					itemStyle:{
						normal:{
							color:'#008DE5'
						}
					}
                },
                {
                    value:20,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        }
    ]
	};
	setInterval(function () {
	
    for (var i = 0; i < 1; i++) {
		//var a=Math.random()*10;
        angle1=angle1+30;
		angle2=359+angle1;
		angle3=359+angle1;
    }

    myChart13.setOption({
		textStyle: {
			color: '#fff',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontFamily: 'sans-serif',
			fontSize: 12
		},
        series: [{
            startAngle: angle1,
			endAngle: angle2
        },{startAngle:angle3}]
    });
}, 150);
	myChart13.setOption(option);
}
/////////////////////////////////////////////////////////////////////////////////////////////
  
//左中图
function getEcharts_bar2(id,opts){
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart14 = echarts.init(document.getElementById(id));
	option = {
		/*title: {
			text: '最受欢迎的App排名',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#BFBFBF',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		color:['#48889A','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid:{
			//top:'6%',
			left: '5%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis:{
			type: 'category',
			data: data_list,
			axisTick: {
				alignWithLabel: false
			},
			axisLabel:{
				interval:0,
				rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			}
		},
		yAxis: {
			type: 'value',
			name:'下载量',
			nameTextStyle:{
				color:'#A09792'
			},
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				},
				formatter:function (value, index){
					var value1= parseInt(value);
					if(value1 >= 1000000){
						value1 = value1/1000000 + ' M';
					} else if(value1>=1000){
						value1=value1/1000+ ' K';
					}
					return value1;
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			}			
		},
		series:series_list
	};
	myChart14.setOption(option);
}

//左下图
function getEcharts_pie4(id,opts){
	var series_list = opts.data_val ;
	var series_list1 = opts.data_val1 ;
	var title = opts.title;
	var data_name = [];
	for(i=0;i<opts.data_val.length;i++){
		data_name.push(opts.data_val[i].name);
	}
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart15 = echarts.init(document.getElementById(id));
	option = {
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			orient : 'horizontal',
			x : 'center',
			//y:'center',
			data:data_name,
			itemWidth:10,
			itemHeight:10,
			textStyle:{
				color:'#eee'
			}
		},
		grid: {
			left: '3%',
			top: '10%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		series: [
			{
				name:'访问来源',
				type:'pie',
				//selectedMode: 'single',
				center: ['50%', '65%'],
				radius: [0, '30%'],
				label: {
					normal: {
						show:false
						//position: 'inner'
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data:series_list
			},
			{
				name:'访问来源',
				type:'pie',
				radius: ['35%', '50%'],
				center: ['50%', '65%'],
				data:series_list1
			}
		]
	};
	myChart15.setOption(option);
}

//右上图
function getEcharts_treemap(id,opts){
	var series_list = opts.data_val ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart16 = echarts.init(document.getElementById(id));
	option = {
		color:['#42a3ff','#85c6ff','#9dd3ff','#2694ff','#53acff','#a5d7ff','#74bdff'],
		/*title: {
			text: '最受欢迎的搜索关键字分布',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		series : [
			{
				//name:'最受欢迎的搜索关键字分布',
				type:'treemap',
				label:{
					normal:{
						show:true,
						textStyle:{
							fontFamily:'sans-serif'
						}
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}"
						},
						gapWidth:0,
						borderWidth: 1,
						borderColor:'#05173b',
						
						borderWidth: 1
					},
					emphasis: {
						label: {
							show: true
						}
					}
				},
				breadcrumb:{
                    show:false
                },
				data:series_list
			}
		]
	}
	myChart16.setOption(option);
}

//右中图
function getEcharts_bar(id, opts){
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart17 = echarts.init(document.getElementById(id)); 
	option = {
		/*title: {
			text: '最受欢迎的智能家居品牌分布',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#BFBFBF',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		color:['#48889A','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid:{
			top:'6%',
			left: '1%',
			right: '10%',
			bottom: '5%',
			containLabel: true
		},
		xAxis:{
			type: 'value',
			axisTick: {
				alignWithLabel: false
			},
			axisLabel:{
				interval: 0,
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				},
				formatter:function (value,index){
					var value1= parseInt(value);
					if(value1 >= 1000000){
						value1 = value1/1000000 + ' M';
					}
					else if(value1>=1000){
						value1=value1/1000+ ' K';
					}
					return value1;
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			}
		},
		yAxis: {
			type: 'category',
			data: data_list,
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1.5
				}
			}			
		},
		series:series_list
	};
	myChart17.setOption(option);
};

//右下图
function getEcharts_ciyun1(id,opts){
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//数据服务
//左上图
function getEcharts_pie5(id,opts){
	var series_list = opts.data_val ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart18 = echarts.init(document.getElementById(id)); 
	/*var data_list = opts.data ||
		[
			{value:535, name:'斗鱼'},
			{value:510, name:'360安全卫士'},
			{value:1034, name:'爱奇艺'},
			{value:1235, name:'QQ'},
			{value:1548, name:'微信'}
		];*/
	option = {
		//backgroundColor: 'rgba(130,130,130,0)',
		color:['#48899B','#63949B','#7C9F9B','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		/*title: {
			text: '各行业访问互联网的主机数量',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				label:{
					normal:{
						formatter:"{b}"+'\n'+"({d}%)"
					}  
				},
				radius: ['20%', '50%'],
				center: ['50%', '55%'],
				//roseType: 'radius',
				data:series_list
			}
		]
	};
	// 为echarts对象加载数据 
	myChart18.setOption(option);
} 

//左中图
function getEcharts_bar3(id,opts){
	var series_list = opts.data_val;
	var data_list = opts.data_name;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart19 = echarts.init(document.getElementById(id));
	option = {
		color:['#48899B','#63949B','#7C9F9B','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		tooltip : {
			/*title: {
				text: '工作相关流量和非工作相关流量统计',
	//                    subtext: '纯属虚构',
				textStyle: {
					fontSize : '14',
					fontFamily : '微软雅黑',
					fontWeight : 'normal',
					color: '#eee',
					textShadow: "0 0 2px #000000, 0 0 1px #000000"
				},
				x: 'center'
			},*/
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			top:'10%',
			left: '2%',
			right: '10%',
			bottom: '5%',
			containLabel: true
		},
		xAxis:  {
			type: 'value',
			//name:'百分比(%)',
			//nameLocation : 'middle',
			//nameGap: 20,
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				},
				formatter:function(value){
					return value+'%';
				}
			},
			splitLine:{
				show:false
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					//type:'dashed',
					width:1
				}
			}
		},
		yAxis: {
			type: 'category',
			data: data_list,
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					//type:'dashed',
					width:1
				}
			}
		},
		series: [
			{
				name: '工作相关流量',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'insideRight'
					}
				},
				data: series_list
			}
		]
	};
	myChart19.setOption(option);
}

//左下图
function getEcharts_line5(id,opts){
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart20 = echarts.init(document.getElementById(id));
	option = {
		color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		//backgroundColor: 'rgba(130,130,130,0)',
		/*title: {
			text: '各行业招聘行为趋势',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		tooltip: {
			trigger: 'axis'
		},
		grid:{
			left: '10%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: data_list,
			axisLabel: {
				show:true,
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif',
					//fontStyle:'normal',
					//fontWeight:'1',
				},
				formatter:function(value){
					return value.split("").join("\n");
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					//type:'dashed',
					width:1
				}
			}
		},
		yAxis: {
			type: 'value',
			name:'点击数(个)/天',
			nameTextStyle:{
				color:'#A09792'
			},
			axisLabel: {
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif'
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					width:1
				}
			},
			splitLine:{
				show:false,
				lineStyle:{
					color:'#334052'
				}
			}
		},
		series:[
			{
				name: '生产行为',
				type: 'line',
				//symbol:'none',
                stack: '总量',
				smooth: true,
				//areaStyle: {normal: {}},
				data: series_list
			}
		]
	};
	myChart20.setOption(option);
}

//右上图
function getEcharts_line6(id,opts){
	var series_list = opts.data_val;
	var series_list1 = opts.data_val1;
	var data_list = opts.data_name;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart21 = echarts.init(document.getElementById(id));
	option = {
		color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		//backgroundColor: 'rgba(130,130,130,0)',
		/*title: {
			text: '各行业招聘行为趋势',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		tooltip: {
			trigger: 'axis'
		},
		legend:{
			show:true
		},
		grid:{
			left: '10%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			data:data_list,
			/*axisLine: {
				onZero: false
			},*/
			axisLabel: {
				show:true,
				interval: 0,//横轴信息全部显示
				//rotate: 30,
				textStyle:{
					color:'#A09792',
					fontFamily:'sans-serif',
					fontStyle:'normal',
					fontWeight:'1',
				}
			},
			axisLine:{
				show:true,
				lineStyle:{
					color:'#4C596E',
					type:'dashed',
					width:1
				}
			}
		},
		yAxis: [
			{
				name:'时长',
				type: 'value',
				nameTextStyle:{
					color:'#A09792'
				},
				//max: 250,
				axisLabel: {
					interval: 0,//横轴信息全部显示
					//rotate: 30,
					textStyle:{
						color:'#A09792',
						fontFamily:'sans-serif',
						fontSize:1
					}
				},
				axisLine:{
					show:true,
					lineStyle:{
						color:'#4C596E',
						width:1
					}
				},
				splitLine:{
					show:false,
					lineStyle:{
						color:'#334052'
					}
				}
			},
			{	
				type: 'value',
				//max: 20,
				name: '人数',
				nameTextStyle:{
					color:'#A09792'
				},
				//inverse: true,
				axisLabel: {
					interval: 0,//横轴信息全部显示
					//rotate: 30,
					textStyle:{
						color:'#A09792',
						fontFamily:'sans-serif'
					}
				},
				axisLine:{
					show:true,
					lineStyle:{
						color:'#4C596E',
						width:1.5
					}
				},
				splitLine:{
					show:false,
					lineStyle:{
						color:'#334052'
					}
				}			
			}
		],
		series:[
			{
				name: '时长',
				type: 'line',
				//symbol:'none',
                //stack: '总量',
				smooth: true,
				//areaStyle: {normal: {}},
				data: series_list
			},
			{
				name: '人数',
				type: 'bar',
				//symbol:'none',
				yAxisIndex:1,
                //stack: '总量',
				smooth: true,
				//areaStyle: {normal: {}},
				data: series_list1
			}
		]
	};
	myChart21.setOption(option);
}

//右中图
function getEcharts_treemap1(id,opts){
	var series_list = opts.data_val ;
	var data_list = opts.data_name ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var myChart22 = echarts.init(document.getElementById(id));
	option = {
		color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
		/*title: {
			text: '各行业访问网站类型',
//                    subtext: '纯属虚构',
			textStyle: {
				fontSize : '14',
				fontFamily : '微软雅黑',
				fontWeight : 'normal',
				color: '#eee',
				textShadow: "0 0 2px #000000, 0 0 1px #000000"
			},
			x: 'center'
		},*/
		series : [
			{
				name:'各行业访问网站类型',
				type:'treemap',
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}"
						},
						borderWidth: 1
					},
					emphasis: {
						label: {
							show: true
						}
					}
				},
				data:[
					{
						name: '门户',
						value: 6
					},
					{
						name: '购物',
						value: 4
					},
					{
						name: '旅游',
						value: 4
					},
					{
						name: '科技',
						value: 2
					},
					{
						name: '汽车',
						value: 2
					},
					{
						name: '社交',
						value: 1
					},
					{
						name: '金融',
						value: 1
					}
				]
			}
		]
	}
	myChart22.setOption(option);
}

// 右下图
function getEcharts_ciyun2(id,opts){
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 绘制中国地图的图形

var geoCoordMap = {
    '上海': [121.4648,31.2891],
	'东莞': [113.8953,22.901],
	'东营': [118.7073,37.5513],
	'中山': [113.4229,22.478],
	'临汾': [111.4783,36.1615],
	'临沂': [118.3118,35.2936],
	'丹东': [124.541,40.4242],
	'丽水': [119.5642,28.1854],
	'乌鲁木齐': [87.9236,43.5883],
	'佛山': [112.8955,23.1097],
	'保定': [115.0488,39.0948],
	'兰州': [103.5901,36.3043],
	'包头': [110.3467,41.4899],
	'北京': [116.4551,40.2539],
	'北海': [109.314,21.6211],
	'南京': [118.8062,31.9208],
	'南宁': [108.479,23.1152],
	'南昌': [116.0046,28.6633],
	'新余': [114.5, 24.7], 
	'抚州': [115.9, 27.1],
	'南通': [121.1023,32.1625],
	'厦门': [118.1689,24.6478],
	'台州': [121.1353,28.6688],
	'合肥': [117.29,32.0581],
	'呼和浩特': [111.4124,40.4901],
	'咸阳': [108.4131,34.8706],
	'哈尔滨': [127.9688,45.368],
	'唐山': [118.4766,39.6826],
	'嘉兴': [120.9155,30.6354],
	'大同': [113.7854,39.8035],
	'大连': [122.2229,39.4409],
	'天津': [117.4219,39.4189],
	'太原': [112.3352,37.9413],
	'威海': [121.9482,37.1393],
	'宁波': [121.5967,29.6466],
	'宝鸡': [107.1826,34.3433],
	'宿迁': [118.5535,33.7775],
	'常州': [119.4543,31.5582],
	'广州': [113.5107,23.2196],
	'廊坊': [116.521,39.0509],
	'延安': [109.1052,36.4252],
	'张家口': [115.1477,40.8527],
	'徐州': [117.5208,34.3268],
	'德州': [116.6858,37.2107],
	'惠州': [114.6204,23.1647],
	'成都': [103.9526,30.7617],
	'扬州': [119.4653,32.8162],
	'承德': [117.5757,41.4075],
	'拉萨': [91.1865,30.1465],
	'无锡': [120.3442,31.5527],
	'日照': [119.2786,35.5023],
	'昆明': [102.9199,25.4663],
	'杭州': [119.5313,29.8773],
	'枣庄': [117.323,34.8926],
	'柳州': [109.3799,24.9774],
	'株洲': [113.5327,27.0319],
	'武汉': [114.3896,30.6628],
	'汕头': [117.1692,23.3405],
	'江门': [112.6318,22.1484],
	'沈阳': [123.1238,42.1216],
	'沧州': [116.8286,38.2104],
	'河源': [114.917,23.9722],
	'泉州': [118.3228,25.1147],
	'泰安': [117.0264,36.0516],
	'泰州': [120.0586,32.5525],
	'济南': [117.1582,36.8701],
	'济宁': [116.8286,35.3375],
	'海口': [110.3893,19.8516],
	'淄博': [118.0371,36.6064],
	'淮安': [118.927,33.4039],
	'深圳': [114.5435,22.5439],
	'清远': [112.9175,24.3292],
	'温州': [120.498,27.8119],
	'渭南': [109.7864,35.0299],
	'湖州': [119.8608,30.7782],
	'湘潭': [112.5439,27.7075],
	'滨州': [117.8174,37.4963],
	'潍坊': [119.0918,36.524],
	'烟台': [120.7397,37.5128],
	'玉溪': [101.9312,23.8898],
	'珠海': [113.7305,22.1155],
	'盐城': [120.2234,33.5577],
	'盘锦': [121.9482,41.0449],
	'石家庄': [114.4995,38.1006],
	'福州': [119.4543,25.9222],
	'秦皇岛': [119.2126,40.0232],
	'绍兴': [120.564,29.7565],
	'聊城': [115.9167,36.4032],
	'肇庆': [112.1265,23.5822],
	'舟山': [122.2559,30.2234],
	'苏州': [120.6519,31.3989],
	'莱芜': [117.6526,36.2714],
	'菏泽': [115.6201,35.2057],
	'营口': [122.4316,40.4297],
	'葫芦岛': [120.1575,40.578],
	'衡水': [115.8838,37.7161],
	'衢州': [118.6853,28.8666],
	'西宁': [101.4038,36.8207],
	'西安': [109.1162,34.2004],
	'贵阳': [106.6992,26.7682],
	'连云港': [119.1248,34.552],
	'邢台': [114.8071,37.2821],
	'邯郸': [114.4775,36.535],
	'郑州': [113.4668,34.6234],
	'鄂尔多斯': [108.9734,39.2487],
	'重庆': [107.7539,30.1904],
	'金华': [120.0037,29.1028],
	'铜川': [109.0393,35.1947],
	'银川': [106.3586,38.1775],
	'镇江': [119.4763,31.9702],
	'长春': [125.8154,44.2584],
	'长沙': [113.0823,28.2568],
	'长治': [112.8625,36.4746],
	'阳泉': [113.4778,38.0951],
	'青岛': [120.4651,36.3373],
	'韶关': [113.7964,24.7028]
};
function getEcharts_map1(id, opts){
	var series_list = opts.data_val;
	var show_val = get_map_val(opts);
            // --- 地图 ---
var myChart23 = echarts.init(document.getElementById(id));

var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

var color = ['#46bee9'];
var series = [];
[['苏州', series_list]].forEach(function (item, i) {
    series.push({
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color: '#eee',
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 10
        },
        lineStyle: {
            normal: {
                color: '#46bee9',
				//color:color[i]
                width: 1,
                opacity: 0.4,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + ' Top10',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            //brushType: 'fill',
			brushType:'stroke',
			period:6,
			scale:10
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
				textStyle:{
					color:'#eee'
				}
            }
        },
        symbolSize: function (val) {
            return val[1] / 8;
        },
        itemStyle: {
            normal: {
                color: color[i]
            }
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
            };
        })
    });
});

option = {
    //backgroundColor: '#404a59',
    title : {
        text: '企业网络服务全国分布图',
        //subtext: '数据纯属虚构',
        right: '10%',
        textStyle : {
            color: '#eee',
			fontWeight:'normal'
        },
		top:'10%'
    },
    tooltip : {
        trigger: 'item'
    },
    /*legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data:['苏州 Top10'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'single'
    },*/
    geo: {
        map: 'china',
		center: [120.6519,31.3989],
		zoom:5,
        label: {
			normal:{
				textStyle:{
					//show:true,
					//color:'red'
				}
			},
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#5580AA',
                borderColor: '#155ED1'
            },
            emphasis: {
                areaColor: '#5580AA'
            }
        }
    },
    series: series
};
	myChart23.clear();
	myChart23.setOption(option);
}


//地图
function getEcharts_map2(id, opts){
	var series_list = opts.data_val;
	var show_val = get_map_val(opts);
            // --- 地图 ---
	var myChart24 = echarts.init(document.getElementById(id));


var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

var color = ['#46bee9'];
var series = [];
[['苏州', series_list]].forEach(function (item, i) {
    series.push({
        name: item[0],
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0],
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 10
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 1,
                opacity: 0.4,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0],
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            //brushType: 'fill',
			brushType:'stroke',
			period:6,
			scale:10
        },
        label: {
            normal: {
                show: true,
				textStyle:{
					color:'#eee'
				},
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[1] / 8;
        },
        itemStyle: {
            normal: {
                color: color[i]
            }
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
            };
        })
    });
});

option = {
    //backgroundColor: '#404a59',
	//color:['#FFD79C','#F7AC82','#48899A','#95AA9B','#B2B69B','#E4CC9C','#FFE1BB'],
    title : {
        text: '插件化服务全国分布图',
        //subtext: '数据纯属虚构',
		left: '5%',
        textStyle : {
            color: '#eee',
			fontWeight:'normal'
        },
		top:'85%'
    },
	visualMap: {
        min: 0,
        max: 1000000,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],           // 文本，默认为数值文本
		calculable : true,
        //color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
        textStyle:{
            color:'#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    /*legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data:['苏州'],
        textStyle: {
            color: '#fff'
        },
        //selectedMode: 'single'
    },*/
    geo: {
        map: 'china',
		zoom: 1.2,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#5580AA',
                borderColor: '#155ED1'
            },
            emphasis: {
                areaColor: '#5580AA'
            }
        }
    },
    series: series
};
	myChart24.clear();
	myChart24.setOption(option);
}
//转换，暂时无用
function get_map_val(opts){
	var v = [];
	for(var r in opts.distr){
		v.push([{'name':opts.distr[r].name}, {name:opts.dest, 'value':opts.distr[r].value}]);
	}
	return v;
};

//标签云 方案一
function zzsc(id,opts){
	var series_list = opts.data_val ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var main_subopts6=
			'<canvas id="mtCanvas" height="160" width="200"></canvas>'+
			'<div id="canvas_data"></div>';
	/*main_subopts6 += 
		'<a href="http://sc.chinaz.com" target="_blank", rel="12">起名取名</a>' + 
		'<a href="http://sc.chinaz.com" target="_blank", rel="2">宣传策划</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="25">网游试玩</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="29">短信表白</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="32">卡片设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="98">网页设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="57">SEO优化</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="72">外语翻译</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="31">产品推广</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="67">网络营销</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="45">动漫设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="74">招聘求职</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="41">家居装修</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="86">影视创作</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="81">照片美化</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="16">产品设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="62">包装设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="7">Logo设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="9">海报设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="14">程序开发</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="18">站长素材</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="25">微博营销</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="37">网站开发</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="44">宣传品设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="48">配音配词</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="15">产品推广</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="83">网络营销</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="17">动漫设计</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="67">招聘求职</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="19">家居装修</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="54">影视创作</a> ' +
		'<a href="http://sc.chinaz.com" target="_blank", rel="14">照片美化</a>';*/
	$("#"+id+"").html(main_subopts6);
	$("#canvas_data").html(series_list);
	//$("#myCanvas").css({'height':(window.screen.width/16*9/100*33-30)});
	//if($('#tags').val().length>0){
	try {
		var i, et = document.getElementById("canvas_data").childNodes;
		//console.log(et);
		for (i in et) {
			et[i].nodeName == 'A' && et[i].addEventListener('click', function (e) {
				//console.log(et[i]);
				e.preventDefault();
			});
		}

		TagCanvas.Start('mtCanvas', 'canvas_data', {
			textColour: '#58feff',
			outlineColour: '#1762EF',
			reverse: true,
			depth: 0.8,
			dragControl: true,
			decel:0.95,
			maxSpeed: 0.05,
			initial: [-0.2, 0]
		});
	} catch (e) {
		// something went wrong, hide the canvas container
		//document.getElementById('myCanvasContainer').style.display = 'none';
	}
}
	//$("#canvas_data").css({"display":'none'});
	//}else{
	//}
//标签云 方案二
function getjqcloud(id,opts){
	var series_list = opts.data_val ;
	var title = opts.title;
	
	var mt=id.split('_data');
	$("#"+mt[0]+"_title").html('<p>'+title+'</p>');
	$("#"+mt[0]+"_title p").css({'font-size':14+'px','margin-left':'6%','height':'100%','line-height':'27px'});
	var string_ = "";
	for (var i = 0; i < series_list.length; i++) {
		var string_f = series_list[i][0];
		var string_n = series_list[i][1];
		string_ += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list'}},";
	}

	/*function on_mouseover(e, ev) {
		var txt = $(e).html();
		ev = ev || event;
		$.each(jquery_data, function(i, item) {
			if(txt == item[0]){
				var html = item[0]+"<br />曝光数"+item[1]+"<br />"+item[2];
				$("#"+jqcloud+"").after("<div class='append_div' style='left:" + ev.clientX + "px; top:" + ev.clientY + "px; '>" + html + "</div>");
				return;
			}
			
		});
	}*/
	
	var string_list = string_;
	var word_list = eval("[" + string_list + "]");
	$(function() {
		$("#"+id+"").jQCloud(word_list);
	});
	/*function on_mouseout() {
		$(".append_div").remove();
	}*/
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 绘制3D立方体的图形

//定义画布宽高和生成点的个数
var WIDTH = 200, HEIGHT = 200, POINT = 20;
var LINEOPAC = 0.1;
var image;


function cube(id, m_opts)
{
	var sub_id = m_opts.name||"box3D_";
	var canvas_id = sub_id+'canvas';
	var box3D_html = ' <div id="'+sub_id+'"> \
					<div class="'+sub_id+'_front" id="'+sub_id+'front"><canvas id="'+canvas_id+'"></canvas></div> \
					<div class="'+sub_id+'_back"></div> \
					<div class="'+sub_id+'_top"><p class="'+sub_id+'p_online_user">用户数 1802341</p></div> \
					<div class="'+sub_id+'_bottom"></div> \
					<div class="'+sub_id+'_left"></div> \
					<div class="'+sub_id+'_right"></div> \
				</div> ';
	var oBox_out = document.getElementById(id);
	oBox_out.innerHTML = m_opts.html || box3D_html;
	var oBox = document.getElementById(sub_id);
	var y=-60;
	var x=45;
	oBox.onmousedown=function(ev)
	{
		var oEvent=ev||event;
		var disX=oEvent.clientX-y;
		var disY=oEvent.clientY-x;
		oBox.onmousemove=function(ev)
		{
			var oEvent=ev||event;
			x=oEvent.clientY-disY;
			y=oEvent.clientX-disX;
			oBox.style.transform='perspective(800px) rotateX('+x+'deg) rotateY('+y+'deg)';
			m_opts.initial_x=x;
			m_opts.initial_y=y;
		};
		oBox.onmouseup=function()
		{
			oBox.onmousemove=null;
			oBox.onmouseup=null;
			m_opts.cube3d_active = !m_opts.cube3d_active;
		};
		return false;
	};
	
	m_opts.initial_x=x;
	m_opts.initial_y=y;
	m_opts.cube3d_active = true;
	
	var canvas = document.getElementById(canvas_id);
	canvas.width = m_opts.width = m_opts.width || WIDTH;
	canvas.height = m_opts.height = m_opts.width || HEIGHT;
	context = canvas.getContext('2d');
	context.strokeStyle = 'rgba(0,0,0,0.05)',
	context.strokeWidth = 1,
	context.fillStyle = 'rgba(0,0,0,0.2)';
	
	m_opts.canvas = canvas;
	m_opts.circleArr = [];
	
	/* 2.2.3.1 3D旋转立方体的配置 */
	
	
	$("."+sub_id+"_front").css({
		transform: 'translateZ('+ m_opts.width/2 +'px)',
		background: 'url(./images/a5.png)'
	});
	$("."+sub_id+"_back").css({
		transform: 'translateZ(-' + m_opts.width/2 + 'px)',
		background: 'url(./images/a1.png)'
	});
	$("."+sub_id+"_left").css({
		transform: 'translateX(-' + m_opts.width/2 +'px) rotateY(90deg)',
		background: 'url(./images/a2.png)'
	});
	$("."+sub_id+"_right").css({
		transform: 'translateX(' + m_opts.width/2 + 'px) rotateY(90deg)',
		background: 'url(./images/a3.png)'
	});
	$("."+sub_id+"_top").css({
		transform: 'translateY(-' + m_opts.width/2 +'px) rotateX(90deg)',
		background: 'url(./images/a4.png)'
	});
	$("."+sub_id+"_bottom").css({
		transform: 'translateY(' + m_opts.width/2 +'px) rotateX(90deg)',
		background: 'url(./images/a6.png)'
	});
	$("."+sub_id+"p_online_user").css({
		textAlign: "center",
		color: "#DD0000",
		fontSize: Math.floor(m_opts.width / 10) +"px",
		width: "100%",
		background: "#909090",	
		position: 'relative',
		top: '70px'
	});
	$("."+sub_id+"p_online_user").innerHTML = '用户数 288888';

	$("#"+sub_id+"").css({
		width: m_opts.width+'px',
		height: m_opts.width+'px',
		margin: Math.ceil(m_opts.width*21/40) +'px'+' auto',
		background: "#ccc",
		position: "relative",
		transform: 'perspective(800px) rotateY(-60deg) rotateX(45deg)',
		transformStyle: 'preserve-3d'
	});	
	$("#"+sub_id+" div").css({
		width:'100%',
		height:'100%',
		position: 'absolute',
		top:'0',
		left: '0',
		backgroundSize:'cover',
		"-webkit-box-shadow": '0 0 100px #5fbcff',
		opacity: '.9'
	});
	
	init_nest_canvas(context, m_opts);
	
	setInterval(update, m_opts.rotate_speed||100, sub_id, m_opts);
	
};

function update(id, m_opts)
{
	if(m_opts.cube3d_active){
		var oBox=document.getElementById(id);
		m_opts.initial_x=m_opts.initial_x+1;
		m_opts.initial_y=m_opts.initial_y+1;
		oBox.style.transform='perspective(800px) rotateX('+m_opts.initial_x+'deg) rotateY('+m_opts.initial_y+'deg)';
	};
};

// 绘制canvas network
function draw_nest(ctx, m_opts){
	for (var i = 0; i < POINT; i++) {
		var cir = m_opts.circleArr[i];
		cir.x += cir.moveX;
		cir.y += cir.moveY;
		if (cir.x > m_opts.width) cir.x = 0;
		else if (cir.x < 0) cir.x = m_opts.width;
		if (cir.y > m_opts.height) cir.y = 0;
		else if (cir.y < 0) cir.y = m_opts.height;
	}
	draw_nest_canvas(ctx, m_opts);
};

//线条：开始xy坐标，结束xy坐标，线条透明度
function Line (x, y, _x, _y, o) {
	this.beginX = x;
	this.beginY = y;
	this.closeX = _x;
	this.closeY = _y;
	this.o = o;
};
//点：圆心xy坐标，半径，每帧移动xy的距离
function Circle(x, y, r, moveX, moveY) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.moveX = moveX;
	this.moveY = moveY;
};
//生成max和min之间的随机数
function num(max, _min) {
	var min = arguments[1] || 0;
	return Math.floor(Math.random()*(max-min+1)+min);
};
// 绘制原点
function drawCricle(cxt, x, y, r, moveX, moveY) {
	var circle = new Circle(x, y, r, moveX, moveY);
	//cxt.fillStyle = 'rgba('+random_val(0,255).toString(16)
	//	+','+random_val(0,255).toString(16)
	//	+','+random_val(0,255).toString(16)
	//	+', 0.2)';
	cxt.beginPath();
	cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
	cxt.closePath();
	cxt.fill();
	return circle;
};
function random_val(v_min, v_max) {
	var val = Math.ceil(Math.random() * v_max);
	val = val<v_min ? v_min:val;
	return val;
};
//绘制线条
function drawLine(cxt, x, y, _x, _y, o) {
	var line = new Line(x, y, _x, _y, o);
	cxt.beginPath();
	//cxt.strokeStyle = 'rgba('+random_val(0,255).toString(16)
	//	+','+random_val(0,255).toString(16)
	//	+','+random_val(0,255).toString(16)
	//	+','+ o +')';
	cxt.strokeStyle = 'rgba(0,0,0,'+ o +')';
	cxt.moveTo(line.beginX, line.beginY);
	cxt.lineTo(line.closeX, line.closeY);
	cxt.closePath();
	cxt.stroke();
};


//初始化生成原点
function init_nest_canvas(l_cxt, m_opts) {
	m_opts.circleArr = [];
	for (var i = 0; i < POINT; i++) {
		m_opts.circleArr.push(drawCricle(l_cxt, num(m_opts.width), num(m_opts.height), num(15, 2), num(10, -10)/40, num(10, -10)/40));
	}
	draw_nest_canvas(l_cxt, m_opts);
	setInterval(draw_nest, m_opts.draw_speed||20, context, m_opts);
};

//每帧绘制
function draw_nest_canvas(l_cxt, m_opts) {
	l_cxt.clearRect(0,0, m_opts.canvas.width, m_opts.canvas.height);
	for (var i = 0; i < POINT; i++) {
		drawCricle(l_cxt, m_opts.circleArr[i].x, m_opts.circleArr[i].y, m_opts.circleArr[i].r);
	}
	for (var i = 0; i < POINT; i++) {
		for (var j = 0; j < POINT; j++) {
			if (i + j < POINT) {
				var A = Math.abs(m_opts.circleArr[i+j].x - m_opts.circleArr[i].x),
					B = Math.abs(m_opts.circleArr[i+j].y - m_opts.circleArr[i].y);
				var lineLength = Math.sqrt(A*A + B*B);
				var C = 1/lineLength*10;
				var lineOpacity = C > LINEOPAC ? LINEOPAC : C;
				if (lineOpacity > 0) {
					drawLine(l_cxt, m_opts.circleArr[i].x, m_opts.circleArr[i].y, m_opts.circleArr[i+j].x, m_opts.circleArr[i+j].y, lineOpacity);
				}
			}
		}
	}
};


