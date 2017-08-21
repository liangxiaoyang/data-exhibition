
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 绘制主界面幻灯切换 */
// 切换时间
SWIFTTIME = 60000


$(function(){
		$("#gla_box").flipster({
			itemContainer: 			'ul', // Container for the flippin' items.
			itemSelector: 			'li', // Selector for children of itemContainer to flip
			style:							'carousel', // Switch between 'coverflow' or 'carousel' display styles
			start: 							0, // Starting item. Set to 0 to start at the first, 'center' to start in the middle or the index of the item you want to start with.
			
			enableKeyboard: 		true, // Enable left/right arrow navigation
			enableMousewheel: 	true, // Enable scrollwheel navigation (up = left, down = right)
			enableTouch: 				true, // Enable swipe navigation for touch devices
			
			enableNav: 					true, // If true, flipster will insert an unordered list of the slides
			enableNavButtons: 	true, // If true, flipster will insert Previous / Next buttons
			
			onItemSwitch: 			function(){}, // Callback function when items are switches
			swiftTime:   SWIFTTIME,
		});
		$("#left_top").css({'height':(window.screen.width/16*9/100*29-4)+"px"});
		//$("#left_top").css({'width':(305)+"px"});
		$("#left_mid").css({'height':(window.screen.width/16*9/10*3)+"px"});
		$("#left_bottom").css({'height':(window.screen.width/16*9/100*32-0.5)+"px"});
		$("#right_top").css({'height':(window.screen.width/16*9/100*29-1)+"px"});
		$("#right_mid").css({'height':(window.screen.width/16*9/10*3-4)+"px"});
		$("#right_bottom").css({'height':(window.screen.width/16*9/100*32)+"px"});
		$("#rotatediv").css({'height':(window.screen.width/16*9/100*32-1)+"px"});
		$("#gla").css({'height':(window.screen.width/16*9/2-23)+"px"});
		$("#gla").css({'height':(window.screen.width/16*9/2-25)+"px"});
		$("#gla_inbox1").css({'height':(window.screen.width/16*9/2-27)+"px"});
		$("#gla_inbox2").css({'height':(window.screen.width/16*9/2-27)+"px"});
		$("#gla_inbox3").css({'height':(window.screen.width/16*9/2-57)+"px"});
		//$("#gla_inbox1").css({'width':(window.screen.width/3+100)+"px"});
		//$("#gla_inbox2").css({'width':(window.screen.width/3+100)+"px"});
		//$("#gla_inbox3").css({'width':(window.screen.width/3+100)+"px"});
		$("#gla_inbox1").css({'width':(window.screen.width/9*4-10)+"px"});
		$("#gla_inbox2").css({'width':(window.screen.width/9*4-10)+"px"});
		$("#gla_inbox3").css({'width':(window.screen.width/9*4-10)+"px"});
	});
// 扩展参数表
var m_extend = function(obj1, obj2){
	for(var k in obj2) {
		if(obj1.hasOwnProperty(k) && typeof obj1[k] == 'object') {
			m_extend(obj1[k], obj2[k]);
		} else {
			obj1[k] = obj2[k];
		}
	}
}

function int_strfmt(num, mlen)
{
	var ret_val = '';
    s_num = '' + num;
	if(s_num.length<mlen){
		for(var i=0;i<mlen-s_num.length; i++){
			ret_val += '0';
		}
		ret_val += s_num;
	}
	return ret_val;
}

// 更新设备安装数量，位于顶部中间
function renew_dev_number(){
	get_dev_data_all();
	odometer1.innerHTML = int_strfmt(g_dev_num.dpi_number, 10);
	odometer3.innerHTML = int_strfmt(g_dev_num.tg_number, 5); 
}
//更新中间地图
function renew_map_tm(){
	$("#gla_inbox1").empty();
	$("#gla_inbox2").empty();
	$("#gla_inbox3").empty();
	
	draw_slide_main("gla_inbox1", "echart_map1", g_main.main_tg_map);
	draw_slide_main("gla_inbox2", "echart_map2", g_main.main_dpi_map);
	getEcharts_scatter("gla_inbox3",g_main.main_data_bar);
}
// 更新描述信息，位于底部中间
function renew_description(){
	getDescription("gaugetop_right",g_description.map_center_left_top);
	getDescription("gaugemid_right",g_description.map_center_left_mid);
	getDescription("gaugebottom_right",g_description.map_center_left_bottom);

	getDescription("bottomdiv_top",g_description.map_right_right_top);
	getDescription("bottomdiv_bottom",g_description.map_right_right_bottom);
	getEcharts_line3("rotatediv_center",g_description.trends_line);
	//$("#bottomdiv_left").empty();
	//getEcharts_gauge2("bottomdiv_left",g_description.map_right_left);
}

//更新为智慧宽带界面
function renew_tg(opts)
{
	// 主界面	
	/*if ( g_dev_distr.tg_main != null && g_dev_distr.tg_main_renewed ){
		draw_slide_map1("gla_inbox1", "echart_map1", g_tg_info.tg_map);
		g_dev_distr.tg_main_renewed = false;
	};*/
	//$("#gla_inbox1").css({'background':'url("../css/center_bac.png")'});
	// 底部界面
	//m_extend(opts, g_dev_num.data_size);
	//getHighchart_linearGradient("nocanvas_bot_div", opts);
	//先清空div
	$("#left_top_data").empty();
	$("#left_mid_data").empty();
	$("#left_bottom_data").empty();
	$("#right_top_data").empty();
	$("#right_mid_data").empty();
	$("#right_bottom_data").empty();
	//清空名称
	$("#left_top_title").empty();
	$("#left_mid_title").empty();
	$("#left_bottom_title").empty();
	$("#right_top_title").empty();
	$("#right_mid_title").empty();
	$("#right_bottom_title").empty();
	// 各子界面
	getEcharts_pie2("left_top_data", g_tg_info.tg_industry_info);
	getEcharts_area("left_mid_data", g_tg_info.tg_work_time_info);
	getEcharts_pie3("left_bottom_data", g_tg_info.tg_access_device_info);
	getEcharts_treemap("right_top_data",g_tg_info.tg_data_flow_info);
	getEcharts_bar1("right_mid_data", g_tg_info.tg_fluid_control_info);
	getEcharts_line4("right_bottom_data", g_tg_info.tg_speed_up_info);
	//getjqcloud("right_bottom_data",g_tg_info.tg_data_flow_info);
}

//更新为插件化DPI界面
function renew_plugin(opts)
{
	// 主界面
	/*if ( g_dev_distr.dpi_main != null && g_dev_distr.dpi_main_renewed ){
		getEcharts_map2("gla_inbox2", "echart_map", g_dpi_info.app_map);
		g_dev_distr.dpi_main_renewed = false;
	}*/
	
	// 底部界面
	opts.id = 1;
	opts.score = 980;
	opts.width = 950;
	opts.height = 360;
	//先清空div
	$("#left_top_data").empty();
	$("#left_mid_data").empty();
	$("#left_bottom_data").empty();
	$("#right_top_data").empty();
	$("#right_mid_data").empty();
	$("#right_bottom_data").empty();
	//清空名称
	$("#left_top_title").empty();
	$("#left_mid_title").empty();
	$("#left_bottom_title").empty();
	$("#right_top_title").empty();
	$("#right_mid_title").empty();
	$("#right_bottom_title").empty();
	// 各子界面
	getEcharts_pie("left_top_data", g_dpi_info.dpi_appinfo_info);
	getEcharts_bar2("left_mid_data", g_dpi_info.dpi_appranking_info);
	getEcharts_pie4("left_bottom_data", g_dpi_info.dpi_termdevtype_info);
	zzsc("right_top_data", g_dpi_info.dpi_keyword_info);
	getEcharts_pictorialBar("right_mid_data", g_dpi_info.dpi_smarthome_factory_info);
	getEcharts_bar("right_bottom_data",g_dpi_info.dpi_smarthome_type_info);
	// 各子界面
	/*if( g_app_info.appinfo !== null && g_app_info.appinfo_renewed ){
		getEcharts_pie("left_top", g_app_info.appinfo);
		g_app_info.appinfo_renewed = false;
	};
	
	if( g_app_info.appgrpinfo !== null && g_app_info.appgrpinfo_renewed ){
		getEcharts_bar2("left_mid", g_app_info.appgrpinfo);
		g_app_info.appgrpinfo_renewed = false;
	};
	
	if( g_app_info.termdevtype !== null && g_app_info.termdevtype_renewed ){
		getEcharts_pie4("left_bottom", g_app_info.termdevtype);
		g_app_info.termdevtype_renewed = false;
	};
	
	if ( g_dev_distr.dpi_devtrend !== null && g_dev_distr.dpi_devtrend_renewed ){
		getEcharts_treemap("right_top", g_dev_distr.dpi_devtrend);
		g_dev_distr.dpi_devtrend_renewed = false;
	};
	
	if( g_app_info.termdev_phonebrand !== null && g_app_info.termdev_phonebrand_renewed ){
		getEcharts_bar("right_mid", g_app_info.termdev_phonebrand);
		g_app_info.termdev_phonebrand_renewed = false;
	};
	
	if( g_app_info.kw !== null && g_app_info.kw_renewed){
		zzsc("right_bottom", g_app_info.kw);
		g_app_info.kw_renewed = false;
	};*/
}

//更新为数据分析界面
function renew_dataanalysis(opts)
{
	// 主界面
	//draw_canvas_bottom('canvas_bot', opts);
	//先清空div
	$("#left_top_data").empty();
	$("#left_mid_data").empty();
	$("#left_bottom_data").empty();
	$("#right_top_data").empty();
	$("#right_mid_data").empty();
	$("#right_bottom_data").empty();
	//清空名称
	$("#left_top_title").empty();
	$("#left_mid_title").empty();
	$("#left_bottom_title").empty();
	$("#right_top_title").empty();
	$("#right_mid_title").empty();
	$("#right_bottom_title").empty();
	// 主界面更新
	getEcharts_scatter("gla_inbox3", g_main.main_data_bar)
	// 各子界面
	getEcharts_pie5("left_top_data", g_data_info.data_host_average_info);
	getEcharts_bar3("left_mid_data", g_data_info.data_work_flow_info);
	getEcharts_line5("left_bottom_data", g_data_info.data_recruit_behavior_info);
	getEcharts_line6("right_top_data", g_data_info.data_over_work_info);
	getEcharts_treemap("right_mid_data", g_data_info.data_access_web_info);
	zzsc("right_bottom_data", g_data_info.data_access_ITweb_info);
}
/* 这是绘制幻灯切换的每一个页面 */
function draw_slide_main(id, type, opts)
{
	if(type=='echart_map1'){
		getEcharts_map1(id, opts);
	}
	if(type=='echart_map2'){
		getEcharts_map2(id, opts);
	}
};

