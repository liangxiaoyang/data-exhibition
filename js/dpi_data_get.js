/*
	从后台数据库中通过webservice接口获取需要显示的DPI数据，并更新存储在全局结构中
*/

//设备数据，用户数定义
var g_dev_num = {
	tg_number: 0,
	dpi_number: 0,
	user_number: 0,
	//data_size: null,
	//data_size_renewed: false
};
//中间主要参数定义
var g_main = {
	//tg地图参数定义
	main_tg_map: null,
	main_tg_map_renewed: false,
	//dpi地图相关参数
	main_dpi_map: null,
	main_dpi_map_renewed: false,
	//数据服务相关参数
	main_data_bar: null,
	main_data_bar_renewed: false,
};
//中间底部参数定义
var g_description = {
	//底部左侧
	map_center_left_top: null,
	map_center_left_top_renewed: false,
	map_center_left_mid: null,
	map_center_left_mid_renewed: false,
	map_center_left_bottom: null,
	map_center_left_bottom_renewed: false,
	//底部右侧图形参数定义
	map_right_left: null,
	map_right_left_renewed: false,
	map_right_right_top: null,
	map_right_right_top_renewed: false,
	map_right_right_bottom: null,
	map_right_right_bottom_renewed: false,
	trends_line: null,
	trends_line_renewed: false,
};
// 1. 智慧宽带相关全局变量
var g_tg_info = {
	tg_industry_info:null,
	tg_industry_renewed:false,
	tg_work_time_info:null,
	tg_work_time_renewed:false,
	tg_access_device_info:null,
	tg_access_device_renewed:false,
	tg_data_flow_info:null,
	tg_data_flow_renewed:false,
	tg_fluid_control_info:null,
	tg_fluid_control_renewed:false,
	tg_speed_up_info:null,
	tg_speed_up_renewed:false
};

// 2. 插件化DPI相关全局变量
var g_dpi_info = {
	dpi_appinfo_info:null,
	dpi_appinfo_renewed:false,
	dpi_appranking_info:null,
	dpi_appranking_renewed:false,
	dpi_termdevtype_info:null,
	dpi_termdevtype_renewed:false,
	dpi_keyword_info:null,
	dpi_keyword_renewed:false,
	dpi_smarthome_factory_info:null,
	dpi_smarthome_factory_renewed:false,
	dpi_smarthome_type_info:null,
	dpi_smarthome_type_renewed:false
};

// 3. 数据分析相关全局变量
var g_data_info = {
	data_host_average_info:null,
	data_host_average_renewed:false,
	data_work_flow_info:null,
	data_work_flow_renewed:false,
	data_recruit_behavior_info:null,
	data_recruit_behavior_renewed:false,
	data_over_work_info:null,
	data_over_work_renewed:false,
	data_access_web_info:null,
	data_access_web_renewed:false,
	data_access_ITweb_info:null,
	data_access_ITweb_renewed:false
};



////////////////////////////////////////////////////////////////////////////////////////
// 初始化相关数据
var num1 = 2687, num2 = 8132323, num3= 2500;
function init_g_dev_num()
{
	g_dev_num.tg_number=num1;
	g_dev_num.dpi_number=num2;
	g_dev_num.user_number=num3;
	
};
function init_g_main()
{
	//tg地图数据
	g_main.main_tg_map={
		'data_val':[
			[{name: '无锡'}, {name: '苏州', value: 581}],
			[{name: '南通'}, {name: '苏州', value: 66}], 
			[{name: '南京'}, {name: '苏州', value: 926}],
			[{name: '绍兴'}, {name: '苏州', value: 2}],
			[{name: '徐州'}, {name: '苏州', value: 26}],
			[{name: '南昌'}, {name: '苏州', value: 12}], 
			[{name: '苏州'}, {name: '苏州', value: 965}], 
			[{name: '杭州'}, {name: '苏州', value: 6}],
			[{name: '宁波'}, {name: '苏州', value: 12}], 
			[{name: '温州'}, {name: '苏州', value: 1}],
			[{name: '扬州'}, {name: '苏州', value: 54}],
			[{name: '新余'}, {name: '苏州', value: 1}], 
			[{name: '宿迁'}, {name: '苏州', value: 2}], 
			[{name: '泰州'}, {name: '苏州', value: 1}], 
			[{name: '常州'}, {name: '苏州', value: 27}]
		]	
	};
	//dpi地图数据
	g_main.main_dpi_map={
		'data_val':[
			[{name: "南京"}, {name: "苏州", value: 697242}], 
			[{name: "兰州"}, {name: "苏州", value: 59136}], 
			[{name: "哈尔滨"}, {name: "苏州", value: 37}], 
			[{name: "长春"}, {name: "苏州", value: 75281}], 
			[{name: "天津"}, {name: "苏州", value: 2978}],
			[{name: "昆明"}, {name: "苏州", value: 11}], 
			[{name: "重庆"}, {name: "苏州", value: 47606}], 
			[{name: "长沙"}, {name: "苏州", value: 17245}], 
			[{name: "拉萨"}, {name: "苏州", value: 52846}], 
			[{name: "沈阳"}, {name: "苏州", value: 87936}],
			[{name: "北京"}, {name: "苏州", value: 22096}], 
			[{name: "福州"}, {name: "苏州", value: 984785}], 
			[{name: "西安"}, {name: "苏州", value: 654}], 
			[{name: "银川"}, {name: "苏州", value: 271873}],
			[{name: "西宁"}, {name: "苏州", value: 308548}],
			[{name: "济南"}, {name: "苏州", value: 271734}],
			[{name: "乌鲁木齐"}, {name: "苏州", value: 104416}], 
			[{name: "石家庄"}, {name: "苏州", value: 6562}], 
			[{name: "南昌"}, {name: "苏州", value: 325939}], 
			[{name: "成都"}, {name: "苏州", value: 41156}],
			[{name: "包头"}, {name: "苏州", value: 627012}], 
			[{name: "杭州"}, {name: "苏州", value: 3745394}], 
			[{name: "广州"}, {name: "苏州", value: 882820}],
			[{name: "太原"}, {name: "苏州", value: 1557758}], 
			[{name: "上海"}, {name: "苏州", value: 1113514}], 
			[{name: "郑州"}, {name: "苏州", value: 316782}], 
			[{name: "武汉"}, {name: "苏州", value: 104056}], 
			[{name: "合肥"}, {name: "苏州", value: 125}]
		]
	};
	//两种格式选一种
	//中间大柱状图
	g_main.main_data_bar={
		'data_val':[
			[[5.88,8.42,7.28,6.18,5.02,6.07,6.35,6.95,7.89,8.23,9.13,9.23],'服务业'],
			[[3.42,3.38,4.02,3.72,3.66,3.93,4.04,4.65,4.80,4.96,5.14,5.28],'公共机构'],
			[[7.32,3.42,7.70,7.84,5.84,6.99,6.42,8.21,8.71,10.04,10.22,9.50],'互联网'],
			[[3.13,2.25,3.89,5.17,2.75,2.20,2.40,2.57,2.36,1.51,1.56,1.20],'建筑房地产'],
			[[0.72,-0.82,2.13,0.86,1.85,1.21,2.70,3.66,3.83,4.26,4.50,4.23],'教育文化'],
			[[6.74,8.04,10.79,10.18,8.45,7.84,7.59,7.22,7.68,7.94,8.35,7.35],'金融业'],
			[[6.08,6.39,6.14,6.30,4.68,6.12,6.23,4.89,4.79,4.66,4.79,4.52],'能源牧业'],
			[[4.08,-1.72,2.03,4.04,2.30,1.32,1.40,1.30,1.16,0.98,0.89,0.67],'制造业']
		],
		'data_name':['201601','201602','201603','201604','201605','201606','201607','201608','201609','201610','201611','201612']
		/*'data_val':[
			[['一月',5.88,'服务业'],['二月',8.42,'服务业'],['三月',7.28,'服务业'],['四月',6.18,'服务业'],['五月',5.02,'服务业'],['六月',6.07,'服务业'],['七月',6.35,'服务业'],['八月',6.95,'服务业'],['九月',7.89,'服务业'],['十月',8.23,'服务业'],['十一月',9.13,'服务业'],['十二月',9.23,'服务业']],
			[['一月',3.42,'公共机构'],['二月',3.38,'公共机构'],['三月',4.02,'公共机构'],['四月',3.72,'公共机构'],['五月',3.66,'公共机构'],['六月',3.93,'公共机构'],['七月',4.04,'公共机构'],['八月',4.65,'公共机构'],['九月',4.80,'公共机构'],['十月',4.96,'公共机构'],['十一月',5.14,'公共机构'],['十二月',5.28,'公共机构']],
			[['一月',7.32,'互联网'],['二月',3.42,'互联网'],['三月',7.70,'互联网'],['四月',7.84,'互联网'],['五月',5.84,'互联网'],['六月',6.99,'互联网'],['七月',6.42,'互联网'],['八月',8.21,'互联网'],['九月',8.71,'互联网'],['十月',10.04,'互联网'],['十一月',10.22,'互联网'],['十二月',9.50,'互联网']],
			[['一月',3.13,'建筑房地产'],['二月',2.25,'建筑房地产'],['三月',3.89,'建筑房地产'],['四月',5.17,'建筑房地产'],['五月',2.75,'建筑房地产'],['六月',2.20,'建筑房地产'],['七月',2.40,'建筑房地产'],['八月',2.57,'建筑房地产'],['九月',2.36,'建筑房地产'],['十月',1.51,'建筑房地产'],['十一月',1.56,'建筑房地产'],['十二月',1.20,'建筑房地产']],
			[['一月',0.72,'教育文化'],['二月',-0.82,'教育文化'],['三月',2.13,'教育文化'],['四月',0.86,'教育文化'],['五月',1.85,'教育文化'],['六月',1.21,'教育文化'],['七月',2.70,'教育文化'],['八月',3.66,'教育文化'],['九月',3.83,'教育文化'],['十月',4.26,'教育文化'],['十一月',4.50,'教育文化'],['十二月',4.23,'教育文化']],
			[['一月',6.74,'金融业'],['二月',8.04,'金融业'],['三月',10.79,'金融业'],['四月',10.18,'金融业'],['五月',8.45,'金融业'],['六月',7.84,'金融业'],['七月',7.59,'金融业'],['八月',7.22,'金融业'],['九月',7.68,'金融业'],['十月',7.94,'金融业'],['十一月',8.35,'金融业'],['十二月',7.35,'金融业']],
			[['一月',6.08,'能源牧业'],['二月',6.39,'能源牧业'],['三月',6.14,'能源牧业'],['四月',6.30,'能源牧业'],['五月',4.68,'能源牧业'],['六月',6.12,'能源牧业'],['七月',6.23,'能源牧业'],['八月',4.89,'能源牧业'],['九月',4.79,'能源牧业'],['十月',4.66,'能源牧业'],['十一月',4.79,'能源牧业'],['十二月',4.52,'能源牧业']],
			[['一月',4.08,'制造业'],['二月',-1.72,'制造业'],['三月',2.03,'制造业'],['四月',4.04,'制造业'],['五月',2.30,'制造业'],['六月',1.32,'制造业'],['七月',1.40,'制造业'],['八月',1.30,'制造业'],['九月',1.16,'制造业'],['十月',0.98,'制造业'],['十一月',0.89,'制造业'],['十二月',0.67,'制造业']]
		]*/
	};
}
function init_g_tg_info()
{
	g_tg_info.tg_industry_info={
		'title':'智慧宽带行业分布',
		'data_val':[
				{value:7.52, name:'公共机构'},
				{value:8.36, name:'互联网业'},
				{value:3.41, name:'金融业'},
				{value:23.79, name:'服务业'},
				{value:3.54, name:'教育文化业'},
				{value:7.52, name:'房地产业'},
				{value:7.72, name:'国家机关'},
				{value:36.85, name:'制造业'},
				{value:1.29, name:'能源与农牧业'}
				]
	};
	g_tg_info.tg_work_time_info={
		'title':'企业互联网访问热度',
		'data_val':[2434,2135,1912, 1822, 1738, 1667, 1776,1769,2289,8302,19181,23052,21557,21503,19228,19085,19184,20032,19397,16735,8877,5382,3399,2624],
		'data_name':[
                   '0:00','2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
            ]
	};
	g_tg_info.tg_access_device_info={
		'title':'企业互联网访问终端分布',
		'data_val':[
					{value:62, name:'电脑'},
					{value:29.9, name:'手机'},
					{value:3.6, name:'平板'},
					{value:2.9, name:'服务器'},
					{value:1.5, name:'其他'}
				]
	};
	//词云
	g_tg_info.tg_data_flow_info={
		'title':'企业互联网访问应用',
		'data_val':[
					{name: '迅雷',value: 21144},
					{name: '网页浏览',value: 12379},
					{name: '爱奇艺PPS',value: 9049},
					{name: 'SSL',value: 4274},
					{name: 'HTTP下载',value: 4259},
					{name: '视频流媒体',value: 3890},
					{name: '优酷视频',value: 3639},
					{name: 'BT下载',value: 3063}
				]
	};
	g_tg_info.tg_fluid_control_info={
		'title':'流控功能行业分布',
		'data_val':[32.43, 45.38, 47.01, 61.82, 49.57,29.17,50.00],
		'data_name':['服务业', '制造业', '公共机构', '教育文化业', '建筑业','国家机关','能源与农牧业']
	};
	/* g_tg_info.tg_speed_up_info={
		'title':'智能加速流量上下行',
		//'name':
		'data_val': dds_accinfo()
		//'data_val': gene_data()
	}; */
	g_tg_info.tg_speed_up_info = dds_accinfo();
};

function dds_accinfo(){
	var b, e;
	var myDate = new Date();
	e = (60*60*myDate.getHours() + 60 * myDate.getMinutes() + myDate.getSeconds()) / 10;
	e = parseInt(e);
	if(e>30){
		b = e - 30;
	} else {
		b = 0;
	}
	ret_v = {};
	var name_list=[];
	var value_list=[];
	for(var i=b; i<e; i++)
	{
		var new_d = myDate - e*10000 + i*10000;
		var date_str = new Date(new_d);
		name_list.push([date_str.getMonth()+1, date_str.getDate()].join('/') + ' ' + [date_str.getHours(), date_str.getMinutes(), date_str.getSeconds()].join(':'));
		value_list.push(g_acc_data[i]);
		
	}
	
	ret_v={
			name: name_list,
//			parseInt(i/6/60) + parseInt(i/6/60) + 'H' + parseInt((i - parseInt(i/6/60)*6*60)/6) + 'm',
			value: value_list
		};
	//var ret_v = g_acc_data.slice(b,  e);
	return ret_v;
}

function gene_accinfo()
{
	var data = [];
	for (var i = 0; i < 1; i++) {
		data.push(dds_accinfo());
	}
	return data;
};

///////////////////////////////
function init_g_dpi_info()
{
	g_dpi_info.dpi_appinfo_info = {
		'title':'最受欢迎的应用分布',
		"data_val": [
			{"name": "微信", "value": "33660370"}, 
			{"name": "腾讯QQ", "value": "31488473"}, 
			{"name": "淘宝", "value": "14713801"}, 
			{"name": "爱奇艺PPS", "value": "12513801"}, 
			{"name": "视频流媒体", "value": "9940003"}, 
			{"name": "迅雷", "value": "8604702"}, 
			{"name": "优酷视频", "value": "7968962"}, 
			{"name": "BT下载", "value": "6262743"}, 
			{"name": "腾讯微博", "value": "6102036"}, 
			{"name": "腾讯视频", "value": "5301069"}
		]
	};	
	g_dpi_info.dpi_appranking_info = {
		'title':'最受欢迎的应用分组排名',
		'data_val':[
			{
				"data": [6847334, 5570551, 1854302, 1738370, 1399979, 968882, 268599, 25561], 
				"type": "bar",
				"name": "App下载分布"
			}
		],
		'data_name': ["通讯社交", "影音视听", "网络购物", "系统安全", "音乐赏析", "网络游戏", "团购", "儿童亲子"]
	};
	g_dpi_info.dpi_termdevtype_info = {
		'title':'最受欢迎的智能终端分布',
		'data_val':[
			{"name": "手机", "value": 240925,}, 
			{"name": "电脑", "value": 102446}, 
			{"name": "平板", "value": 12920}, 
			{"name": "机顶盒", "value": 5213}
		],
		'data_val1':[
			{"name": "苹果", "value": 101054},
			{"name": "华为", "value": 52324}, 
			{"name": "三星", "value": 33845}, 
			{"name": "小米", "value": 53702}, 
			{"name": "微软windows", "value": 90662}, 
			{"name": "苹果", "value": 11784}, 
			{"name": "小米", "value": 851}, 
			{"name": "华为", "value": 214}, 
			{"name": "苹果", "value": 11481},
			{"name": "三星", "value": 374},
			{"name": "悦me电视机顶盒", "value": 9},
			{"name": "天猫魔盒", "value": 2121},
			{"name": "乐视", "value": 2672}, 
			{"name": "小米", "value": 411}
		]
	};
	g_dpi_info.dpi_keyword_info = {
		'title':'最受欢迎的搜索关键字分布',
		'data_val': " <a href=\"javascript:alert('关键字：天气 \\n搜索引擎：百度手机助手 \\n搜索次数： 238645');\" target=\"_parent\", rel=\"238645\">天气</a> <a href=\"javascript:alert('关键字：锦绣未央 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 185128');\" target=\"_parent\", rel=\"185128\">锦绣未央</a> <a href=\"javascript:alert('关键字：emall \\n搜索引擎：苏宁易购 \\n搜索次数： 179226');\" target=\"_parent\", rel=\"179226\">emall</a> <a href=\"javascript:alert('关键字：samsung \\n搜索引擎：百度搜索引擎 \\n搜索次数： 100173');\" target=\"_parent\", rel=\"100173\">samsung</a> <a href=\"javascript:alert('关键字：过道吊顶 \\n搜索引擎：360搜索引擎 \\n搜索次数： 99552');\" target=\"_parent\", rel=\"99552\">过道吊顶</a> <a href=\"javascript:alert('关键字：熊出没 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 81843');\" target=\"_parent\", rel=\"81843\">熊出没</a> <a href=\"javascript:alert('关键字：人体艺术 \\n搜索引擎：百度搜索引擎 \\n搜索次数： 58834');\" target=\"_parent\", rel=\"58834\">人体艺术</a> <a href=\"javascript:alert('关键字：卡通边框简笔画 \\n搜索引擎：360搜索引擎 \\n搜索次数： 52608');\" target=\"_parent\", rel=\"52608\">卡通边框简笔画</a> <a href=\"javascript:alert('关键字：柜子 \\n搜索引擎：360搜索引擎 \\n搜索次数： 52496');\" target=\"_parent\", rel=\"52496\">柜子</a> <a href=\"javascript:alert('关键字：白伊应天爵免费阅读 \\n搜索引擎：百度搜索引擎 \\n搜索次数： 51245');\" target=\"_parent\", rel=\"51245\">白伊应天爵免费阅读</a> <a href=\"javascript:alert('关键字：赵法普道长用道医符咒调理癌症 \\n搜索引擎：百度搜索引擎 \\n搜索次数： 50860');\" target=\"_parent\", rel=\"50860\">赵法普道长用道医符咒调理癌症</a> <a href=\"javascript:alert('关键字：小猪佩奇 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 49510');\" target=\"_parent\", rel=\"49510\">小猪佩奇</a> <a href=\"javascript:alert('关键字：胭脂 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 48748');\" target=\"_parent\", rel=\"48748\">胭脂</a> <a href=\"javascript:alert('关键字：电脑壁纸 \\n搜索引擎：360搜索引擎 \\n搜索次数： 44834');\" target=\"_parent\", rel=\"44834\">电脑壁纸</a> <a href=\"javascript:alert('关键字：美人为馅 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 44471');\" target=\"_parent\", rel=\"44471\">美人为馅</a> <a href=\"javascript:alert('关键字：老九门 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 41131');\" target=\"_parent\", rel=\"41131\">老九门</a> <a href=\"javascript:alert('关键字：欧洲珠宝 \\n搜索引擎：360搜索引擎 \\n搜索次数： 37844');\" target=\"_parent\", rel=\"37844\">欧洲珠宝</a> <a href=\"javascript:alert('关键字：三菱猎豹黑金刚内饰 \\n搜索引擎：360搜索引擎 \\n搜索次数： 37720');\" target=\"_parent\", rel=\"37720\">三菱猎豹黑金刚内饰</a> <a href=\"javascript:alert('关键字：麻雀 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 31768');\" target=\"_parent\", rel=\"31768\">麻雀</a> <a href=\"javascript:alert('关键字：灵魂摆渡 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 31503');\" target=\"_parent\", rel=\"31503\">灵魂摆渡</a> <a href=\"javascript:alert('关键字：从你的全世界路过 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 30707');\" target=\"_parent\", rel=\"30707\">从你的全世界路过</a> <a href=\"javascript:alert('关键字：美女 \\n搜索引擎：360搜索引擎 \\n搜索次数： 30197');\" target=\"_parent\", rel=\"30197\">美女</a> <a href=\"javascript:alert('关键字：电脑桌面壁纸高清 \\n搜索引擎：360搜索引擎 \\n搜索次数： 29465');\" target=\"_parent\", rel=\"29465\">电脑桌面壁纸高清</a> <a href=\"javascript:alert('关键字：画江湖之不良人 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 28618');\" target=\"_parent\", rel=\"28618\">画江湖之不良人</a> <a href=\"javascript:alert('关键字：实时热点 \\n搜索引擎：百度手机助手 \\n搜索次数： 28515');\" target=\"_parent\", rel=\"28515\">实时热点</a> <a href=\"javascript:alert('关键字：薛之谦 \\n搜索引擎：酷狗音乐 \\n搜索次数： 28493');\" target=\"_parent\", rel=\"28493\">薛之谦</a> <a href=\"javascript:alert('关键字：dj \\n搜索引擎：酷狗音乐 \\n搜索次数： 28085');\" target=\"_parent\", rel=\"28085\">dj</a> <a href=\"javascript:alert('关键字：光伏发电政策 \\n搜索引擎：360搜索引擎 \\n搜索次数： 27496');\" target=\"_parent\", rel=\"27496\">光伏发电政策</a> <a href=\"javascript:alert('关键字：字体颜色搭配 \\n搜索引擎：360搜索引擎 \\n搜索次数： 25590');\" target=\"_parent\", rel=\"25590\">字体颜色搭配</a> <a href=\"javascript:alert('关键字：道医符咒治愈乳腺癌 \\n搜索引擎：百度搜索引擎 \\n搜索次数： 25388');\" target=\"_parent\", rel=\"25388\">道医符咒治愈乳腺癌</a> <a href=\"javascript:alert('关键字：搞笑图片 \\n搜索引擎：360搜索引擎 \\n搜索次数： 25337');\" target=\"_parent\", rel=\"25337\">搞笑图片</a> <a href=\"javascript:alert('关键字：道医绝技现场表演-祝由-符咒 \\n搜索引擎：百度搜索引擎 \\n搜索次数： 25032');\" target=\"_parent\", rel=\"25032\">道医绝技现场表演-祝由-符咒</a> <a href=\"javascript:alert('关键字：空调 \\n搜索引擎：苏宁易购 \\n搜索次数： 24928');\" target=\"_parent\", rel=\"24928\">空调</a> <a href=\"javascript:alert('关键字：周杰伦 \\n搜索引擎：酷狗音乐 \\n搜索次数： 23699');\" target=\"_parent\", rel=\"23699\">周杰伦</a> <a href=\"javascript:alert('关键字：爱情保卫战 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 22864');\" target=\"_parent\", rel=\"22864\">爱情保卫战</a> <a href=\"javascript:alert('关键字：橱窗装饰图片 \\n搜索引擎：360搜索引擎 \\n搜索次数： 22344');\" target=\"_parent\", rel=\"22344\">橱窗装饰图片</a> <a href=\"javascript:alert('关键字：ppt背景图片 \\n搜索引擎：360搜索引擎 \\n搜索次数： 22278');\" target=\"_parent\", rel=\"22278\">ppt背景图片</a> <a href=\"javascript:alert('关键字：壁纸 \\n搜索引擎：360搜索引擎 \\n搜索次数： 22154');\" target=\"_parent\", rel=\"22154\">壁纸</a> <a href=\"javascript:alert('关键字：不可能完成的任务 \\n搜索引擎：爱奇艺PPS \\n搜索次数： 21884');\" target=\"_parent\", rel=\"21884\">不可能完成的任务</a> <a href=\"javascript:alert('关键字：小苹果 \\n搜索引擎：酷狗音乐 \\n搜索次数： 21708');\" target=\"_parent\", rel=\"21708\">小苹果</a>"
	};
	g_dpi_info.dpi_smarthome_factory_info = {
		'title':'最受欢迎的智能家居品牌分布',
		"data_val": [13134, 4739, 3552, 1847, 1298, 1134, 864, 812, 497, 341],
		'data_name':["苹果", "海康萤石", "小米", "深圳必连", "任天堂", "微软", 
			"乐心", "中兴", "火河科技", "博联"]
	};
	g_dpi_info.dpi_smarthome_type_info = {
		'title':'智能家居设备类型分布',
		'data_val': [
			{
				"data": [13134, 7398, 2432, 1707, 1005, 864, 787, 547, 497, 359],
				"type": "bar", 
				"name": "直接访问"
			}
		],
		'data_name': ["﻿智能手表", "智能摄像头", "智能游戏机", "智能空气净化器", "智能插座", "智能设备", "智能音箱", "智能扫地机器人", "智能门锁", "智能家庭管家"]
	};
};

function init_g_data_info()
{	
	g_data_info.data_host_average_info = {
		'title':'各行业访问互联网的主机数量',
		'data_val':[
				{value:170.81, name:'互联网业'},
				{value:96.38, name:'金融业'},
				{value:125.19, name:'服务业'},
				{value:123.88, name:'制造业'},
				{value:115.91, name:'公共机构'},
				{value:138.31, name:'教育与文化业'},
				{value:78.03, name:'建筑和房地产业'},
				{value:114.47, name:'国家机关'},
				{value:152.6, name:'能源与农牧业'}
				]
	};
	g_data_info.data_work_flow_info = {
		'title':'工作相关流量和非工作相关流量统计',
		'data_val':[41.7, 43.28, 39.83, 35.32, 38.66,43,40.9,38.68,39.02],
		'data_name':['服务业', '制造业', '公共机构', '教育与文化业', '建筑和房地产业','国家机关','能源与农牧业','金融业','互联网业']
	};
	g_data_info.data_recruit_behavior_info = {
		'title':'企业招聘行为趋势',
		'data_val':[87, 52, 121, 72, 81, 79, 59, 75, 86, 99, 79, 65],
		'data_name':['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
	};
	g_data_info.data_over_work_info = {
		'title':'企业加班时长统计',
		'data_val':[0.85,0.92,0.98,0.95,0.81,8.25,7.35],
		'data_val1':[42,47,48,47,43,7,3],
		'data_name':['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
	};
	g_data_info.data_access_web_info = {
		'title':'各行业访问网站类型',
		'data_val':[
					{name: '团购',value: 27.3},
					{name: '彩票',value: 29.9},
					{name: '地址导航',value: 31.3},
					{name: '页游',value: 32.5},
					{name: '研发类',value: 57.4},
					{name: '女性',value: 64.1},
					{name: '银行',value: 69.0},
					{name: '招聘',value: 78.4},
					{name: '邮箱网盘',value: 120.2},
					{name: '体育',value: 128.8},
					{name: '电子支付',value: 161.7},
					{name: '社交',value: 162.5},
					{name: '娱乐',value: 175.7},
					{name: '财经',value: 229.0},
					{name: '生活服务',value: 230.4},
					{name: '手机',value: 236.4}
				]
	};
	g_data_info.data_access_ITweb_info = {
		'title':'IT类企业访问研发网站统计',
		'data_val':'<a href="http://sc.chinaz.com" target="_blank", rel="12">roger007</a>' + 
			'<a href="" target="_blank", rel="2">脚本之家</a> ' +
			'<a href="" target="_blank", rel="25">天极网JSP</a> ' +
			'<a href="" target="_blank", rel="2">CSDN</a> ' +
			'<a href="" target="_blank", rel="25">MD5、SHA1加密</a> '+
			'<a href="" target="_blank", rel="2">JQuery</a> ' +
			'<a href="" target="_blank", rel="25">网易应用中心</a> ' +
			'<a href="" target="_blank", rel="2">太平洋电脑网jsp</a> ' +
			'<a href="" target="_blank", rel="25">Access官网</a> '+
			'<a href="" target="_blank", rel="2">ThinkPHP视频教程</a> ' +
			'<a href="" target="_blank", rel="25">IOS开发教程（官方）</a> ' +
			'<a href="" target="_blank", rel="2">博客园</a> ' +
			'<a href="" target="_blank", rel="25">ITools</a> '+
			'<a href="" target="_blank", rel="2">比特网</a> ' +
			'<a href="" target="_blank", rel="25">Lime JS</a> ' +
			'<a href="" target="_blank", rel="2">51CTO</a> ' +
			'<a href="" target="_blank", rel="25">Techweb</a> '+
			'<a href="" target="_blank", rel="2">站长之家</a> ' +
			'<a href="" target="_blank", rel="25">红黑联盟</a> ' +
			'<a href="" target="_blank", rel="2">W3C</a> ' +
			'<a href="" target="_blank", rel="25">Java开源大全</a> ',
		//'data_name':['制造业', '互联网', '金融', '医药业', '服务业']
	};	
};
function init_g_description()
{
	//中间底部趋势折线图
	g_description.trends_line={
		'data_val':[
			{ 
				name:'智慧宽带发展趋势',
				type:'line',
				step: 'start',
				//data:[ 947,  1379,  1557,  1712,  2130,  2178,  2292,  2380,  2469,  2550, 2623, 2720]
				data:[ 2292,  2380,  2469,  2550, 2623, 2720]
			},
			{
				name:'插件化DPI发展趋势',
				type:'line',
				step: 'middle',
				//data:[ 35,  48,  52,  64,  123, 181, 248, 357, 412, 477, 514, 668]
				data:[  248, 357, 412, 477, 514, 668]
			}
		],
		//'data_name':[ '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08', '2016-09', '2016-10', '2016-11', '2016-12', 			'2017-01']
		'data_name':[  '2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017-01']
	};
	g_description.map_center_left_top={
		'title':'江西省:14'+'<br>'+'浙江省:21'+'<br>'+'江苏省:2648'
	};
	g_description.map_center_left_mid={
		'title':'本月:196万'+ '<br>' +'本周:55万'+ '<br>' +'今日:2万'
	};
	
	g_description.map_center_left_bottom={
		'title':'主要集中在'+'<br>'+'江苏省苏州'+'<br>'+'市6个区域'
	};
	g_description.map_right_left={
		'title':'智慧宽带服务'+ '\n' +'用户数35.5万',
		'title1':'插件化DPI服务'+ '\n' +'用户数2420万',
		'title2':'数据服务'+ '\n' +'用户数12.7万'
	};
	g_description.map_right_right_top={
		'title':'<p align="center">'+'智能加速'+'<br>'+'服务用户'+'<br>'+'数14.8万'+'</p>'
	};
	g_description.map_right_right_bottom={
		'title':'<p align="center">'+'智能流控'+'<br>'+'服务用户'+'<br>'+'数17.3万'+'</p>'
	};
}

function init_all()
{
	init_g_main();
	init_g_description();
	init_g_dev_num();
	init_g_tg_info();
	init_g_dpi_info();
	init_g_data_info();
}

////////////////////////////////////////////////////////////////////////////////////////
// 从webservice获取动态数据
function get_info_webservice(murl, typeid, cb_func, json)
{
	//var r_data;
	$.get(
		murl + '?typeid=' + typeid,
		function(result){
			//r_data = result;
			//cb_func(r_data);
			cb_func(result);
		}, 
		'json'
	);
	//r_data = null;
};

g_host_name = "192.168.1.142:8000";

main_paras = {
	'url':'http://' + g_host_name +'/blog/getDevDistribute/',
	'typeid':['tg','dpi','da'],
	'func':[cb_main_tg_map,cb_main_dpi_map,cb_main_data_bar]
}
description_paras = {
	'url':'http://' + g_host_name +'/blog/getDescriptionInfo/',
	'typeid':['trends_line','tg_desc','dpi_desc','data_desc','usernum_desc','accuser_desc','tcuser_desc'],
	'func':[cb_trends_line,cb_map_center_left_top,cb_map_center_left_mid,cb_map_center_left_bottom,
	cb_map_right_left,cb_map_right_right_top,cb_map_right_right_bottom]
};
dev_paras ={
	'url':'http://' + g_host_name +'/blog/getDevNumber/',
	'typeid':['tgnum','dpinum','usernum'],
	'func':[cb_tg_number,cb_dpi_number,cb_user_number]
};

tg_paras = {
	'url':'http://' + g_host_name + '/blog/getTgInfo/',
	'typeid':['industry_info', 'hot_distribution', 'access_devinfo', 'appinfo', 'traf_ctrl', 'acc_info'],
	'func':[cb_tg_industry_info, cb_tg_work_time_info, cb_tg_access_device_info,
			cb_tg_data_flow_info, cb_tg_fluid_control_info, cb_tg_speed_up_info ]
};

dpi_paras = {
	'url':'http://' + g_host_name + '/blog/getAppInfo/',
	'typeid':['appinfo', 'appgrpinfo', 'termdevtype', 'keyword', 'smarthome_factory', 'smarthome_type'],
	'func':[cb_dpi_appinfo_info, cb_dpi_appranking_info, cb_app_termdevtype_info,
			cb_app_keyword_info, cb_app_smarthome_factory_info, cb_app_smarthome_type_info ]
};

data_paras = {
	'url':'http://' + g_host_name + '/blog/getDataAnalysisInfo/',
	'typeid':['host_num', 'work_traffic', 'recruit', 'overwork', 'web_acc', 'ITWeb_acc'],
	'func':[cb_data_host_average_info, cb_data_work_flow_info, cb_data_recruit_behavior_info,
			cb_data_over_work_info, cb_data_access_web_info, cb_data_access_ITweb_info ]
};



function get_data_webservice_proto(paras)
{
	murl = paras.url;
	typeids = paras.typeid;
	funcs = paras.func;
	for (var i = 0; i < typeids.length; i++){
		if(typeids[i]=='acc_info' && murl=='http://' + g_host_name + '/blog/getTgInfo/'){
			// 由于需要获得参数，所以需要特殊处理
			// 获取时间区间值
			var b, e;
			var myDate = new Date();
			e = (60*60*myDate.getHours() + 60 * myDate.getMinutes() + myDate.getSeconds()) / 10;
			e = parseInt(e);
			if(e>30){
				b = e - 30;
			} else {
				b = 0;
			}
			var parameter = typeids[i] + '&begin=' + b + '&end=' + e;
			get_info_webservice(murl, parameter, funcs[i]);
		} else {
			get_info_webservice(murl, typeids[i], funcs[i]);
		}
	}
}
function get_dev_main_all()
{
	get_data_webservice_proto(main_paras);
}
function get_dev_data_all()
{
	get_data_webservice_proto(dev_paras);
}
function get_dev_description_all()
{
	get_data_webservice_proto(description_paras);
}
function get_tg_data_all()
{
	get_data_webservice_proto(tg_paras);	
}
function get_dpi_data_all()
{
	get_data_webservice_proto(dpi_paras);
}
function get_data_data_all()
{
	get_data_webservice_proto(data_paras);	
}


/////////////////////////////////////////////////////////////////////////////////////////////
//配置中间参数
//获取设备数
function cb_tg_number(data){
	g_dev_num.tg_number = parseInt(data);
}
function cb_dpi_number(data){
	g_dev_num.dpi_number = parseInt(data);
}
function cb_user_number(data){
	g_dev_num.user_number = parseInt(data);
}

	
//地图下部各参数，描述相关
//底部折线图
function cb_trends_line(data){
	g_description.trends_line = data;
}
//底部左侧顶部文字回调
function cb_map_center_left_top(data){
	g_description.map_center_left_top = data;
}
////底部左侧中部文字回调
function cb_map_center_left_mid(data){
	g_description.map_center_left_mid = data;
}
//底部左侧底部文字回调
function cb_map_center_left_bottom(data){
	g_description.map_center_left_bottom = data;
}
//底部右侧图形左侧文字回调
function cb_map_right_left(data){
	g_description.map_right_left = data;
}
//底部右侧图形右侧顶部文字回调
function cb_map_right_right_top(data){
	g_description.map_right_right_top = data;
}
//底部右侧图形右侧底部文字回调
function cb_map_right_right_bottom(data){
	g_description.map_right_right_bottom = data;
}
/////////////////////////////////////////////////////////////////////////////////////////////
//中间主要地图等部分回调
//tg地图参数相关
function cb_main_tg_map(data){
	g_main.main_tg_map = data;
}
//dpi地图相关参数
function cb_main_dpi_map(data){
	g_main.main_dpi_map = data;
}
//中间柱形图
function cb_main_data_bar(data){
	g_main.main_data_bar = data;
}
/////////////////////////////////////////////////////////////////////////////////////////////
// 1、获取业务开展状况信息
//1.1 获取智慧宽带在各行业的分布
function cb_tg_industry_info(data){
	g_tg_info.tg_industry_info = data;
}
//1.2 获取智慧宽带中互联网访问在工作日随时间变化的情况
function cb_tg_work_time_info(data){
	g_tg_info.tg_work_time_info = data;
}
//1.3 获取智慧宽带中访问互联网设备的构成
function cb_tg_access_device_info(data){
	g_tg_info.tg_access_device_info = data;
}
//1.4 智慧宽带中流量主要构成
function cb_tg_data_flow_info(data){
	g_tg_info.tg_data_flow_info = data;
}
//1.5 智慧宽带中使用流控功能的行业分布情况
function cb_tg_fluid_control_info(data){
	g_tg_info.tg_fluid_control_info = data;
}
//1.6 智慧宽带中，使用加速功能的情况
function cb_tg_speed_up_info(data){
	var b,e;
	var myDate = new Date();
	b = parseInt(data['begin']);
	e = parseInt(data['end']);
	ret_v = {};
	var name_list=[];
	var value_list=[];
	for(var i=b; i<e; i++)
	{
		var new_d = myDate - e*10000 + i*10000;
		var date_str = new Date(new_d);
		name_list.push([date_str.getMonth()+1, date_str.getDate()].join('/') + ' ' + [date_str.getHours(), date_str.getMinutes(), date_str.getSeconds()].join(':'));
		value_list.push(data['data_val'][i-b]);
		
	}
	
	ret_v={
			name: name_list,
			value: value_list
		};
	
	g_tg_info.tg_speed_up_info = ret_v;
}

//2.0
//2.1 最受欢迎的应用分布
function cb_dpi_appinfo_info(data){
	g_dpi_info.dpi_appinfo_info = data;
}
//2.2 最受欢迎的APP排名
function cb_dpi_appranking_info(data){
	g_dpi_info.dpi_appranking_info = data; 
}
//2.3 最受欢迎的智能终端类型分布
function cb_app_termdevtype_info(data){
	g_dpi_info.dpi_termdevtype_info = data;
}
//2.4 最受欢迎的搜索关键字分布
function cb_app_keyword_info(data){
	g_dpi_info.dpi_keyword_info = data;
}
//2.5 最受欢迎的智能家居品牌分布
function cb_app_smarthome_factory_info(data){
	g_dpi_info.dpi_smarthome_factory_info = data;
}
//2.6 智能家居设备类型分布
function cb_app_smarthome_type_info(data){
	g_dpi_info.dpi_smarthome_type_info = data;
}

//3.0
//3.1 各行业访问互联网的主机平均数量分布
function cb_data_host_average_info(data){
	g_data_info.data_host_average_info = data;
}
//3.2 企业中工作相关流量和非工作相关流量对比统计
function cb_data_work_flow_info(data){
	g_data_info.data_work_flow_info = data;
}
//3.3 各招聘行为随时间变化的图形
function cb_data_recruit_behavior_info(data){
	g_data_info.data_recruit_behavior_info = data;
}
//3.4 企业加班时长统计表（工作日加班和周末加班）和加班人数统计
function cb_data_over_work_info(data){
	g_data_info.data_over_work_info = data;
}
//3.5 在各行业中的主要访问网站的类型分布
function cb_data_access_web_info(data){
	g_data_info.data_access_web_info = data;
}
//3.6 IT类企业，访问IT研发类网站的统计情况
function cb_data_access_ITweb_info(data){
	g_data_info.data_access_ITweb_info = data;
}

