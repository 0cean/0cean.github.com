
/**
 * @namespace QZONE
 */
var QZONE = window.QZONE || {};
/**
 * @description 空间分享接口,会渲染5种分享方式
 * @param {HTMLElement} [container=document.getElementById('shareContent')] 容器节点,dom
 * @param {Object} opts 可选参数
 * @param {String} [opts.surl] 分享地址的链接
 * @param {String} [opts.site] 分享网址的文字
 * @param {String} [opts.summary] 分享内容
 * @param {String} [opts.stitle] 标题
 * @param {String} [opts.pics] 分享图片
 * @param {String} [opts.reportDomain='shengdan.qzone.qq.com'] 点击上报域名
 * @example QZONE.addShare(document.getElementById('shareContent'), {
 *     'surl' : 'http://qzs.qq.com/7year.html',
 *     'site' : '这个是分享链接的文字',
 *     'summary' : '这个是分享的内容',
 *     'stitle' : '这个是分享标题',
 *     'pics' : 'http://qzonestyle.gtimg.cn/qzone_v6/act/img/20120422_qzone_7_years/pop_up/icon-pop-seven-years.png'
 * });
 */
QZONE.addShare = function(container, opts){
	/**
	 * 根据不同浏览器获取对应的Event对象
	 *
	 * @param {Event} evt
	 * @return 修正过的Event对象, 同时返回一个修正button的自定义属性;
	 * @type Event
	 * @example getEvent();
	 * @return Event
	 */
	function getEvent(evt) {
		var evt = window.event || evt,
			c,
			cnt;
		if(!evt && window.Event){
			c = arguments.callee;
			cnt = 0;
			while(c){
				if((evt = c.arguments[0]) && typeof(evt.srcElement) != "undefined"){
					break;
				}else if(cnt > 9){
					break;
				}
				c = c.caller;
				++cnt;
			}
		}
		return evt;
	}
	/**
	 * 返回事件触发的对象
	 *
	 * @param {Object} evt
	 * @example getTarget(evt);
	 * @return {object}
	 */
	function getTarget(evt) {
		var e = getEvent(evt);
		if (e) {
			return e.srcElement || e.target;
		} else {
			return null;
		}
	}

    opts = opts || {};
    var container = container || document.getElementById('shareContent'),
        surl = opts.surl || 'http://qzone.qq.com/',
        summary = opts.summary || '这个是分享的内容',
        stitle = opts.stitle || '这个是分享的标题',
        pics = opts.pics || 'http://qzonestyle.gtimg.cn/qzone_v6/act/img/20120422_qzone_7_years/pop_up/icon-pop-seven-years.png',
        site = opts.site || '这个是分享链接的文字',
        encode = encodeURIComponent,
        desc = opts.desc || '失踪的宝贝要回家，快来参与爱心的传递吧！';
        shareList = {
            qzone : {
                title : "分享到QQ空间", //title文字
                cls : 'icon_qz', //icon的classname
                tag : 'Head_share_qzone', //上报tag
				id : '__share_qzone',
                method : function(evt){
                    var t = getTarget(evt),
                        buff = [],
                        ps = {
                            url : surl + "#via=404-qzoneshare",
                            desc : desc || '失踪的宝贝要回家，快来参与爱心的传递吧！',
                            summary : summary,
                            title : stitle,
                            pics : pics,
                            site : site
                        };
        
                    for(var k in ps){
                        buff.push(k + '=' + encode(ps[k] || ''));
                    }
                    //newYear.pingShare('share');
                    t.target="_blank";
                    t.href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + buff.join('&');
                }
            },
            weibo : {
                title : "分享到腾讯微博",
                cls:'icon_qt',
                tag:'Head_share_t_weib',
					id : '__share_weibo',
                method : function(evt){
                    var w = "http://v.t.qq.com/share/share.php",
                        q = ["?site=",encode(surl + "#via=share_t_weib"),"&title=", encode(summary),"&pic=", encode(pics),"&url=",encode(surl)].join(""),
                        p = [w, q].join("");
                        
                    openit(p,'weibo',"width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
                }
            },
	    qq : {
				title : "分享到QQ和QQ群",
                cls:'icon_qq',
                tag:'Head_share_qq',
				id : '__share_qq',
                method : function(evt){
                     var t = getTarget(evt),
                        buff = [],
                        ps = {
                            url : surl + "#via=404-qqshare",
                            desc : summary || '失踪的宝贝要回家，快来参与爱心的传递吧！',
                            summary : summary,
                            style: '203',
                            noPic:true,
			    			width: 16,
			    			height: 16,
                            site : site
                        };
        
                    for(var k in ps){
                        buff.push(k + '=' + encode(ps[k] || ''));
                    }
                    t.target="_blank";
                    t.href = 'http://connect.qq.com/widget/shareqq/index.html?' + buff.join('&');
                }
			},
            sina : {
                title : "分享到新浪微博",
                cls:'icon_xl',
                tag:'Head_share_x_weib',
					id : '__share_sina',
                method : function () {
                    var w = "http://v.t.sina.com.cn/share/share.php",
                        q = ["?url=", encode(surl + "#via=share_x_weib"), "&title=", encode(summary), "&source=", "&sourceUrl=", surl, "&content=utf-8", "&pic=", encode(pics)].join(""),
                        p = [w, q].join("");
                    openit(p,'sina',"toolbar=0,status=0,resizable=1,width=440,height=430");
                }
            },
            kaixin : {
                title : "分享到开心网",
                cls:'icon_kx',
                tag:'Head_share_kaixin',
					id : '__share_kaixin',
                method : function () {
                    var n = "http://www.kaixin001.com/repaste/bshare.php?rurl=" + encode(surl + "#via=share_kaixin") + "&rcontent=&rtitle=" + encode(summary);
                    openit(n,'kaixin',"toolbar=0,status=0,resizable=1,width=600,height=360");
                }
            },
            renren : {
                title : "分享到人人网",
                tag:'Head_share_renren',
                cls:'icon_rr',
					id : '__share_renren',
                method : function () {
                    var n = "http://www.connect.renren.com/share/sharer?title=" + encode(summary) + "&url=" + encode(surl + "#via=share_renren"),
                        p = window.open(n, "rr", "toolbar=0,status=0,resizable=1,width=510,height=300");
                    if (p) {
                        p.focus()
                    }
                }
            }
        };
        
        var openit = function(u,n,p){
            function o() {
                var z;
                if(!(z = window.open(u, n, p))){
                    location.href = u
                }else{
                     z.focus();
                }
            }
            o();
        };
        
        var p, o = [];
        for (p in shareList) {
            if (shareList.hasOwnProperty(p)) {
                o.push('<a href="javascript:;" type="'+p+'" class="sprite ' + shareList[p].cls + '" id="' + shareList[p].id + '" title="' + shareList[p].title + '" data-click="'+shareList[p].tag+'">' + "</a>");
            }
        }

        container.innerHTML ='<span class="share_txt">分享到：</span>' + o.join(" ");

		function addEvent(refDom, eventType, refFunc){
			if(refDom && refDom.nodeType == 1){
				if(refDom.addEventListener){
					refDom.addEventListener(eventType, refFunc, false);
				}else{
					refDom.attachEvent('on' + eventType, refFunc);
				}
			}
		}
        
		function handler(evt, t){
			var type = t.getAttribute('type'),
				clickData = t.dataset ? t.dataset.click : t.getAttribute('data-click');
			type && shareList[type].method();
			clickData && window.TCISD && TCISD.hotClick('activity.' + clickData, opts.reportDomain || 'shengdan.qzone.qq.com');
			if(t.getAttribute('href').indexOf('javascript:;')!=-1){
				return false;
			}
		}
		for (p in shareList) {
            if (shareList[p].id) {
				var node = document.getElementById(shareList[p].id);
                addEvent(node, "click", (function(d){
					return function(evt){
						handler(evt,d);
					};
				})(node));
            }
        }
		
        return shareList;
};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





(function(_w, _d){
	var getURLQuery = (function () {
		var query = location.search.slice(1), ar, o = {};
		ar = query.split('&');
		for (var i = 0; i < ar.length; i++) {
			var p = ar[i].split('=');
			if (p[0]) {
				o[p[0]] = p[1] || '';
			}
		}
		return function (key) {
			return o[key];
		}
	}) ();

	var tmpl = '\
		  <div class="lost_child_box">\
			<div class="hd">\
			  <p class="wrong">404</p>\
			  <p class="other_info"> 您访问的页面找不回来了！ <span>但我们可以一起寻找失踪宝贝</span> </p>\
			</div>\
			<div class="bd">\
			  <div class="child_info">\
				<p class="child_pic"> <a href="{url}" target="_blank"> <img src="about:blank" onerror="__lost_child_pic_adjustment(this);" title="{name}" alt="宝贝照片" data-src="{child_pic}" onclick="TCISD && TCISD.hotClick(\'gy.404.img\', \'hat.qzone.qq.com\', \'/index.html\')"> </a> </p>\
				<div class="info_person">\
				  <p class="name"> <span>姓 名：</span> {name} </p>\
				  <p class="sex"> <span>性 别：</span> {sex} </p>\
				  <p class="birthday"> <span>出生日期：</span> {birth_time} </p>\
				  <p class="losttime"> <span>失踪时间：</span> {lost_time} </p>\
				  <p class="lostadd"> <span>失踪地点：</span> {lost_place} </p>\
				  <p class="lostinfo"> <span>失踪人特征描述：</span> {child_feature} </p>\
				</div>\
			  </div>\
			</div>\
			<div class="ft">\
			  <p class="support_company" id="__lost_child_support_company"> <a title="腾讯志愿者" href="http://e.t.qq.com/Tencent-Volunteers" target="_blank">腾讯志愿者</a> </p>\
			  <p class="baby_back"> <a title="宝贝回家" href="http://bbs.baobeihuijia.com/" target="_blank">宝贝回家</a> </p>\
			  <p class="side_infos"> <a title="查看详细信息" href="{url}" target="_blank">详细</a> <span class="symbol"></span> <a href="/"  class="back_home" title="点击返回首页" style="color:#0898DD;">返回首页</a> </p>\
			</div>\
		  </div>\
		  <div class="info">\
			<p> <span class="address">公益404接入地址：<a title="公益404接入地址" href="http://www.qq.com/404/" target="_blank">http://www.qq.com/404/</a></span><span class="info_come">失踪儿童信息来自<a title="宝贝回家" href="http://bbs.baobeihuijia.com/" target="_blank" onclick="TCISD && TCISD.hotClick(\'gy.404.js\', \'hat.qzone.qq.com\', \'/index.html\')">宝贝回家寻子网</a></span></p>\
			<div class="user_share fr" id="shareContent"><span class="share_txt">分享到：</span><a href="javascript:;" type="qzone" class="sprite icon_qz" title="分享到QQ空间" data-click="Head_share_qzone"></a> <a href="javascript:;" type="weibo" class="sprite icon_qt" title="分享到腾讯微博" data-click="Head_share_t_weib"></a> <a href="javascript:;" type="sina" class="sprite icon_xl" title="分享到新浪微博" data-click="Head_share_x_weib"></a> <a href="javascript:;" type="kaixin" class="sprite icon_kx" title="分享到开心网" data-click="Head_share_kaixin"></a><a href="javascript:;" type="renren" class="sprite icon_rr" title="分享到人人网" data-click="Head_share_renren"></a></div>\
		  </div>'
		,tmpl2 = '\
		  <div class="lost_child_box">\
			<div class="hd">\
			  <p class="wrong">404</p>\
			  <p class="other_info"> 您访问的页面找不回来了！<span>但我们可以一起帮{ta}寻找父母</span> </p>\
			</div>\
			<div class="bd">\
			  <div class="child_info">\
				<p class="child_pic"> <a href="{url}" target="_blank"> <img src="about:blank" onerror="__lost_child_pic_adjustment(this);" title="{name}" alt="宝贝照片" data-src="{child_pic}"> </a> </p>\
				<div class="info_person">\
				  <p class="name"> <span>背 景：</span> {name} </p>\
				  <p class="sex"> <span>性 别：</span> {sex} </p>\
				  <p class="birthday"> <span>年 龄：</span> {birth_time} </p>\
				  <p class="losttime"> <span>送达福利院时间：</span> {lost_time} </p>\
				  <p class="lostadd"> <span>解救地点：</span> {lost_place} </p>\
				  <p class="lostinfo"> <span>宝贝特征：</span> {child_feature} </p>\
				</div>\
			  </div>\
			</div>\
			<div class="ft">\
			  <p class="support_company" id="__lost_child_support_company"> <a title="腾讯志愿者" href="http://e.t.qq.com/Tencent-Volunteers" target="_blank">腾讯志愿者</a> </p>\
			  <p class="baby_back"> <a title="宝贝回家" href="http://bbs.baobeihuijia.com/" target="_blank">宝贝回家</a> </p>\
			  <p class="side_infos"> <a title="查看详细信息" href="{url}" target="_blank">详细</a> <span class="symbol"></span> <a href="/"  class="back_home" title="点击返回首页" style="color:#0898DD;">返回首页</a> </p>\
			</div>\
		  </div>\
		  <div class="info">\
			<p> <span class="address">公益404接入地址：<a title="公益404接入地址" href="http://www.qq.com/404/" target="_blank">http://www.qq.com/404/</a></span><span class="info_come">宝贝信息来自<a title="大粤网" href="http://gd.qq.com/a/20130204/000258.htm#p=1" target="_blank">大粤网</a></span></p>\
			<div class="user_share fr" id="shareContent"><span class="share_txt">分享到：</span><a href="javascript:;" type="qzone" class="sprite icon_qz" title="分享到QQ空间" data-click="Head_share_qzone"></a> <a href="javascript:;" type="weibo" class="sprite icon_qt" title="分享到腾讯微博" data-click="Head_share_t_weib"></a> <a href="javascript:;" type="sina" class="sprite icon_xl" title="分享到新浪微博" data-click="Head_share_x_weib"></a> <a href="javascript:;" type="kaixin" class="sprite icon_kx" title="分享到开心网" data-click="Head_share_kaixin"></a><a href="javascript:;" type="renren" class="sprite icon_rr" title="分享到人人网" data-click="Head_share_renren"></a></div>\
		  </div>'
		, reFormat = /\{([\d\w\.]+)\}/g
		, reRoute = /([\d\w_]+)/g
		, ha = _d.head || _d.getElementsByTagName("head")[0]
		, ele
		, edt
		, tdata
		, chId
		, city
		, province
		, tmnow;
		;


	function insertContent(){
		var s
			;
		s = resolveData(_w.foundjsondata || _w.jsondata);
		s && (ele.innerHTML = s);

		var summary = _w.foundjsondata ? ["背景：", tdata.name,"，性别：",tdata.sex,"，出生时间：",tdata.birth_time,"，失踪时间：",tdata.lost_time,"，特征描述：", tdata.child_feature].join('') : ["姓名：", tdata.name,"，性别：",tdata.sex,"，年龄：",tdata.birth_time,"，送达福利院时间：",tdata.lost_time,"，宝贝特征：", tdata.child_feature].join('');
		if(summary){
			summary = (_w.foundjsondata ? "#寻找宝贝的父母#" : "#寻找失踪的宝贝#") +summary;
		}
		var stitle = _w.foundjsondata ? "被解救的宝贝详情" : "失踪的宝贝详情";
		var desc = _w.foundjsondata ? "被解救的宝贝在寻找父母，快来参与爱心的传递吧！" : "失踪的宝贝要回家，快来参与爱心的传递吧！";
		///////////////
		QZONE.addShare(_d.getElementById('shareContent'), {
			//	'surl' : location.href,//http://qzs.qq.com/qzone/v6/lostchild/6/lostchild.html
				"surl": "http://qzone.qq.com/gy/404/" + tdata.id + "/lostchild.html",
				'site' : 'QQ空间',
				'summary' : summary || '#宝贝回家#腾讯志愿者用技术点亮公益，让我们一起寻找走失的儿童吧！',
				'stitle' : stitle,
				'pics' : tdata.child_pic,
				'desc' : desc
			});
		///////////////


		getStyle('http://blog.nwy.me/404/style.css');
		initStat();
	}

	function bootstrap(){

		insertNode();

		if(!_w.jsondata){
			getData(
				'http://qzonestyle.gtimg.cn/qzone_v6/lostchild/data.js'
				, insertContent
			);
		}else{
			insertContent();
		}
	}

	function insertNode(){
		var sl = _d.getElementsByTagName('script')
			, tsc
			, len
			;

		if(sl && (len = sl.length)){
			for(var i = 0; i < len; ++i){
				if(sl[i].src.indexOf('http://www.qq.com/404/search_children.js') === 0){
					tsc = sl[i];
					break;
				}
			}

			edt = getP(tsc.src, 'edition');
			ele = _d.createElement('div');
			ele.className = 'mod_lost_child' + (edt === 'small' ? '_little' : '');
			if(tsc.parentNode && (tsc.parentNode.nodeType == 1)){
				tsc.parentNode.insertBefore(ele, tsc);
			}else{
				_d.body.appendChild(ele);
			}
		}
	}


	function getP(s, key) {
		var r = new RegExp("\\?" + key + "=([^\\x20&;]*)")
			, m = s.match(r)
			;
		return (!m ? "" : m[1]);
	}

	function _adjustSize(img, imgD) {
        var maxWidth = 220;
        var maxHeight = 330;
        var offsetLeft, offsetTop;
        if (img.width > 0 && img.height > 0) {
            var widthRate = maxWidth / img.width;
            var heightRate = maxHeight / img.height;
            if (widthRate >= 1) {
                offsetTop = img.height * (heightRate - 1) / 2;
                offsetLeft = 0;
            } else {
                if (heightRate < 1) {
                    if (widthRate >= heightRate) {
                        imgD.width = maxWidth;
                        imgD.height = img.height * widthRate;
                        offsetTop = img.height * (heightRate - widthRate) / 2;
                        offsetLeft = 0;
                    } else {
                        imgD.width = img.width * heightRate;
                        imgD.height = maxHeight;
                        offsetTop = 0;
                        offsetLeft = img.width * (widthRate - heightRate) / 2;
                    }
                } else {
                    offsetTop = img.height * (heightRate - 1) / 2;
                    offsetLeft = img.width * (widthRate - 1) / 2;
                }
            }
        }
        imgD.style.marginLeft = offsetLeft + "px";
        imgD.style.marginTop = offsetTop + "px";
    }

	_w['__lost_child_pic_adjustment'] = function(t){
		var tImg = new Image()
			, iSrc
			, trueH
			, pl
			;

		if(t && (t.tagName == 'IMG')){
			t.onerror = null;
			iSrc = t.getAttribute("data-src");
			tImg.onload = function(){
				if(edt == 'small'){
					if(tImg.width > 120){
						t.width = 120;
						trueH = Math.round(tImg.height * (120 / tImg.width));
						if(trueH < 120 && ele){
							pl = _d.getElementById('__lost_child_support_company');
							pl && (pl.nodeType == 1) && (pl.style.marginLeft = '10px');
						}
					}
				}else{
					_adjustSize(tImg, t);
				}
				
				t.src = iSrc;
			};
			tImg.src = iSrc;
		}
	};

	function route(obj, path){
		obj = obj || {};
		path = String(path);

		var r = reRoute
			, m
			;
	
		r.lastIndex = 0;

		while ((m = r.exec(path)) !== null) {
			obj = obj[m[0]];
			if (obj === undefined || obj === null) {
				break;
			}
		}

		return obj;
	}


	function format(str){
		var args = Array.prototype.slice.call(arguments)
			, v
			;
		str = String(args.shift());
		if (args.length == 1 && typeof(args[0]) == 'object') {
			args = args[0];
		}
		reFormat.lastIndex = 0;
		return str.replace(reFormat, function(m, n){
			v = route(args, n);
			return v === undefined ? m : v;
		});
	}

	function getStyle(srcUrl){
		var cssLink
			;

		cssLink = _d.getElementById("lost_child_style_node");
		if(!cssLink){
			cssLink = _d.createElement("link");
			cssLink.rel = cssLink.rev = "stylesheet";
			cssLink.type = "text/css";
			cssLink.media = "screen";
			cssLink.id = "lost_child_style_node";
			ha.appendChild(cssLink);
			try{
				srcUrl && (cssLink.href = srcUrl);
			}catch(ign){}
		}
	}

	function getData(srcUrl, callback){
		var sc = _d.createElement('script')
			;

		function orc(){
			if(sc.readyState === 'loaded'){
				setTimeout(callback, 0);
			}
		}

		if(sc.addEventListener){
			sc.addEventListener('load', callback, false);
		}else{
			sc.attachEvent('onreadystatechange', orc);
		}

		ha && (ha.appendChild(sc));
		sc.src = srcUrl;
	}

	function resolveData(d){
		var tid
			, len
			, ddata = [];
			;
		if(('object' == typeof d) && d.data && (len = d.data.length)){

			// 加入省市定投逻辑
			// 从符合时效的定投池随机
			for (var i = 0; i < len; i++) {
				var expire = d.data[i].expire;
				// 有指定过期时间
				if (expire && tmnow * 1000 < Date.parse(expire.replace(/\s[\s\S]*$/, '').replace(/\-/g, '/'))) {
					var _c = d.data[i].city, _p = d.data[i].province;
					if ( _c && city) {
						if (('_' + _c + '_').indexOf('_' + city + '_') > -1) {
							ddata.push(d.data[i]);
							continue;
						}
					}
					if ( _p && province) {
						if (('_' + _p + '_').indexOf('_' + province + '_') > -1) {
							ddata.push(d.data[i]);
						}
					}
				}
			}

			tid = Math.floor(Math.random() * (ddata.length || len) );

			tdata = (ddata.length ? ddata : d.data) [(chId = tid)];

			if(_w.foundjsondata){ //β 找到的宝贝
				tdata.ta = tdata.sex.indexOf("女") > -1 ? "她" : "他";
				tdata.name = "“7·18特大拐卖婴儿案”告破，被解救的15名孩子中，2人由亲生父母领回，仍有13名孩子未找到亲生父母，被安置在惠州市社会福利院，" + tdata.ta + "是其中之一。";//(tid + 1) + "号宝宝";
				tdata.url = tdata.url.replace(/#p=(\d{1,2})/,function(a,n){
					return '#p=' + (+n + 1);
				});
				return format(tmpl2, tdata);
			}
			return format(tmpl, tdata);
		}
	}

	var qqDomainNameRE = /\.qq\.com$/i,
		qzoneDomainNameRE = /\bqzone\.qq\.com$/i,
		qzsDomainNameRE = /\bqzonestyle\.gtimg\.cn$/i;

	function initStat(){
		function cb(){
			var url = location.host;
			var src = "";
			if(qzoneDomainNameRE.test(url)){
				src = "qzone";
			}else if(qqDomainNameRE.test(url)){
				src = "qq";
			}else if(qzsDomainNameRE.test(url)){
				src = "qzonestyle";
			}else{
				src = url.replace(".","_");
			} 
			_w.TCISD && _w.TCISD.pv && _w.TCISD.pv('hat.qzone.qq.com', '/gy/lostchild/'+src);
		}
		getData("http://qzonestyle.gtimg.cn/ac/qzfl/stat.js", cb);
	}

	var islocate = getURLQuery ('locate')
		, ct = getURLQuery ('city')
		, prov = getURLQuery ('prov')
		;

	// 关闭定向
	if (islocate == '0' || islocate == '') {
		bootstrap();
	}
	else {
		if (ct || prov) {
			city = ct;
			province = prov;
			bootstrap();
		}
		else {
			window._Callback = function (d) {
				if (d.code == 0) {
					clearTimeout(timeout);
					city = d.data.city_code;
					province = d.data.province_code;
					tmnow = d.data.tm_now;
					bootstrap();
				}
			};
			getData('http://boss.qzone.qq.com/fcg-bin/fcg_zone_info?' + new Date * 1);
			var timeout = setTimeout(function () {
				bootstrap();
			}, 2000);
		}
	}
	 //main entrance

})(window, document);
/*  |xGv00|6f6a1f04c2dff33cf9f11bd4251166a6 */