var joo = joo || {};

joo.common=(function(){
	var init = function(ctx){
		onCreate();
		joo.session.init(ctx);
		joo.index.init();
	};
	var onCreate = function(){
		setContentView();
	};
	var setContentView = function(){};
	return {init:init};
})();
joo.index =(function(){
	var $wrapper,$container,$navbar,js,css,img,ctx,temp;
	var init=function(){
			ctx=$$('x');
			js=$$('j');
			img=$$('i');
			temp=js+'/jooyoul.js';
			$navbar=$('#navbar');;
			$container=$('#container');
			$wrapper=$('#wrapper');
			onCreate();
		};
	var onCreate=function(){
		alert('joo.index.onCreate : ');
		joo.mega.mainbar();     
		 			 					 	
	};
	return{init:init};
})();

joo.session={
      init : function(ctx){
    	  alert('session 진입 ');
	      sessionStorage.setItem('x',ctx);
	      sessionStorage.setItem('j', ctx + '/resources/js');
	      sessionStorage.setItem('i',ctx + '/resources/img');
	      sessionStorage.setItem('c',ctx + '/resources/css');
	   },
      getPath : function(x){
	      return sessionStorage.getItem(x);
	   }
   };
var $$ = function(x){return joo.session.getPath(x);};


joo.mega=(()=>{
	var $wrapper,ctx,img,js,css,temp;
	var init=function(){		
		$container=$('#mega_main');
		$navbar=$('#navbar');
		$wrapper=$('#wrapper');
		ctx=$$('x');
		js=$$('j');
		temp=js+'/jooyoul.js';
		$container.empty();
		$navbar.empty();
	};	
	var mainbar =()=>{
		init();
		$.getScript(temp,()=>{
			alert('mainbar UI: ');
			$container.html(memberUI.mainbar());
			$("#btn_login").click(()=>{								
				alert('로그인');
				joo.mega.loginbox();
			});
			$(".join_btn ul li").eq(1).click(()=>{
				alert('비회원 예매확인 취소');
				joo.mega.nonmember();
			});
			$(".join_btn ul li").eq(2).click(()=>{
				alert('ID/PW찾기');
				joo.mega.findbyidpw();
			});
			$(".join_btn ul li").eq(3).click(()=>{
				alert('회원가입');
				joo.mega.memberadd();
			});
		 });	
	};
	var loginbox =()=>{
		init();
		$.getScript(temp,()=>{
			$('.member_info').after(memberUI.loginbox());
			$('#name_membership_c_mint').click(e=>{
				alert('예매확인/취소');
				$('#myinfo_wrap').attr('class','login_info remove_loginInfo');
				joo.mega.ticketingcancel();
			});
			$(".middle ul li").eq(0).click(e=>{
				alert('나의 메가박스');
				$('#myinfo_wrap').attr('class','login_info remove_loginInfo');
				joo.mega.mymegabox();
			});
			$(".middle ul li").eq(1).click(e=>{
				alert('쿠폰/관람권');
			});
			$(".middle ul li").eq(2).click(e=>{
				alert('스토어 구매내역');
			});
			$(".bottom a").click(e=>{
				alert('로그 아웃');
			});
			$(".myinfo_close").click(e=>{
				$('#myinfo_wrap').attr('class','login_info remove_loginInfo');
			});		 					 	
		 });
		
	};
	
	var memberadd =()=>{
		init();
		$.getScript(temp,()=>{
			$container.html(memberUI.header());
			$container.append(memberUI.memberadd());		
			$("#img_btn_user_input_id_pull-left").click((d)=>{
				alert('ID 중복확인');
//				joo.process.webIdRegisterCheckDupId();
			});
			$("#btn_user_input_address").click(()=>{
				alert('우편번호 검색');
			});
			$("#img_btn_user_cancel_mr7").click(()=>{
				alert('취소');
			});
			$("#img_btn_user_ok_ml7").click(()=>{
				alert('확인');
			}); 
			
		 });	
	};
	var nonmember=()=>{
		init();
		$.getScript(temp,()=>{
			$container.html(memberUI.header());
			$container.append(memberUI.nonmember());
			$("#img_btn_cencel").click(()=>{
				alert('취소');
			});
			$("#img_btn_login").click(()=>{
				alert('로그인');
				joo.mega.ticketingcancel();
			}); 					 	
		 });	
	};
	var ticketingcancel =x=>{
		init();
		$.getScript(temp,()=>{
			alert('ticketingcancel UI: ');
			$container.html(memberUI.ticketingcancel());
			 					 	
		 });	
	};
	var findbyidpw =x=>{
		init();
		$.getScript(temp,()=>{
			$container.html(memberUI.header());
			$container.append(memberUI.findbyidpw());
			$("#img_btn_id").click(e=>{
				alert('간편찾기 확인(ID)');
				/*joo.process.findbyid();*/
				var name=$('#userfind-id-name').val();
		     	var birth=$("input[name=bYear]").val()+$("input[name=bMonth]").val()+$("input[name=bDate]").val();
		     	var phone=$("input[name=mobile1]").val()+'-'+$("input[name=mobile2]").val()+'-'+$("input[name=mobile3]").val();
		     	if(name===""){
		     		alert('이름 입력...');    
		     	}else if(birth===""){
		     		alert('생일 입력...'); 
		     	}else if(phone===""){
		     		alert('휴대폰 번호 입력...');    				     			      			     		     				     	
		     	}else{
		     		alert('ajax ctx'+ctx);
			     	$.ajax({
				  		 url :ctx+'/get/idfind', 
						 method : 'POST',					
						 data  : JSON.stringify({
							 'name' : name,
							 'birth' : birth,
							 'phone' : phone
						 }),
						 contentType : 'application/json',
						 success : d=>{ // d 는 컨트롤러 리턴값.		
							 if(d.msg=="성공") {
								 alert('ajax통신성공    :'+d.member.name+d.member.id);						 					 
								 idalert(d.member.name, d.member.id);	
							 } else {
								 alert('일치하는 이름과 폰번호가 없습니다.');
							 }			
						 },
						 error : (x,s,m)=>{
							alert('ajax에러'+m);
						}
			    	});	
			     	alert('idididid');
		 	   }    
				
			});
			$("#img_btn_pw").click(e=>{
				alert('간편찾기 확인(PW)');
				/*joo.process.findbypw();*/
				var id=$('#find_pw_id2').val();
		     	var name=$("#find_pw_name2").val();
		     	var email=$("#find_pw_email").val();
		     	if(id===""){
		     		alert('아이디 입력...');    
		     	}else if(name===""){
		     		alert('이름 입력...'); 
		     	}else if(email===""){
		     		alert('이메일 입력...');    				     			      			     		     				    	
		     	}else{
		     		alert('ajax ctx'+ctx);
			     	$.ajax({
				  		 url :ctx+'/get/pwfind', 
						 method : 'POST',					
						 data  : JSON.stringify({
							 'id' : id,
							 'name' : name,
							 'email' : email
						 }),
						 contentType : 'application/json',
						 success : d=>{ // d 는 컨트롤러 리턴값.		
							 if(d.msg=="성공") {
								 alert('ajax통신성공    :'+d.member.name+d.member.id);						 					 
								 passalert(d.member.name, d.member.email);	
							 } else {
								 alert('일치하는 아이디와 이름이 없습니다.');
							 }			
						 },
						 error : (x,s,m)=>{
							alert('ajax에러'+m);
						}
			    	});	
			     	alert('pwpwpwpw');
		 	   }    					
			});
			$("#btn-m_btn-st1").click(e=>{
				alert('휴먼계정 복구신청');
			}); 					 	
		 });
	};
	var idalert =(x,y)=>{
		init();
		alert('idalert UI: ');
		$container.html(memberUI.idalert(x,y));
		$(".ca_footer button").click(e=>{
			alert('확인');
			joo.mega.mainbar();
		});	
		$("#id_close").click(e=>{
			alert('닫기');
			joo.mega.mainbar();
		});	
	};
	var passalert =(x,y)=>{
		init();
		alert('passalert UI: ');
		
		$container.html(memberUI.passalert(x,y));
		$("#pw_footer button").click(e=>{
			alert('확인');
			joo.mega.mainbar();
		});
		$("#pw_close").click(e=>{
			alert('닫기');
			joo.mega.mainbar();
		});
	};
	
	var mymegabox =x=>{
		init();
		$.getScript(temp,()=>{
			alert('mymegabox UI: ');
			$container.html(memberUI.mymegabox());
			$("#col3").click(e=>{
				alert('예매확인/취소');
				joo.mega.ticketingcancel();
			});
			$("#col5").click(e=>{
				alert('나의무비스토리');
			});
			$("#col7").click(e=>{
				alert('개인정보수정');
				joo.mega.myinfoupdate();
			});
			$("#myinfo_modify").click(e=>{
				alert('수정하기');
				joo.mega.myinfoupdate();
			});		 					 	
		 });	
	};
	var myinfoupdate =x=>{
		init();
		$.getScript(temp,()=>{
			alert('myinfoupdate UI: ');
			$container.html(memberUI.myinfoupdate());
			$(".personal_info_last button").eq(0).click(e=>{
				alert('비밀번호 변경');
				joo.mega.passchange();				
			});
			$(".personal_info_last button").eq(1).click(e=>{
				alert('회원탈퇴');
				joo.mega.personalquit();
			});		
			$("#update_address").click(()=>{
				alert('우편번호 검색');
			});
			$("#img_btn_user_cancel_mr7").click(()=>{
				alert('취소');
			});
			$("#img_btn_user_ok_ml7").click(()=>{
				alert('확인');
			});
			 					 	
		 });	
	};
	var passchange =x=>{
		init();
		$.getScript(temp,()=>{
			alert('passchange UI: ');
			$container.html(memberUI.passchange());
			$("#pw_change button").eq(0).click(e=>{
				alert('취소');
			});
			$("#pw_change button").eq(1).click(e=>{
				alert('수정');			
			    var id =$$('id');
				var oldpass=$('#inputtext1').val();
		     	var newpass=$("#inputtext2").val();
		     	var confirmpass=$("#inputtext3").val();
		     	if(oldpass===""){
		     		malert("비밀번호 변경", "현재 비밀번호 입력하세요.");		     		   
		     	}else if(newpass===""){
		     		alert('새 비번 입력...');
		     		malert("비밀번호 변경", "새 비밀번호 입력하세요.");
		     	}else if(confirmpass==="" || newpass!==confirmpass){
		     		alert('새 비번 확인 입력...'); 
		     		malert("비밀번호 변경", "새 비밀번호 확인 입력하세요.");
		     	}else{
		     		alert('ajax ctx'+ctx);
			     	$.ajax({
				  		 url :ctx+'/get/pwupdate', 
						 method : 'POST',					
						 data  : JSON.stringify({
							 'oldpass' : oldpass,
							 'newpass' : newpass,
							 'id'      : id
						 }),
						 contentType : 'application/json',
						 success : d=>{ // d 는 컨트롤러 리턴값.		
							 if(d.msg=="성공") {
								 alert('ajax통신성공    :'+d.member.password);						 					 
								 malert("비밀번호 변경", d.member.name+"님 비밀번호가 변경되었습니다.");	
							 } else {
								 alert('비밀번호 변경 실패...');
							 }			
						 },
						 error : (x,s,m)=>{
							alert('ajax에러'+m);
						}
			    	});	
			     	alert('change change');
		 	   }    	
						     	
			});		 					 	
		 });	
	};
	var personalquit =x=>{
		init();
		$.getScript(temp,()=>{
			alert('personalquit UI: ');
			$container.html(memberUI.personalquit());
			$("#member_quit button").eq(0).click(e=>{
				alert('취소');
			});
			$("#member_quit button").eq(1).click(e=>{
				alert('탈퇴');
			});						 	
		 });	
	};
	var malert =(x,y)=>{
		init();
		alert('alert UI: ');
		$container.html(memberUI.malert(x,y));
		$("#").click(()=>{
			alert('확인');
			joo.mega.mainbar();
		});							
	};	
	
	return {init:init,
		mainbar:mainbar,
		loginbox:loginbox,
		memberadd:memberadd,
		nonmember:nonmember,
		ticketingcancel:ticketingcancel,
		findbyidpw:findbyidpw,
		idalert : idalert,
		passalert : passalert,
		mymegabox:mymegabox,
		myinfoupdate:myinfoupdate,
		passchange:passchange,
		personalquit:personalquit,
		malert : malert};
})();


var indexUI = {
		
		br    :()=>{return $('<br/>');},
		div   : x=>{return $('<div/>',{id:x});},
		h1    : x=>{return $('<h1/>',{id:x});},
		span  : x=>{return $('<span/>',{id:x});},
		iTxt  : x=>{return $('<input/>',{id:x,type:'text'});},
		aBtn  : x=>{return $('<a/>',{href:'#', role: 'button', id:x});},
		iBtn  : x=>{return $('<input/>',{id:x,type:'button'});},
		image : (x,y)=>{return $('<img/>',{id:x,src:y});},
		input : (x,y)=>{return $('<input/>',{id:x,type:y});},
		table : x=>{return $('<table/>',{id:x , class:'table'});},
		thead : x=>{return $('<thead/>',{id:x})},
		tbody : x=>{return $('<tbody/>',{id:x})},
		tr : x=>{return $('<tr/>',{id:x})},
		th : ()=>{return $('<th/>')},
		td : ()=>{return $('<td/>')},
		nav: x=>{return $('<nav/>',{id: x});},
		ul : x=>{return $('<ul/>',{id:x})},
		li : ()=>{return $('<li/>')},
		a : ()=>{return $('<a/>',{href:'#'})}
	
};


var memberUI={	
		mainbar : ()=>{
			return '<header class="TopBn_ok">'		
		+'<div class="header-wrap">'
		+'<div class="navigation">'
			+'<div class="logo" id="top_logo">'
				+'<a href="/" title="MEGABOX 메인으로 가기(140)"><img src="http://image2.megabox.co.kr//mop/home/logo_new.png" alt="MEGABOX" class="ie_logo big"></a>'
			+'</div>'
			+'<ul>'
				+'<li><a href="javascript:showMenu()" class="icon i1 " title="영화 바로가기">영화</a></li>'
				+'<li><a href="javascript:showMenu()" class="icon i2 " title="큐레이션 바로가기">큐레이션</a></li>'
				+'<li><a href="javascript:showMenu()" class="icon i3 " title="영화관메인 바로가기">영화관메인</a></li>'
				+'<li><a href="javascript:showMenu()" class="icon i4 " title="특별관 바로가기">특별관</a></li>'
				+'<li><a href="javascript:showMenu()" class="icon i5 " title="스토어 바로가기"><span class="i_new">new</span>스토어</a></li>'
				+'<li><a href="javascript:showMenu()" class="icon i6 " title="이벤트 바로가기">이벤트</a></li>'
				+'<li class="login " id="open_myinfo"><a href="javascript:void(0)" class="icon i7" title="로그인">로그인</a></li>'
			+'</ul>'
		+'</div>   '
		+'<div class="login_info remove_loginInfo open_myinfo_open" id="login_wrap">'
			+'<span class="top"></span>'
			+'<div class="middle">'
				+'<!-- id pw 입력// -->'
				+'<div class="login_input_wrap" id="login_id_view">'
					+'<div class="input_wrap">'
						+'<label for="login-id" class="login-id">아이디</label>'
						+'<input type="text" id="login-id" name="userId" placeholder="아이디" title="아이디입력" maxlength="20" class="mb8" value="" allowtype="hangul number alphabet special" keyenter="input:submit.img_btn.user">'
						+'<label for="login-pw" class="login-pw">비밀번호</label>'
						+'<input type="password" id="login-pw" name="userPw" placeholder="비밀번호" title="비밀번호입력" maxlength="20" value="" keyenter="input:submit.img_btn.user">'
						+'<!-- //id pw 입력 -->'
						+'<p class="clearfix c_purple ck_popup">'
							+'<span class="pull-left">'
								+'<label for="keep_login" class="mr5">아이디 저장</label>'
								+'<span class="icheckbox_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="checkbox" id="keep_login" name="keepLogin" class="style_input" title="아이디 저장" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
								+'<strong class="reep_login_pop">'
									+'<i></i>'
									+'개인정보 보호를 위해<br>'
									+'개인 PC에서만 사용해 주세요.'
									+'<a href="/?menuId=center-faq&amp;p=&amp;p2=로그인+상태+유지+기능+주의+사항" class="go_help" title="도움말 보기">도움말 보기</a><!-- 로그인 상태 유지 기능 주의 사항 검색 -->'
									+'<a href="javascript:void(0)" class="img_btn pop_close" title="로그인 상태유지 도움말 팝업 닫기">로그인 상태유지 도움말 팝업 닫기</a>'
								+'</strong>	'					
								+'</span></p><div class="ad_wrap pull-right">'
									+'<a href="javascript:adHasClick('+"https://www.sepay.org/spm/join?regSiteCode=XF&amp;ctgCode=1&amp;subCode=1"+', 0)" class="ad_box" title=""><img src="http://image2.megabox.co.kr/mop/home/ad/loginad/login_ad_01.png" alt="휴대폰 간편 로그인"></a>'
								+'</div>					'
						+'<p></p>'
						+'<input id ="btn_login" type="submit" value="로그인" title="로그인" class="img_btn user" onclick="login();">'
					+'</div>'
				+'</div>'
			+'</div>'
			+'<div class="join_btn">'
				+'<ul>'
					+'<li class="col1"></li>'
					+'<li class="col2"><a href="javascript:void(0)" onclick="showMenu()" title="비회원 예매확인/취소 바로가기">비회원 예매확인/취소</a></li>'
					+'<li class="col3"><a href="javascript:void(0)" onclick="showMenu()" title="ID/PW찾기">ID/PW찾기</a></li>'
					+'<li class="col4"><a href="javascript:void(0)" onclick="showMenu()" title="회원가입">회원가입</a></li>'
					+'<li class="col5"><a href="javascript:void(0)" onclick="showMenu()" title="휴면계정 복구신청">휴면계정 복구신청</a></li>'
					+'<li class="col6"></li>'
				+'</ul>'
			+'</div>'
				+'<!-- 광고영역추가 -->'
				+'<div class="ad_wrapper">'
				+'<a href="http://mlink-vad.netinsight.co.kr/NetInsight/click?qs=l9N2N2czg0YjQuMWZ4b2cvPGMvc9CYjdXZ91Tdm3WJbYzlm0RdtTTJd0mm1hJJw2mPQ9jjxclNwTmYZcjmtAxbhGmNLM29vZlMuy2cZU2suVxcv2HPLRQ9&amp;tqs=x0Wxd8USMxRNd00PjXHzjjmkrWP25h3bITNZtpNrggTYE2PP1EXmJAD" target="_top" style="background-color:#FFFFFF"><img src="http://mlink-cdn.netinsight.co.kr/4/2017/02/13/77_1486977696.jpg" width="380" height="80" alt="하나카드"></a>'
				+'</div>'
				+'<!-- 광고영역추가// -->	'
			+'<a href="javascript:void(0);" class="login_box_close" title="닫기">닫기</a>'
		+'</div> '
		+'</div>'
		+'</header>';
		},
		loginbox : ()=>{
			return '<div class="login_info remove_loginInfo" id="myinfo_wrap">'
					+'<div class="top">'
						+'<div class="title">'
							+'<p><strong>dinryu117</strong> 님</p>'
							+'<em>일반 </em>'
						+'</div>'
						+'<ul class="info">'
							+'<li>'
								+'<span class="title">멤버십포인트</span>'
								+'<span class="point">0 P</span>'
							+'</li>'
							+'<li class="point_wrap">'
								+'<ul class="icon_list clearfix">'
									+'<li>15.11.24 이전 적립포인트</li>'
									+'<li class="no_icon">0P</li>'
									+'<li>15.11.24 이후 적립포인트</li>'
									+'<li class="no_icon">0P</li>'
								+'</ul>'
							+'</li>'
							+'<li>'
								+'<span class="title">선호영화관</span>'
								+'<span class="my_favor_ck">	'
									+'<a href="/?menuId=theater-detail&amp;region=10&amp;cinema=1561" title="이수 상세보기">이수</a>'
					+'|'
									+'<a href="/?menuId=theater-detail&amp;region=10&amp;cinema=1371" title="센트럴 상세보기">센트럴</a>'
					+'|'
									+'<a href="/?menuId=theater-detail&amp;region=10&amp;cinema=1351" title="코엑스 상세보기">코엑스</a>	'
								+'</span>'
								+'<a href="javascript:void(0)" onclick="MyFavoriteCinema.showPage()" class="focus_pop" title="선호영화관 변경">변경</a>'
							+'</li>'
							+'<li class="mt5">'
								+'<span class="pull-left" style="color: #333;">스페셜멤버십 <a href="/?menuId=membership#menu5" title="스페셜멤버십안내"><spanclass="blind">스페셜멤버십안내</span><i class="fa fa-question-circle" style="color:#503396"></i></a></span>'
							+'<span class="pull-right" id="specialInfoTxt"><a href="/?menuId=specialcontent" style="margin:0;color: #503396" title="스페셜멤버십 가입하기">가입하기</a></span>'	
							+'</li>'
						+'</ul>'
					+'</div>'
					+'<div class="middle">'
						+'<ul>'
//								+'<li><a href="javascript:void(0)" onclick="showMenu('mypage')" title="나의 메가박스 바로가기"><span class="blind">나의 메가박스</span></a></li>'
//								+'<li><a href="javascript:void(0)" class="item2" onclick="showMenu('mypage-coupon')" title="쿠폰/관람권 바로가기"><span class="blind">쿠폰/관람권</span><span+'class="badge">0</span></a></li>'
//								+'<li><a href="javascript:void(0)" class="item3" onclick="showMenu('mypage-shopping')" title="스토어 구매내역 바로가기"><span class="blind">스토어구매내역</+span></'a></li>'
							+'<li><a href="javascript:void(0)" onclick="showMenu()" title="나의 메가박스 바로가기"><span class="blind">나의 메가박스</span></a></li>'
							+'<li><a href="javascript:void(0)" class="item2" onclick="showMenu()" title="쿠폰/관람권 바로가기"><span class="blind">쿠폰/관람권</span><span class="badge">0</span></a></li>'
							+'<li><a href="javascript:void(0)" class="item3" onclick="showMenu()" title="스토어 구매내역 바로가기"><span class="blind">스토어구매내역</span></a></li>'
							+'</ul>'
					+'</div>'
					+'<div class="bottom">'
						+'<span>마지막 로그인</span>'
						+'<span>2017-10-18</span>'
						+'<span>15:35:50</span>'
						+'<a href="javascript:void(0);" onclick="logout()" class="mr10" title="로그아웃">로그아웃</a>'
					+'</div>'
					+'<a href="javascript:void(0);" class="myinfo_close" title="닫기">닫기</a>'
				+'</div>'
			+'<!-- //드롭다운 --> '
			+'</div>'
		+'</header>';
		},
		
		header : ()=>{
			return '<div class="header-btn-wrap">'			
			+'		<button type="button " class="btn_menu_all"><i class="fa fa-bars"></i>전체메뉴</button>'
			+'		<div class="btn_social sub_c ">'
			+'			<a class="film_society" href="/?menuId=specialcontent-filmHome&amp;majorCode=06&amp;minorCode=0601" title="필름 소사이어티 바로가기">필름 소사이어티</a>'
			+'			<i class="split"></i>'
			+'			<a class="classic_society" href="/?menuId=specialcontent-classicHome&amp;majorCode=02&amp;minorCode=0208" title="클래식 소사이어티 바로가기">클래식 소사이어티</a>'
			+'		</div>'
			+'		<div class="btn_theater">'
			+'			<span class="membership_link sub_c ">'
			+'				<a class="membership_txt" href="/?menuId=center" title="고객센터 바로가기">고객센터</a>'
			+'				<i class="split"></i>'
			+'				<a class="membership_txt" href="/?menuId=membership" title="멤버십 바로가기">멤버십</a>'
			+'				<i class="split"></i>'
			+'				<a class="membership_txt" href="/?menuId=membership#menu4" title="VIP 바로가기">VIP</a>'
			+'			</span>'
			+'			<!-- 배경이 투명한 경우 상영시간표 버튼에 class=transparent -->'
			+'  <!--	<button type="button" class="img_btn header btn_time " onclick="showMenu(timetable-movie)">상영시간표</button>-->'
			+'			<button type="button" class="img_btn header btn_time " onclick="showMenu()">상영시간표</button>'
			+'			<button type="button" class="img_btn header btn_reservation focus_modal" data-toggle="modal" data-target="#reservation" onclick="Booking.showPage()">빠른예매</button>'
			+'		</div>'
			+'</div>';			
		},	
		memberheader : ()=>{			
			return 
			'<div class="sub_navi ">'	
			+'<div class="sub_navi_wrap">'
				+'<ul class="clearfix">'
					+'<li>'
						+'<a class="mypage sm01 active" href="javascript:showMenu()" title="나의 메가박스 바로가기">나의 메가박스</a>'
					+'</li>'
				+'</ul>'
			+'</div>'
		+'</div>'
		+'<!-- //header -->'
			+'<div class="width-fixed mypage_main_wrap" style="position: relative;">'
			+'<div class="ad" style="top: 168px; right: -178px;">'
				+'<a href="javascript:adHasClick('+"http://www.megabox.co.kr/?menuId=event&amp;p=detail&amp;p2=4407"+', 0, '+"link"+');" title="">'
					+'<img src="http://image2.megabox.co.kr/mop/home/ad/150x440/160311_film_150x440.jpg" alt="인생의 영화를 만나는 방법 Megabox Film Society">'
				+'</a>'
			+'</div>'
			+'<!-- 고객 만족도조사 발급쿠폰 -->'
			+'<div class="mcsi_coupon_wrap">'
				+'<button class="btn_s_b" data-toggle="modal" data-target="#mcsi_coupon" onclick="mcsiCouponList.showPage()">고객 만족도조사 발급쿠폰</button>'
				+'<div class="modal fade" id="mcsi_coupon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>'
			+'<div class="skt_datacoupon_wrap">'
				+'<button class="btn_s_b" data-toggle="modal" data-target="#skt_data_coupon" onclick="DataCouponList.showPage()">SKT T 데이터쿠폰 확인</button>'
				+'<!-- //tab3 취소내역 -->'
				+'<div class="modal fade" id="skt_data_coupon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>'
			+'</div>'
			+'<ul class="mypage_menu">'
				+'<li><a href="javascript:void(0)" class="col1 " onclick="showMenu()" title="멤버십정보 보기">멤버십정보</a></li>'
				+'<li><a href="javascript:void(0)" class="col2 " onclick="showMenu()" title="포인트교환 보기">포인트교환</a></li>'
				+'<li><a href="javascript:void(0)" class="col3 " onclick="showMenu()" title="예매확인/취소 보기">예매확인/취소</a></li>'
				+'<li><a href="javascript:void(0)" class="col4 " onclick="showMenu()" title="스토어 구매내역 보기">스토어 구매내역</a></li>'
				+'<li>'
					+'<div class="tooltip_area" id="tooltip_area">이제부터 메가박스에서 실제 관람하신 내역을 확인할 수 있어요!<button type="button" onclick="closeMypageMovieNotice()" class="img_btn">닫기</button>'
					+'</div>'
					+'<a href="javascript:void(0)" class="col5 " onclick="showMenu)" title="나의무비스토리 보기">나의무비스토리</a>'
				+'</li>'
				+'<li><a href="javascript:void(0)" class="col6 " onclick="showMenu()" title="관람권/VIP쿠폰 보기">관람권/VIP쿠폰</a></li>'
				+'<li><a href="javascript:void(0)" class="col7 " onclick="showMenu()" title="개인정보수정 보기">개인정보수정</a></li>'
				+'<li><a href="javascript:void(0)" class="col8 " onclick="showMenu()" title="나의문의내역 보기">나의문의내역</a></li>'		
			+'</ul>';			
		},
		nonmember : ()=>{
			return '<div id="main" class="main-content">'			
			+'<form id="nonmemberFrm" method="post" action="/?menuId=mypage-booking">'
				+'<input type="hidden" name="name" value="">'
				+'<input type="hidden" name="birthday" value="">'
				+'<input type="hidden" name="mobileNo" value="">'
				+'<input type="hidden" name="password" value="">'
			+'</form>'
				+'<!-- container// -->'
				+'<div id="container" class="width-fixed">'
					+'<div class="user_wrap">'
						+'<h2 class="mb30">비회원 예매확인/취소</h2>'
						+'<div class="member_no_wrap">		'
							+'<div id="nonmemberContainer" class="input_wrap">'
								+'<ul class="easy_input_wrap">'
									+'<li>'
										+'<label for="login_name">이름</label>'
										+'<div class="inputs">'
											+'<input type="text" title="이름입력" id="login_name" name="name" allowtype="hangul" fieldname="이름" required="">'
										+'</div>'
									+'</li>'
									+'<li>'
										+'<label for="login_birthday">생년월일(YYMMDD)</label>'
										+'<div>'
											+'<input type="text" id="login_birthday" title="생년월일 입력" name="birthday" maxlength="6" allowtype="number" fieldname="생년월일(YYMMDD)" required="">'
										+'</div>'
									+'</li>'
									+'<li>'
										+'<label for="">휴대폰 번호</label>'
										+'<div class="inputs">'
											+'<input type="text" title="휴대폰번호 앞자리 입력" style="width: 67px;" name="mobileNo1" maxlength="3" allowtype="number" fieldname="휴대폰 번호" required="">'
											+'<span>-</span>'
											+'<input type="text" title="휴대폰번호 중간자리 입력" style="width: 67px;" name="mobileNo2" maxlength="4" allowtype="number" fieldname="휴대폰 번호" required="">'
											+'<span>-</span>'
											+'<input type="text" title="휴대폰번호 뒷자리 입력" style="width: 67px;" name="mobileNo3" maxlength="4" allowtype="number" fieldname="휴대폰 번호" required="">'
										+'</div>'
									+'</li>'
									+'<li>'
										+'<label for="login_pw">비밀번호(4자리)</label>'
										+'<div>'
											+'<input type="password" title="비밀번호(4자리) 입력" id="login_pw" name="password" maxlength="4" allowtype="number" fieldname="비밀번호(4자리)" required="">'
										+'</div>'
									+'</li>'
								+'</ul>'
							+'</div> <!-- input_wrap -->'
							+'<div class="btn_wrap clearfix">'
								+'<button type="button" id="img_btn_cencel" class="img_btn user" onclick="UserNonmember.reset()">취소</button>'
								+'<button type="button" id="img_btn_login" class="img_btn user" onclick="UserNonmember.login()">로그인</button>'
							+'</div>'
							+'<ul class="notice">'
								+'<li><i class="fa fa-angle-right"></i>비회원 예매 확인/취소 서비스는 비회원 예매 시 입력하셨던 개인정보를 동일하게 입력하셔야 이용 가능합니다.</li>'
								+'<li><i class="fa fa-angle-right"></i>비회원 로그인 시 비회원 예매 확인/취소 메뉴만 이용 가능합니다.</li>'
								+'<li><i class="fa fa-angle-right"></i>이외의 서비스는 회원 가입 후 이용 가능합니다.</li>'
							+'</ul>'
						+'</div>'
					+'</div> <!-- user_wrap -->'
				+'</div>'
				+'<!-- //container -->'
			+'</div>';				
		},
		ticketingcancel : ()=>{
			return '<div class="sub_navi ">'			
			+'<div class="sub_navi_wrap">'
			+'<ul class="clearfix">'
				+'<li>'
					+'<a class="mypage sm01 " href="javascript:void(0)" onclick="messageBox('+"로그인 후 이용가능한 서비스입니다."+', function() {location.reload(true);});" title="나의 메가박스 바로가기">나의 메가박스</a>'
				+'</li>'
			+'</ul>'
		+'</div>'
	+'<!-- //header -->'
	+'</div>'	
	+'<div id="main" class="main-content">		'
		+'<!-- container// -->'
		+'<div id="container" class="mypage_container">'
			+'<div class="width-fixed mypage_membership_wrap" style="position: relative;">'
				+'<div class="h2_mypage">'
					+'<h3 class="sub_title">  예매 확인/취소 </h3> <span>예매하신 영화 내역과 취소 내역을 확인할 수 있습니다.</span>'
				+'</div>'
				+'<ul class="nav nav-tabs mb40">'
					+'<li class="active"><a href="#tab_list1" data-toggle="tab" title="예매 내역 보기" aria-expanded="true">예매 내역</a></li>'
					+'<li class=""><a href="#tab_list2" data-toggle="tab" onclick="oldList()" title="지난 내역 보기" aria-expanded="false">지난 내역</a></li>'
					+'<li class=""><a href="#tab_list3" data-toggle="tab" onclick="cancelList()" title="취소 내역 보기" aria-expanded="false">취소 내역</a></li>'
				+'</ul>'
				
				+'<div class="tab-content">'
					+'<!-- tab1 예매내역// -->'
					+'<div class="tab-pane active" id="tab_list1">'
						+'<table summary="예매내역" class="data_table">'
							+'<caption class="blind">'
										+'예매내역:NO,예매번호,영화명,영화관,상영일시,예매일,예매취소'
							+'</caption>'
							+'<colgroup>'
								+'<col width="80px">'
								+'<col width="140px">'
								+'<col>'
								+'<col width="100px">'
								+'<col width="110px">'
								+'<col width="80px">'
								+'<col width="110px">'
							+'</colgroup>'
							+'<thead>'
								+'<tr>'
									+'<th scope="col" id="th_booklist_no">NO</th>'
									+'<th scope="col" id="th_booklist_reserveno">예매번호</th>'
									+'<th scope="col" id="th_booklist_moviename">영화명</th>'
									+'<th scope="col" id="th_booklist_cinemaname">영화관</th>'
									+'<th scope="col" id="th_booklist_playdate">상영일시</th>'
									+'<th scope="col" id="th_booklist_saledate">예매일</th>'
									+'<th scope="col" id="th_booklist_refunddate">예매취소</th>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
								+'<tr>'
									+'<td colspan="7" style="height: 201px;">최근 예매 내역이 없습니다.</td>'
								+'</tr>'
							+'</tbody>'
						+'</table>			'
						+'<ul class="custom-pagination mt20">'
						+'</ul>'
					+'</div>'
					+'<!-- //tab1 예매내역 -->'
					+'<!-- tab2 지난내역// -->'
					+'<div class="tab-pane" id="tab_list2">	'
					+'</div>'
					+'<!-- //tab2 지난내역 -->	'
					+'<!-- tab3 취소내역// -->'
					+'<div class="tab-pane" id="tab_list3">	'
					+'</div>'
				+'</div>'
				+'<!-- //tab -->'
				+'<ul class="icon_list mypage mt35 mb70">'
					+'<li>자세한 내용은 아래 유의사항을 확인 해 주세요.</li>'
				+'</ul>'
				+'<ul class="nav nav-tabs mb0">'
					+'<li class="active"><a href="#tab3" data-toggle="tab" title="예매 및 결제 보기">예매 및 결제</a></li>'
					+'<li><a href="#tab4" data-toggle="tab" title="티켓 교환방법 보기">티켓 교환방법</a></li>'
					+'<li><a href="#tab5" data-toggle="tab" title="취소 및 환불규정 보기">취소 및 환불규정</a></li>'
					+'<li><a href="#tab6" data-toggle="tab" title="관람유의사항 보기">관람유의사항</a></li>'
				+'</ul>'
				+'<div class="tab-content mypage_booking_info">'
					+'<!-- tab3// -->'
					+'<div class="tab-pane active" id="tab3">'
						+'<div class="mypage_box_wrap">'
							+'<ul class="icon_list mypage">'
								+'<li>관람 등급을 반드시 확인해주시기 바랍니다.</li>'
								+'<li>만 4세(48개월) 이상부터는 영화티켓을 반드시 구매하셔야 입장 가능합니다.</li>'
								+'<li>홈페이지 예매 현황이 매진인 경우에도 영화관 현장에 잔여석이 남아있는 경우, 현장에서 구매 가능합니다.</li>'
								+'<li>할인 카드로 결제 시, 할인 내역은 청구서에서 확인 가능합니다.</li>'
								+'<li>예매 변경은 불가능하며, 취소 후 재 예매를 하셔야만 합니다.</li>'
								+'<li>영수증은 상영일 기준 약 3개월까지 "나의 메가박스"에서 출력하실 수 있습니다. 단, 신용카드로 예매하신 경우만 한합니다.</li>'
								+'<li>상영시간 이후 관람하신 영화의 영수증 출력을 원하실 경우, 관람하신 영화관에서 출력 가능합니다.</li>'
								+'<li>취소하신 내역이 나타나지 않거나 궁금하신 사항이 있으시면, <strong class="c_purple">고객센터 &gt; 1:1문의</strong> 또는 ARS(1544-0070 09:00~21:00)로 문의해 주시기 바랍니다.</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
					+'<!-- //tab3 -->'
					+'<!-- tab4// -->'
					+'<div class="tab-pane " id="tab4">'
						+'<div class="mypage_box_wrap">'
							+'<ul class="icon_list mypage">'
								+'<li>무인 발매기(키오스크)에서 발권하실 경우 예매번호를 입력하시면 티켓을 편하게 발권하실 수 있습니다.</li>'
								+'<li>매표소에서 발권하실 경우 티켓교환권을 출력하여 매표소에 방문하시면 티켓으로 교환하실 수 있습니다.</li>'
								+'<li>(티켓교환권 출력이 어려운 경우, 예매번호와 신분증을 지참하시면 매표소에서 티켓을 수령하실 수 있습니다.)</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
					+'<!-- //tab4 -->'
					+'<!-- tab5// -->'
					+'<div class="tab-pane " id="tab5">'
						+'<div class="mypage_box_wrap">'
							+'<ul class="icon_list mypage">'
								+'<li>현장 취소를 하는 경우 상영시간 이전까지만 가능하며, 상영시간 이후 취소나 환불은 되지 않습니다.</li>'
								+'<li>홈페이지 또는 모바일에서 예매한 내역을 취소 할 경우 부분 취소는 불가능합니다.</li>'
								+'<li>온라인(홈페이지/모바일) 예매 취소는 상영시간 20분전까지 입니다.</li>'
								+'<li>위탁 예매 사이트 이용 시 취소 및 환불 규정은 해당 사이트 규정을 따릅니다.</li>'
								+'<li>LIVE 공연 콘텐트는 취소 기준은 아래와 같습니다.</li>'
								+'<li class="no_bg_tab_tx">- 관람 4일전 : 취소 가능</li>'
								+'<li class="no_bg_tab_tx">- 관람 3일 ~ 1일전 : 취소 수수료 부담 후 취소 가능</li>'
								+'<li class="no_bg_tab_tx">- 관람 당일 : 취소 및 환불 불가</li>'
								+'<li>공연 관람시 시작 시간 이후에는 입장이 제한 됩니다.</li>'
								+'<li><strong class="c_purple">발권된 티켓은 상영시간 전까지 현장 방문 시에만 취소가 가능합니다.</strong></li>'
							+'</ul>'
						+'</div>'
					+'</div>'
					+'<!-- //tab5 -->'
					+'<!-- tab6// -->'
					+'<div class="tab-pane " id="tab6">'
						+'<div class="mypage_box_wrap">'
							+'<ul class="icon_list mypage">'
								+'<li>지연입장에 의한 관람불편을 최소화하고자 본 영화는 약 10분 후 시작됩니다.</li>'
								+'<li>쾌적한 관람 환경을 위해 상영시간 이전에 입장 부탁드립니다.</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
					+'<!-- //tab3 -->'
				+'</div>'
			+'</div>'
		+'</div>'
		+'<!-- //container -->'
		+'<!-- 예매 상세 정보// -->'
		+'<div class="modal fade" id="mypage_booking_detail" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
			+'<div id="mypageBookingDetail"></div>'
		+'</div><!-- /.modal -->'
		+'<!-- //예매 상세 정보 -->'
	+'</div>';
		},
		findbyidpw : ()=>{
			return '<div class="content_wrap">'			
   			+'<div class="sub_navi user_join">'
				+'<div class="sub_navi_wrap">'
					+'<ul class="clearfix">		'
					+'</ul>'
				+'</div>'
		+'<!-- //header -->'
			+'</div>	'
		+'<!-- //sub menu -->'
			+'<div id="main" class="main-content">'
			+'<form name="form_ipin" method="post">'
				+'<input type="hidden" name="m" value="pubmain">						<!-- 필수 데이타로, 누락하시면 안됩니다. -->'
			    +'<input type="hidden" name="enc_data" value="AgEERDQ0MUNdOZc0TmJo0rDK9O6sRi1fs0bRFkpeYUcDL7M2c8mMJU8WBj7cFjfYcjXYoky1ih+aYM0fxnEL4st/xFoB+7Arc1owsD3ARbOxAO5g0ZFq3JcatdMLSSHFQCnuPK+Hchy6ONc5q4AOYOg5maqLksgDZWiE/dd9ja2sCQvW20xV9Ml3XVADdS3cAcnQ9JDAPoIY91cljRbpwMKwl0FBecKPwGTbpe/4QBwz1YWc1uIe4AA7ptv7AX8kXrms06VI3FuzH0l0cEXonEUuXtFBvd0UlDxStQfggiBBFw/EcjkUyHIDIok3MCLVDusKUmdoNQ==">	<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->	'
			    +'<!-- 업체에서 응답받기 원하는 데이타를 설정하기 위해 사용할 수 있으며, 인증결과 응답시 해당 값을 그대로 송신합니다.'
			    	 +'해당 파라미터는 추가하실 수 없습니다. -->'
			    +'<input type="hidden" name="param_r1" value="">'
			    +'<input type="hidden" name="param_r2" value="">'
			+'</form>	'
			+'<!-- 본인인증 서비스 팝업을 호출하기 위해서는 다음과 같은 form이 필요합니다. -->'
			+'<form name="form_chk" method="post">'
				+'<input type="hidden" name="m" value="checkplusSerivce">				<!-- 필수 데이타로, 누락하시면 안됩니다. -->'
				+'<input type="hidden" name="EncodeData" value="AgAFRzI0ODmuPAACzOZb2304PcrmI94I4KZKNkwMLvnEjNsSFUg40UqVQtPP1JsYDQ8UsQvjPaSH4YaG69rVfZ9lLHhGRIN4BDUKvEJEQhF1mpKyvRc1WPbC4h+3OTYRtY6hKLMWSCMhJjyD1TiuZqKIQYcn+RqoA2VohP3XfY2trAkL1ttMVcPmXbnCesCiYWlDa2LDMwOXyM9hCq7JNX0mvs2ecc0mZT4/vWTAVXfgjvOuNBmrgIT2sU5UkZLBDIcBG3b6zzNXEz15ZLa60kRPMPBXr+3bT3QtVijVv5UsBaGFpPsB7VAu9P38hBmRzX8F0rznTWC9PC5q00V91bGEOD6+u5H1iuNtgcX6xZCTcnc2YE7OBN8AJiM00C+VkV9pzQPIlJM1psq/lSSi/ADS3HrKCCLN/nXCsjVouHCeyNZy1ZczmvD+JDbRY6LwC6BNKVBUKEYblLpGIXDkYXrvUcXGRNuQuXaVthPu7xio9bp7XyOSh0yHppv3kTiEQs87yqOxpNT3ilZ0mG+6EtNUN1qek9By">		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->	'
			    +'<!-- 업체에서 응답받기 원하는 데이타를 설정하기 위해 사용할 수 있으며, 인증결과 응답시 해당 값을 그대로 송신합니다.'
				    	 +'해당 파라미터는 추가하실 수 없습니다. -->'
				+'<input type="hidden" name="param_r1" value="">'
				+'<input type="hidden" name="param_r2" value="">'
			+'</form>'
			+'<!-- container// -->'
				+'<div id="container" class="width-fixed">'
					+'<div class="user_wrap">'
						+'<h2 class="mb12">아이디 / 비밀번호 찾기</h2>'
					+'</div> <!-- user_wrap -->'
					+'<div class="find_id_notice">'
						+'<p>아이핀을 이용하여 회원에 가입하신 경우에는 회사가 회원님의 주민등록번호를 보유하고 있지 않은 관계로, 아이핀 등록기관의 실명확인 및 본인인증 서비스와 연계하여 아이디 및 패스워드 찾기 서비스가 제공되오니 참고하여 주시기 바랍니다. (실명확인 및 본인인증서비스 제공 기관 : 나이스신용평가정보㈜)<br>본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집 하며, 인증 이외의 용도로 이용 또는 저장하지 않습니다.</p>'
						+'<p>* 이용안내 <span>고객센터 &gt; 1:1</span>문의 또는 <span>ARS 1544-0070</span> (09:00~21:00)</p>'
					+'</div>'
					+'<div class="find_id_input_wrap">'
						+'<div class="find_id tab_wrap">'
							+'<h3>아이디 찾기</h3>'
							+'<ul class="nav nav-tabs">'
								+'<li class="active"><a href="#find_id_easy" data-toggle="tab" title="간편 아이디 찾기">간편찾기</a></li>'
								+'<li class=""><a href="#find_id_hard" data-toggle="tab" title="본인인증으로 아이디 찾기">본인인증으로 찾기</a></li>'
							+'</ul>'
							+'<div class="tab-content">'
								+'<!-- 아이디 간편찾기// -->'
								+'<div class="tab-pane active" id="find_id_easy">'
									+'<ul class="easy_input_wrap">'
										+'<li>'
											+'<label for="userfind-id-name">이름</label>'
											+'<div class="inputs">'
												+'<input type="text" title="이름" id="userfind-id-name" name="memberName" style="width: 199px;" maxlength="30" fieldname="이름" allowtype="hangul number alphabet" required="">'
											+'</div>'
										+'</li>'
										+'<li>'
											+'<label for="">법정생년월일</label>'
											+'<div class="inputs birthday">'
												+'<input type="text" title="생년월일 년도 입력" name="bYear" style="width: 67px;" maxlength="4" fieldname="법정생년월일" allowtype="number" validate="number" required="">'
												+'<span>년</span>'
												+'<input type="text" title="생년월일 월 입력" name="bMonth" style="width: 44px;" maxlength="2" fieldname="법정생년월일" allowtype="number" validate="number" required="">'
												+'<span>월</span>'
												+'<input type="text" title="생년월일 일 입력" name="bDate" style="width: 44px;" maxlength="2" fieldname="법정생년월일" allowtype="number" validate="number" required="">'
												+'<span>일</span>'
											+'</div>'
										+'</li>'
										+'<li>'
											+'<label for="">휴대폰</label>'
											+'<div class="inputs">'
												+'<input type="text" title="휴대폰 앞자리 입력" name="mobile1" style="width: 67px;" maxlength="3" fieldname="휴대폰" allowtype="number" validate="number" required="">'
												+'<span>-</span>'
												+'<input type="text" title="휴대폰 중간자리 입력" name="mobile2" style="width: 67px;" maxlength="4" fieldname="휴대폰" allowtype="number" validate="number" required="">'
												+'<span>-</span>'
												+'<input type="text" title="휴대폰 뒷자리 입력" name="mobile3" style="width: 67px;" maxlength="4" fieldname="휴대폰" allowtype="number" validate="number" required="">'
											+'</div>'
										+'</li>'
									+'</ul>'
									+'<div class="submit_wrap">'
										+'<button type="button" id="img_btn_id" class="img_btn user"><span class="blind">확인</span></button> '
									+'</div>'
								+'</div>'
								+'<!-- //아이디 간편찾기 -->'
								+'<!-- 아이디 본인인증으로 찾기// -->'
								+'<div class="tab-pane" id="find_id_hard">'
									+'<div class="find_hard_wrap">'
										+'<h4 class="pt50">아이핀(i-PIN)으로 찾기</h4>'
	                                    +'<button type="button" title="새 창 열림" class="img_btn user mt13 mb40" onclick="#">인증기관을 통해 인증 후 확인</button>'
										+'<h4>휴대폰으로 찾기</h4>'
	                                    +'<button type="button" title="새 창 열림" class="img_btn user mt13" onclick="#">인증기관을 통해 인증 후 확인</button>'
									+'</div>'
								+'</div>'
								+'<!-- //아이디 본인인증으로 찾기 -->'
							+'</div>'
						+'</div>'
						+'<div class="find_pw tab_wrap">'
							+'<h3>비밀번호 찾기</h3>'
							+'<ul class="nav nav-tabs">'
								+'<li class="active"><a href="#find_pw_easy" data-toggle="tab" title="간편 비밀번호 찾기">간편찾기</a></li>'
								+'<li class=""><a href="#find_pw_hard" data-toggle="tab" title="본인인증으로 비밀번호 찾기">본인인증으로 찾기</a></li>'
							+'</ul>		'
							+'<div class="tab-content">'
								+'<!-- 비번 간편찾기// -->'
								+'<div class="tab-pane active" id="find_pw_easy">'
									+'<div class="radio_wrap">'
										+'<span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" title="휴대폰 선택" id="pw_mobile1" name="find_pw_easy_radio" value="1" class="icheck" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
										+'<label for="pw_mobile1">이메일</label>'
									+'</div>'
									+'<!-- 휴대폰// -->'
									+'<ul id="find_pw_easy_mobile" class="easy_input_wrap">'
										+'<li>'
											+'<label for="find_pw_id2">아이디</label>'
											+'<div class="inputs">'
												+'<input type="text" title="아이디입력" id="find_pw_id2" name="webID" maxlenth="16" style="width: 199px;" fieldname="아이디" allowtype="number hangul alphabet special" required="">'
											+'</div>'
										+'</li>'
										+'<li>'
											+'<label for="find_pw_name2">이름</label>'
											+'<div class="inputs">'
												+'<input type="text" title="이름입력" id="find_pw_name2" name="memberName" maxlength="30" style="width: 199px;" fieldname="이름" allowtype="hangul number alphabet" required="">'
											+'</div>'
										+'</li>		'
										+'<li>'
										/*
											+'<label for="">휴대폰</label>'
											+'<div class="inputs">'
												+'<input type="text" title="휴대폰 앞자리 입력" name="mobile1" maxlength="3" style="width: 67px;" fieldname="휴대폰" allowtype="number" validate="number" required="">'
												+'<span>-</span>'
												+'<input type="text" title="휴대폰 중간자리 입력" name="mobile2" maxlength="4" style="width: 67px;" fieldname="휴대폰" allowtype="number" validate="number" required="">'
												+'<span>-</span>'
												+'<input type="text" title="휴대폰 뒷자리 입력" name="mobile3" maxlength="4" style="width: 67px;" fieldname="휴대폰" allowtype="number" validate="number" required="">'
											+'</div>'
										*/	
											+'<label for="">이메일</label>'
											+'<div class="inputs">'
												+'<input type="text" id="find_pw_email" title="이메일 입력" name="email" maxlength="30" style="width: 199px;" fieldname="이메일" allowtype="text" validate="text" required="">'												
											+'</div>'
										+'</li>'
									+'</ul>'
									+'<!-- 휴대폰// -->		'
									+'<!-- 이메일// -->'
									+'<ul id="find_pw_easy_email" class="easy_input_wrap" style="display: none;margin-bottom:4px;">'
										+'<li>'
											+'<label for="find_pw_id1">아이디</label>'
											+'<div class="inputs">'
												+'<input type="text" title="아이디입력" id="find_pw_id1" name="webID" maxlength="16" style="width: 199px;" allowtype="alphabet number hangul special" fieldname="아이디" required="">'
											+'</div>'
										+'</li>		'
										+'<li>'
											+'<label for="find_pw_name1">이름</label>'
											+'<div class="inputs">'
												+'<input type="text" title="이름입력" id="find_pw_name1" name="memberName" maxlength="30" style="width: 199px;" allowtype="hangul number alphabet" fieldname="이름" required="">'
											+'</div>'
										+'</li>		'
										+'<li>'
											+'<label for="find_pw_mail">이메일</label>'
											+'<div class="inputs">'
												+'<input type="text" title="이메일입력" id="find_pw_mail" name="emailAddr" maxlength="30" style="width: 199px;" validate="email" fieldname="이메일" required="">'
											+'</div>'
											+'<p class="ex_tx">* 회원 정보에 등록된 이메일 주소</p>'
										+'</li>'
									+'</ul>'
									+'<!-- 이메일// -->'
									+'<div class="submit_wrap">'
										+'<button type="button" id="img_btn_pw" class="img_btn user" onclick="UserFind.searchPw()"><span class="blind">확인</span></button>'
									+'</div>'
								+'</div>'
								+'<!-- //비번 간편찾기 -->		'
								+'<!-- 비번 본인인증으로 찾기// -->'
								+'<div class="tab-pane" id="find_pw_hard">'
									+'<div class="find_hard_wrap">'
										+'<div class="radio_wrap pt45" aria-checked="true">'
											+'<span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" title="비밀번호 본인인증 아이핀 선택" id="user_radio1" name="find_pw_radio" value="IPIN" class="icheck" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
											+'<label for="user_radio1" class="mr9">아이핀(i-PIN)</label>'
											+'<span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" title="비밀번호 본인인증 휴대폰 선택" id="user_radio2" name="find_pw_radio" value="PHONE" class="icheck" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
											+'<label for="user_radio2">휴대폰</label>'
										+'</div>'
										+'<p>인증기관을 통해 인증이 확인 되면 비밀번호를<br>초기화 하고 새로운 비밀번호를 등록 할 수 있습니다.</p>'
										+'<div class="find_pw_hard_input">'
											+'<label for="find_pw_ipin" class="mr8">아이디</label>'
											+'<div class="inputs">'
												+'<input type="text" title="아이디 입력" id="find_pw_ipin" name="web_Id" maxlength="16" style="width: 199px;" allowtype="alphabet number">'
											+'</div>'
										+'</div>'
										+'<button type="button" class="img_btn user mt13" title="새 창 열림" onclick="findPasswordByAuth()">인증기관을 통해 인증 후 확인</button>'
									+'</div>'
								+'</div>'
								+'<!-- //비번 본인인증으로 찾기 -->'
							+'</div>'
						+'</div>'
					+'</div>'
					+'<!-- 휴면계정 추가//  -->'
					+'<div class="resting_idpw_wrap clearfix">'
						+'<h2 class="h2_margin">휴면계정 복구안내</h2>'
						+'<p>2015년 8월 18일 부로 정보통신망법 제16조 1항에 따라 메가박스 온라인서비스를 1년이상 이용하지 않을 경우 가입하신 정보는 안전하게 분리보관되며 서비스 재이용을 원하실 경우 「휴면계정 복구신청」후 이용하실 수 있습니다.</p>'
						+'<button id="btn-m_btn-st1" class="btn-m btn-st1" onclick="#">휴면계정 복구신청</button>'
					+'</div>'
					+'<!-- //휴면계정 추가  -->		'
					+'<!-- 광고// -->'
					+'<div class="ad">'
						+'<a href="javascript:adHasClick('+"http://www.megabox.co.kr/?menuId=special&amp;screenType=04"+', 0, '+"link"+');" title="">'
							+'<img src="http://image2.megabox.co.kr/mop/home/user/ad.jpg" alt="모두가 꿈꿔온 달빛아래 영화관 OPEN M 백석 Season2">'
						+'</a>'
					+'</div>'
					+'<!-- //광고 -->		'
				+'</div>		'
			+'<!-- //container -->	'
			+'</div>'
		+'</div>';
		},
		idalert : (x,y) =>{
			return '<div class="custom_alert" style="position: absolute; top: 289.5px; left: 273.5px;">		'			
			+'<div class="ca_header">			'
				+'<h6>알림</h6>		'
			+'</div>		'
			+'<div class="ca_body">			'
				+'<p id="idtag">['+x+']님의 아이디는 ['+y+'] 입니다.</p>'
				+'&nbsp&nbsp<p id="datetag"></p>'
				/*가입일:2017-07-06*/
			+'</div>		'
			+'<div class="ca_footer">			'
				+'<button type="button" class="img_btn booking ok" onmousedown="" autofocus="" >확인</button>		'
			+'</div>		'
			+'<button type="button" id="id_close" class="img_btn booking btn_ca_close" onmousedown="">알림닫기</button>	'
		+'</div>';
		},
		passalert : (x,y)=>{
			return '<div class="custom_alert" style="top: 243.5px; left: 273.5px;">'			
			+'<div class="ca_header">'
				+'<h6>인증번호 확인</h6>'
//					+'<button type="button" class="img_btn booking btn_ca_close" onclick="closeMessageBox('messageBox_authNo', 'custom')">닫기</button>'
				+'<button type="button" id="pw_close" class="img_btn booking btn_ca_close" >닫기</button>'
			+'</div>'
			+'<div class="ca_body">'
				/*+'<p>고객님의 휴대폰 번호로 인증 번호를 발송하였습니다.<br>인증번호를 확인한 후 입력해주세요.</p>'*/
				+'<p>'+x+' 고객님의 이메일['+y+']로 비밀번호를 발송하였습니다.<br>비밀번호를 확인한 후 로그인해주세요.</p>'
			+'</div>'
			+'<!-- 비밀번호// -->'
			/*
			+'<div class="ca_new_password">'
				+'<ul>'
					+'<li>'
						+'<strong>인증번호</strong>'
						+'<span>'
							+'<input type="password" title="인증번호 입력" name="authNo" maxlength="4">'
						+'</span>'
					+'</li>'
				+'</ul>'
			+'</div>'
            */
			+'<div class="ca_footer" id="pw_footer">'
				+'<button type="button" class="img_btn booking ok" onclick="UserFind.confirmAuthNo()">확인</button>'
			+'</div>'
		+'</div>';

		},
		mymegabox : ()=>{
			return	'<div class="sub_navi ">'	
			+'<div class="sub_navi_wrap">'
			+'<ul class="clearfix">'
				+'<li>'
//					    +'<a class="mypage sm01 active" href="javascript:showMenu('mypage-main')" title="나의 메가박스 바로가기">나의 메가박스</a>'
					+'<a class="mypage sm01 active" href="javascript:showMenu()" title="나의 메가박스 바로가기">나의 메가박스</a>'
				+'</li>'
			+'</ul>'
		+'</div>'
	+'</div>'
	+'<!-- //header -->'
	+''
	+'<div id="main" class="main-content">'
	+''
	+'<div id="container" class="mypage_container">'
		+'<div class="width-fixed mypage_main_wrap" style="position: relative;">'
		+'<div class="ad" style="top: 168px; right: -178px;">'
//				+'<a href="javascript:adHasClick('http://www.megabox.co.kr/?menuId=event&amp;p=detail&amp;p2=4407', 0, 'link');" title="">'
			+'<a href="javascript:adHasClick('+"http://www.megabox.co.kr/?menuId=event&amp;p=detail&amp;p2=4407"+', 0, '+"link"+');" title="">'
				+'<img src="http://image2.megabox.co.kr/mop/home/ad/150x440/160311_film_150x440.jpg" alt="인생의 영화를 만나는 방법 Megabox Film Society">'
			+'</a>'
		+'</div>'
		+'<!-- 고객 만족도조사 발급쿠폰 -->'
		+'<div class="mcsi_coupon_wrap">'
			+'<button class="btn_s_b" data-toggle="modal" data-target="#mcsi_coupon" onclick="mcsiCouponList.showPage()">고객 만족도조사 발급쿠폰</button>'
			+'<div class="modal fade" id="mcsi_coupon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>'
		+'</div>'
		+'<div class="skt_datacoupon_wrap">'
			+'<button class="btn_s_b" data-toggle="modal" data-target="#skt_data_coupon" onclick="DataCouponList.showPage()">SKT T 데이터쿠폰 확인</button>'
			+'<!-- //tab3 취소내역 -->'
			+'<div class="modal fade" id="skt_data_coupon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>'
		+'</div>'
		+'<ul class="mypage_menu">'				
			+'<li><a href="javascript:void(0)" id="col1" class="col1 " onclick="showMenu()" title="멤버십정보 보기">멤버십정보</a></li>'
			+'<li><a href="javascript:void(0)" id="col2" class="col2 " onclick="showMenu()" title="포인트교환 보기">포인트교환</a></li>'
			+'<li><a href="javascript:void(0)" id="col3" class="col3 " onclick="showMenu()" title="예매확인/취소 보기">예매확인/취소</a></li>'
			+'<li><a href="javascript:void(0)" id="col4" class="col4 " onclick="showMenu()" title="스토어 구매내역 보기">스토어 구매내역</a></li>'
			+'<li>'
				+'<div class="tooltip_area" id="tooltip_area">이제부터 메가박스에서 실제 관람하신 내역을 확인할 수 있어요!<button type="button" onclick="closeMypageMovieNotice()" class="img_btn">닫기</button>'
				+'</div>'
				+'<a href="javascript:void(0)" id="col5" class="col5 " onclick="showMenu)" title="나의무비스토리 보기">나의무비스토리</a>'
			+'</li>'
			+'<li><a href="javascript:void(0)" id="col6" class="col6 " onclick="showMenu()" title="관람권/VIP쿠폰 보기">관람권/VIP쿠폰</a></li>'
			+'<li><a href="javascript:void(0)" id="col7" class="col7 " onclick="showMenu()" title="개인정보수정 보기">개인정보수정</a></li>'
			+'<li><a href="javascript:void(0)" id="col8" class="col8 " onclick="showMenu()" title="나의문의내역 보기">나의문의내역</a></li>'
			
		+'</ul>'
			+'<h2>유주열 님, 오늘도 영화처럼 멋진 하루 되세요!</h2>'
			+'<div class="row1 mb20">'
				+'<div class="title">'
					+'<span class="ml20">2017년 일반</span>'					
//						+'<button class="ml16 popup_focus" title="과거 등급 조회" onclick="customMessageBox('pastGradePopup')"><img src="http://image2.megabox.co.kr/mop/home/+mypage/main_btn1.jpg" alt="과거 등급 조회"></button>				'
					+'<button class="ml16 popup_focus" title="과거 등급 조회" onclick="customMessageBox()"><img src="http://image2.megabox.co.kr/mop/home/+mypage/main_btn1.jpg" alt="과거 등급 조회"></button>				'
				+'</div>'
				+'<div class="special_txt_wrap">		'
				+'</div>'
				+'<div class="cols col1">'
					+'<div class="h3_wrap pt13">'
						+'<h3><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title1.png" alt="멤버십 포인트"></h3>'						
//							+'<button title="더보기" onclick="showMenu('mypage-membership')"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'
						+'<button title="더보기" onclick="showMenu()"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'
					+'</div>'
					+'<div class="point_wrap">'
						+'<strong>현재 보유 포인트</strong>'
						+'<strong class="point_wrap_bottom c_purple">0P</strong>'
					+'</div>'
					+'<dl class="point_amount clearfix">'
						+'<dt><i class="fa fa-angle-right c_mint"></i> 2015.11.24 이전 적립 포인트</dt>'
						+'<dd>0P</dd>'
						+'<dt><i class="fa fa-angle-right c_mint"></i> 2015.11.24 이후 적립 포인트</dt>'
						+'<dd>0P</dd>'
					+'</dl>'
//						+'<button class="btn-s btn-st2 pull-right" title="멤버십 포인트 교환" onclick="showMenu('mypage-pointExchange')">멤버십 포인트 교환 <i class="fa fa-angle-right"></i></button>'
					+'<button class="btn-s btn-st2 pull-right" title="멤버십 포인트 교환" onclick="showMenu()">멤버십 포인트 교환 <i class="fa fa-angle-right"></i></button>'
				+'</div>'
				+'<div id="myPageMainPoint" class="cols col2">'
	+'<ul>'
		+'<li class="mt10 mb5">'
			+'<strong>2017년 누적포인트</strong>'
			+'<strong>0P</strong>'
		+'</li>'
		+'<li>'
			+'<strong class="t_content"><i class="fa fa-angle-right c_mint"></i> 티켓 구매 누적포인트</strong>'
			+'<strong>0P</strong>'
		+'</li>'
		+'<li class="mb7 pb5 bdb">'
			+'<strong class="t_content"><i class="fa fa-angle-right c_mint"></i> 이벤트 누적포인트</strong>'
			+'<strong>0P</strong>'
		+'</li>'
		+'<li class="mb7 pb5 bdb">'
			+'<strong>소멸예정 포인트</strong>'
			+'<strong>0P</strong>'
			+'<p class="clearfix clear">'
				+'<small class="fz12 t_sub">(2017년 10월 31일 영업종료시)</small>'
				+'<button class="btn_s_b pull-right sm_focus" title="상세내역" onclick="MyPageExtinctionPointPopup.showPage()">+ 더보기</button>'
			+'</p>'
		+'</li>'
		+'<li>'
			+'<strong>2017년 관람한 영화 편수</strong>'
			+'<strong>0편</strong>'
			+'<p class="clearfix clear">'
				+'<small class="fz12 t_sub">(서로 다른 영화 기준)</small>'
			+'</p>'
		+'</li>'
	+'</ul>'
	+'</div>'
				+'<div id="myPageMainCoupon" class="cols col3">'
	+'<div class="h3_wrap pt13">'
		+'<h3><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title2.png" alt="관람권 / VIP쿠폰"></h3>'
//			+'<button title="더보기" onclick="showMenu('mypage-coupon')"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'		
		+'<button title="더보기" onclick="showMenu()"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'
	+'</div>'
	+'<ul>'
		+'<li>'
			+'<strong>사용가능한 VIP 영화 쿠폰</strong>'
			+'<strong>0매</strong>'
		+'</li>'
		+'<li>'
			+'<strong>사용가능한 VIP 매점 쿠폰</strong>'
			+'<strong>0매</strong>'
		+'</li>'
		+'<li>'
			+'<strong>사용가능한 관람권</strong>'
			+'<strong>0매</strong>'
		+'</li>'
		+'<li>'
			+'<strong>사용가능한 기타쿠폰</strong>'
			+'<strong>0매</strong>'
		+'</li>'
	+'</ul>'
//		+'<button class="pull-right" title="등록하기" onclick="showMenu('mypage-coupon', 'register')"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn4.jpg" +alt="등록하기"></'button>'
	+'<button class="pull-right" title="등록하기" onclick="showMenu()"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn4.jpg" alt="등록하기"></button>'
	+'</div>'
			+'</div>'
			+'<div class="row2 mb30">'
				+'<ul class="overflowV" style="height:69px;">'
//					+'<li><a class="displ_b" href="javascript:void(0);" onclick="showMenu('membership')" title="메가박스 멤버십 안내 페이지로 이동"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn10.jpg" alt="메가박스 멤버십 안내"></a></li>'
				+'<li><a class="displ_b" href="javascript:void(0);" onclick="showMenu()" title="메가박스 멤버십 안내 페이지로 이동"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn10.jpg" alt="메가박스 멤버십 안내"></a></li>'
					+'<li><a class="displ_b" href="/?menuId=membership#menu4" title="VIP ZONE 페이지로 이동"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn11.jpg" alt="VIP ZONE"></a></li>'
					+'<li><a class="displ_b" href="http://www.megabox.co.kr/?menuId=event&amp;p=detail&amp;p2=4000" title="포인트 자동소멸 및 제도 개선 안내 페이지로 이동"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn13.jpg" alt="포인트 자동소멸 및 제도 개선 안내"></a></li>'
				+'</ul>'
			+'</div>'
			+'<div class="row3">'
				+'<div class="cols col1">'
					+'<!-- 개인정보 -->'
					+'<div id="myPageMainUser" class="mypage_main_personal">'
	+'<div class="h3_wrap mb35">'
		+'<h3><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title3.png" alt="개인정보"></h3>'			
//		+'<button title="수정하기" onclick="showMenu('mypage-myinfo')"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn5.jpg" alt="수정하기"></button>'
		+'<button id="myinfo_modify" title="수정하기" onclick="showMenu()"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn5.jpg" alt="수정하기"></button>'
	+'</div>'
	+'<ul>'
		+'<li>'
			+'<strong>휴대폰</strong>'
			+'<span>'
	+'010-****-6789'
			+'</span>'
		+'</li>'
		+'<li>'
			+'<strong>선호 영화관</strong>'
			+'<span>'
	+'이수|'
	+'센트럴|'
	+'코엑스'
			+'</span>'
		+'</li>'
		+'<li>'
			+'<strong>SMS수신여부</strong>'
			+'<span class="btn_sms">'
				+'<button class="no active" title="거부 선택됨" onclick="MyPageMain.setSmsReceiveYn('+"N"+')" value="거부">거부</button>'
				+'<button class="yes" title="수신 " onclick="MyPageMain.setSmsReceiveYn('+"Y"+')" value="수신">수신</button>'
			+'</span>'
		+'</li>'
		+'<li>'
			+'<strong>스페셜멤버십</strong>'
			+'<ul class="special_member">'
				+'<li class="none">가입된 스페셜멤버십이 없습니다.</li>'
			+'</ul>'
		+'</li>'
	+'</ul>'
	+'</div>'
					+'<!-- 선호영화관 소식 -->'
					+'<div id="myPageMainCinemaNews" class="mypage_main_box" style="height: 322px;">'
	+'<div class="positionR">'
		+'<div class="h3_wrap">'
			+'<h3><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title6.png" alt="선호 영화관 소식"></h3>'
			+'<button class="popup_focus" title="선호 영화관 등록/수정" onclick="MyFavoriteCinema.showPage()"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn8.jpg" alt="선호 영화관 등록/수정"></button>'
		+'</div>'
		+'<ul class="tab">'
			+'<li><a href="#notice" onclick="changeClass1()" class="tab1 active" data-toggle="tab" id="sel1" title="영화관 공지사항 보기">공지사항</a></li>'
			+'<li><a href="#event" onclick="changeClass2()" class="tab2" data-toggle="tab" id="sel2" title="영화관 이벤트 보기">이벤트</a></li>'
		+'</ul>'
		+'<div class="tab-content">'
		    +'<!-- 공지사항 -->'
			+'<div class="tab-pane active" id="notice">'
			+'<ul class="type1">'
						+'<li>'
						+'<p>'
							+'<strong>'
								+'서울/코엑스'
							+'</strong>'
							+'<span>| 2017.10.07</span>'
						+'</p>'
//							+'<a href="javascript:void(0);" onclick="showMenu('center-notice', 'detail', '8801')" title="공지사항 상세보기">10/10(화) &lt;희생부활자&gt; 시사회로 인한..</a>'
						+'<a href="javascript:void(0);" onclick="showMenu()" title="공지사항 상세보기">10/10(화) &lt;희생부활자&gt; 시사회로 인한..</a>'
					+'</li>'
					+'<li>'
						+'<p>'
							+'<strong>'
								+'서울/코엑스'
							+'</strong>'
							+'<span>| 2017.09.25</span>'
						+'</p>'
//							+'<a href="javascript:void(0);" onclick="showMenu('center-notice', 'detail', '8779')" title="공지사항 상세보기">[강남페스티벌] 행사 일정에 따른 입차 지연..</a>'
						+'<a href="javascript:void(0);" onclick="showMenu()" title="공지사항 상세보기">[강남페스티벌] 행사 일정에 따른 입차 지연..</a>'
					+'</li>		'
					+'<li>'
						+'<p>'
							+'<strong>'
								+'서울/코엑스'
							+'</strong>'
							+'<span>| 2017.09.19</span>'
						+'</p>'
//							+'<a href="javascript:void(0);" onclick="showMenu('center-notice', 'detail', '8772')" title="공지사항 상세보기">[코엑스점]9/21(목) &lt;범죄도시&gt; 시사회..</a>'
						+'<a href="javascript:void(0);" onclick="showMenu()" title="공지사항 상세보기">[코엑스점]9/21(목) &lt;범죄도시&gt; 시사회..</a>'
					+'</li>		'
			+'</ul>'
			+'</div>'
			+'<!-- 이벤트 -->'
			+'<div class="tab-pane" id="event">'
			+'<ul class="type1">		'
					+'<li class="no_data text-center pa30">조회된 내역이 없습니다</li>'
			+'</ul>'
			+'</div>'
		+'</div>'
		+'<div class="positionA" style="top:43px; right:0;">'
			+'<button title="더보기" onclick="location=/?menuId=theater-detail&amp;cinema=1561#menu5">'
				+'<img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기">'
			+'</button>'
		+'</div>'
	+'</div>'
	+'</div>'
				+'</div>'
				+'<!-- 나의 예매내역 -->'
				+'<div id="myPageMyBooking" class="cols col2">'
	+'<div class="mypage_main_box" style="height: 585px;">'
		+'<div class="h3_wrap mb38">'
			+'<h3><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title4.png" alt="최근 예매 내역"></h3>'

//				+'<button title="더보기" onclick="showMenu('mypage-booking')"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'
			+'<button title="더보기" onclick="showMenu()"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'
		+'</div>'
		+'<ul class="booking_list">'
			+'<li class="no_data text-center pa30">조회된 내역이 없습니다</li>'
		+'</ul>'
	+'</div>'
	+'</div>'
				+'<div class="cols col3">'
					+'<div id="myPageMainShopping" class="mypage_main_box" style="height: 333px;">'
	+'<div class="h3_wrap mb20">'
		+'<h3><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title5.png" alt="쇼핑 내역"></h3>'

//			+'<button title="더보기" onclick="showMenu('mypage-shopping')"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'
		+'<button title="더보기" onclick="showMenu()"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기"></button>'
	+'</div>'
	+'<table summary="쇼핑내역" class="mypage_main_table">'
		+'<caption class="blind">쇼핑내역:구매일, 상품명 등의 정보제공</caption>'
		+'<colgroup>'
		+'<col style="width:95px">'
		+'<col>'
		+'</colgroup>'
		+'<thead>'
			+'<tr>'
				+'<th scope="col" id="th_shopping_date">구매일</th>'
				+'<th scope="col" id="th_shopping_item">상품명</th>'
				+'<!-- th>구매/사용수량</th -->'
			+'</tr>'
		+'</thead>'
		+'<tbody>'
			+'<tr><td headers="th_shopping_date" colspan="2" class="no_data text-center pa30">조회된 내역이 없습니다</td></tr>'
	+'		'
		+'</tbody>'
	+'</table>'
	+'</div>'
					+'<div id="myPageMainMovieStory" class="mypage_main_box pl0 pr0" style="height: 242px;">'
	+'<div class="h3_wrap pl20 pr20 mb10">'
		+'<h3 style="height:23px;"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title7.png" alt="나의 무비스토리"></h3>'
	+'</div>'
	+'<ul class="mypage_main_moviestory">'
		+'<li>'
//				+'<a href="javascript:void(0)" onclick="showMenu('mypage-moviestory', 'interesting')" title="보고싶어 보기">'
			+'<a href="javascript:void(0)" onclick="showMenu()" title="보고싶어 보기">'
				+'<span><img src="http://image2.megabox.co.kr/mop/home/mypage/main_icon1.png" alt=""></span>'
				+'<strong class="ml10">보고싶어</strong>'
				+'<strong class="c_purple pull-right">4</strong>'
			+'</a>'
		+'</li>'
		+'<li>'
//				+'<a href="javascript:void(0)" onclick="showMenu('mypage-moviestory', 'seen')" title="본영화 보기">'
			+'<a href="javascript:void(0)" onclick="showMenu()" title="본영화 보기">'
				+'<span><img src="http://image2.megabox.co.kr/mop/home/mypage/main_icon2.png" alt=""></span>'
				+'<strong class="ml10">본영화</strong>'
				+'<strong class="c_purple pull-right">3</strong>'
			+'</a>'
		+'</li>'
		+'<li>'			
//				+'<a href="javascript:void(0)" onclick="showMenu('mypage-moviestory', 'comment')" title="나의 한줄평 보기">'
			+'<a href="javascript:void(0)" onclick="showMenu()" title="나의 한줄평 보기">'
				+'<span><img src="http://image2.megabox.co.kr/mop/home/mypage/main_icon4.png" alt=""></span>'
				+'<strong class="ml10">나의 한줄평</strong>'
				+'<strong class="c_purple pull-right">0</strong>'
			+'</a>'
		+'</li>'
		+'<li>'
//				+'<a href="javascript:void(0)" onclick="showMenu('mypage-moviestory', 'moviepost')" title="나의 포스트 보기">'
			+'<a href="javascript:void(0)" onclick="showMenu()" title="나의 포스트 보기">'
				+'<span><img src="http://image2.megabox.co.kr/mop/home/mypage/main_icon7.png" alt=""></span>'
				+'<strong class="ml10">나의 포스트</strong>'
				+'<strong class="c_purple pull-right">0</strong>'
			+'</a>'
		+'</li>'
//		+'</ul><script>initControls($('div#myPageMainMovieStory'));</script></div>'
	+'</ul><script>initControls($('+"div#myPageMainMovieStory"+'));</script></div>'
				+'</div>'
			+'</div>'
			+'<div class="row4">'
				+'<div class="cols">'
					+'<div id="myPageMyQuestion" class="mypage_main_box" style="height: 304px;">'
	+'<div class="positionR">'
		+'<div class="h3_wrap mb38">'
			+'<h3 style="height:23px;"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title8.png" alt="나의문의내역"></h3>'
		+'</div>'
		+'<ul class="type1">'
			+'<li class="no_data text-center pa30">조회된 내역이 없습니다</li>'
		+'</ul>'
		+'<div class="positionA" style="top:0; right:0;">'
//				+'<button title="더보기" onclick="showMenu('mypage-question')">'
			+'<button title="더보기" onclick="showMenu()">'
				+'<img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기">'
			+'</button>'
		+'</div>'
	+'</div>'
	+'</div>'
				+'</div>'
				+'<div class="cols col1 ml10">'
					+'<div id="myPageMainEvent" class="mypage_main_box" style="height: 304px;">'
		+'<div class="positionR">'
			+'<div class="h3_wrap mb38">'
				+'<h3 style="height:23px;"><img src="http://image2.megabox.co.kr/mop/home/mypage/main_title9.png" alt="참여한 이벤트 내역"></h3>'
			+'</div>'
			+'<table summary="" class="mypage_main2_table">'
				+'<caption></caption>'
				+'<thead>'
					+'<tr>'
						+'<th>분류</th>'
						+'<th>이벤트명</th>'
						+'<th>응모일</th>'
						+'<th>당첨자발표</th>'
					+'</tr>'
				+'</thead>'
				+'<tbody>'
						+'<tr>'
							+'<td colspan="4" class="pa30">데이터가 없습니다.</td>'
						+'</tr>'
				+'</tbody>'
			+'</table>'
			+'<div class="positionA" style="top:0; right:0;">'
//					+'<button title="더보기" onclick="showMenu('event-applied')">'
				+'<button title="더보기" onclick="showMenu()">'
					+'<img src="http://image2.megabox.co.kr/mop/home/mypage/main_btn2.jpg" alt="더보기">'
				+'</button>'
			+'</div>'
		+'</div>'
		+'<!-- 이벤트상세모달 -->'
		+'<div class="modal fade event_modal" id="event_detail" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
			+'<div class="wrapper">'
				+'<div class="contents clearfix">'
					+'<button type="button" class="custom_close" data-dismiss="modal" aria-hidden="true"><span class="blind">닫기</span></button>'
					+'<div id="eventDetail"></div>'
				+'</div>'
			+'</div>'
		+'</div>	'
		+'<!-- 당첨자 팝업// -->'
		+'<div class="modal fade event_modal" id="winner_detail" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" display="block">'
			+'<div class="wrapper">'
				+'<div class="contents clearfix">'
					+'<button type="button" class="custom_close" data-dismiss="modal" aria-hidden="true"><span class="blind">닫기</span></button>'
					+'<div id="eventWinnersDetail"></div>'
					+'<div class="text-center pt40">'
						+'<button type="button" class="img_btn user ok" data-dismiss="modal" aria-hidden="true">확인</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>'
	+'<!-- 과거등급조회 팝업 -->'
	+'<div id="pastGradePopup" class="custom_alert_wrap" tabindex="0">'
		+'<div class="custom_alert alert_img">'
			+'<div class="ca_header">'
				+'<h6>과거등급조회</h6>'
			+'</div>'
			+'<div class="ca_body pa30 text-left">'
				+'<h5 class="text-left">유주열 님의 과거 연도별 고객 등급 내역입니다.</h5>'
				+'<table summary="고객등급내역" class="data_table tabel_fz12" style="width:450px">'
					+'<caption class="blind">고객등급내역:구분, 일반, VIP, VIP PREMIUM, VVIP 등의 정보제공</caption>'
					+'<thead>'
						+'<tr>'
							+'<th scope="col" id="th_pastGrade_year">구분</th>'
							+'<th scope="col" id="th_pastGrade_normal">일반</th>'
							+'<th scope="col" id="th_pastGrade_vip">VIP</th>'
							+'<th scope="col" id="th_pastGrade_vipp">VIP PREMIUM</th>'
							+'<th scope="col" id="th_pastGrade_vvip">VVIP</th>'
						+'</tr>'
					+'</thead>'
					+'<tbody>'
						+'<tr>'
							+'<th scope="row" id="th_pastGrade_year2012">2012년</th>'
							+'<td headers="th_pastGrade_year th_pastGrade_year2012 th_pastGrade_normal">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2012 th_pastGrade_vip">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2012 th_pastGrade_vipp">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2012 th_pastGrade_vvip">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<th scope="row" id="th_pastGrade_year2013">2013년</th>'
							+'<td headers="th_pastGrade_year th_pastGrade_year2013 th_pastGrade_normal">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2013 th_pastGrade_vip">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2013 th_pastGrade_vipp">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2013 th_pastGrade_vvip">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<th scope="row" id="th_pastGrade_year2014">2014년</th>'
							+'<td headers="th_pastGrade_year th_pastGrade_year2014 th_pastGrade_normal">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2014 th_pastGrade_vip">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2014 th_pastGrade_vipp">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2014 th_pastGrade_vvip">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<th scope="row" id="th_pastGrade_year2015">2015년</th>'
							+'<td headers="th_pastGrade_year th_pastGrade_year2015 th_pastGrade_normal">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2015 th_pastGrade_vip">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2015 th_pastGrade_vipp">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2015 th_pastGrade_vvip">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<th scope="row" id="th_pastGrade_year2016">2016년</th>'
							+'<td headers="th_pastGrade_year th_pastGrade_year2016 th_pastGrade_normal">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2016 th_pastGrade_vip">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2016 th_pastGrade_vipp">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2016 th_pastGrade_vvip">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<th scope="row" id="th_pastGrade_year2017">2017년</th>'
							+'<td headers="th_pastGrade_year th_pastGrade_year2017 th_pastGrade_normal">'
								+'<i class="bull">•<span class="blind">일반등급임</span></i>'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2017 th_pastGrade_vip">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2017 th_pastGrade_vipp">'
							+'</td>'
	                        +'<td headers="th_pastGrade_year th_pastGrade_year2017 th_pastGrade_vvip">'
							+'</td>'
						+'</tr>'
					+'</tbody>'
				+'</table>'
				+'<ul class="icon_list text-left mt10">'
					+'<li>2011년 11월, 메가박스와 구 씨너스의 브랜드 통합으로 인해 <br>'
					+'2012년도 이전의 회원 등급은 표시되지 않습니다.</li>'
				+'</ul>'
			+'</div>'
//				+'<button type="button" class="img_btn booking btn_ca_close" onclick="closeMessageBox('pastGradePopup', 'custom')">닫기</button>'
			+'<button type="button" class="img_btn booking btn_ca_close" onclick="closeMessageBox()">닫기</button>'
		+'</div>'
	+'</div>'
	+'<!--'
	+'소멸예정포인트 상세내역 팝업'
	+'<div id="extinctionPointPopup" class="custom_alert_wrap"></div>'
	+'-->'
	+'<!--  VIP 산정 티켓구매 적립포인트 내역 팝업 -->'
	+'<div id="vipPointDetailPopup" class="custom_alert_wrap">'
	+'</div>'
	+'<!-- //container -->'
	+'</div>';
		},
		myinfoupdate : ()=>{
			return '<div id="main" class="main-content">		'		
			+'<div id="fb-root"></div>'
			+'<!-- container// -->'
			+'<div id="container" class="mypage_container">'
			+''
				+'<div class="width-fixed mypage_membership_wrap" style="position: relative;" id="mypageMembershipWrap">'
				+'<div class="ad" style="top: 168px; right: -178px;">'
					+'<a href="javascript:adHasClick('+"http://www.megabox.co.kr/?menuId=event&amp;p=detail&amp;p2=4407"+', 0, '+"link"+');" title="">'
						+'<img src="http://image2.megabox.co.kr/mop/home/ad/150x440/160311_film_150x440.jpg" alt="인생의 영화를 만나는 방법 Megabox Film Society">'
					+'</a>'
				+'</div>'
				+'<!-- 고객 만족도조사 발급쿠폰 -->'
				+'<div class="mcsi_coupon_wrap">'
					+'<button class="btn_s_b" data-toggle="modal" data-target="#mcsi_coupon" onclick="mcsiCouponList.showPage()">고객 만족도조사 발급쿠폰</button>'
					+'<div class="modal fade" id="mcsi_coupon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>'
				+'</div>'
				+'<div class="skt_datacoupon_wrap">'
					+'<button class="btn_s_b" data-toggle="modal" data-target="#skt_data_coupon" onclick="DataCouponList.showPage()">SKT T 데이터쿠폰 확인</button>'
					+'<!-- //tab3 취소내역 -->'
					+'<div class="modal fade" id="skt_data_coupon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>'
				+'</div>'
				+'<ul class="mypage_menu">'
//						+'<li><a href="javascript:void(0)" class="col1 " onclick="showMenu('mypage-membership')" title="멤버십정보 보기">멤버십정보</a></li>'
//						+'<li><a href="javascript:void(0)" class="col2 " onclick="showMenu('mypage-pointExchange')" title="포인트교환 보기">포인트교환</a></li>'
//						+'<li><a href="javascript:void(0)" class="col3 " onclick="showMenu('mypage-booking')" title="예매확인/취소 보기">예매확인/취소</a></li>'
//						+'<li><a href="javascript:void(0)" class="col4 " onclick="showMenu('mypage-shopping')" title="스토어 구매내역 보기">스토어 구매내역</a></li>'
//						+'<li>'
//							+'<div class="tooltip_area" id="tooltip_area">이제부터 메가박스에서 실제 관람하신 내역을 확인할 수 있어요!<button type="button" onclick="closeMypageMovieNotice()" +'class="img_btn">닫기</button></div>'
//							+'<a href="javascript:void(0)" class="col5 " onclick="showMenu('mypage-moviestory')" title="나의무비스토리 보기">나의무비스토리</a>'
//						+'</li>'
//						+'<li><a href="javascript:void(0)" class="col6 " onclick="showMenu('mypage-coupon')" title="관람권/VIP쿠폰 보기">관람권/VIP쿠폰</a></li>'
//						+'<li><a href="javascript:void(0)" class="col7 active" onclick="showMenu('mypage-myinfo')" title="개인정보수정 보기">개인정보수정</a></li>'
//						+'<li><a href="javascript:void(0)" class="col8 " onclick="showMenu('mypage-question')" title="나의문의내역 보기">나의문의내역</a></li>'
				
					+'<li><a href="javascript:void(0)" class="col1 " onclick="showMenu()" title="멤버십정보 보기">멤버십정보</a></li>'
					+'<li><a href="javascript:void(0)" class="col2 " onclick="showMenu()" title="포인트교환 보기">포인트교환</a></li>'
					+'<li><a href="javascript:void(0)" class="col3 " onclick="showMenu()" title="예매확인/취소 보기">예매확인/취소</a></li>'
					+'<li><a href="javascript:void(0)" class="col4 " onclick="showMenu()" title="스토어 구매내역 보기">스토어 구매내역</a></li>'
					+'<li>'
						+'<div class="tooltip_area" id="tooltip_area">이제부터 메가박스에서 실제 관람하신 내역을 확인할 수 있어요!<button type="button" onclick="closeMypageMovieNotice()" class="img_btn">닫기</button></div>'
						+'<a href="javascript:void(0)" class="col5 " onclick="showMenu()" title="나의무비스토리 보기">나의무비스토리</a>'
					+'</li>'
					+'<li><a href="javascript:void(0)" class="col6 " onclick="showMenu()" title="관람권/VIP쿠폰 보기">관람권/VIP쿠폰</a></li>'
					+'<li><a href="javascript:void(0)" class="col7 active" onclick="showMenu()" title="개인정보수정 보기">개인정보수정</a></li>'
					+'<li><a href="javascript:void(0)" class="col8 " onclick="showMenu()" title="나의문의내역 보기">나의문의내역</a></li>'
				
				+'</ul>'
				
					+'<div class="h2_mypage">'
						+'<h3 class="sub_title">개인정보 수정</h3> <span> 회원님의 정보를 정확히 입력해주세요. </span>'
					+'</div>'
					+'<div class="personal_info_last">'
						+'<span>마지막 비밀번호 변경 : 105일 전에 함 (2017.07.06)</span>'
//							+'<button type="button" class="img_btn mypage personal_change_pw mr6" onclick="showMenu('mypage-myinfo', 'changePassword')">비밀번호 변경</button>'
//							+'<button type="button" class="img_btn mypage personal_quit" onclick="showMenu('mypage-myinfo', 'cancelMember')">회원탈퇴</button>'
						+'<button type="button" class="img_btn mypage personal_change_pw mr6" onclick="showMenu()">비밀번호 변경</button>'
						+'<button type="button" class="img_btn mypage personal_quit" onclick="showMenu()">회원탈퇴</button>'
					+'</div>'
					+'<div class="user_wrap">'
						+'<div id="userJoinContainer" class="form-style">'
							+'<div class="clearfix">'
								+'<span class="text-sub mb10">*표시 항목은 필수입력 항목입니다.</span>'
							+'</div>'
							+'<table class="form-table">'
								+'<caption class="blind2">개인정보수정:아이디,프로필사진,비밀번호 입력,이름,생년월일,주소,유선전화,휴대폰,모바일 앱 로그인설정,무인발권기 기능설정,이메일,수신확인,선호영화관 등의 정보제공</caption>'
								+'<colgroup>'
									+'<col width="181">'
									+'<col width="">'
								+'</colgroup>'
								+'<tbody><tr>'
									+'<th scope="row" id="th_myInfo_webId"><label for="inputtext1">*아이디</label></th>'
									+'<td headers="th_myInfo_webId">'
										+'<strong>dinryu117</strong>'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_profile"><label for="inputtext11">프로필 사진</label></th>'
									+'<td headers="th_myInfo_profile">'
										+'<img name="photo" id="profilePhotoImg" style="width: 100px; height: 100px;" src="http://image2.megabox.co.kr/mop/home/user/profile_m.png" alt="프로필" class="img-circle pull-left" data-original="null" data-image="null">'
										+'<span class="profile_btn_wrap">'
											+'<button id="imgUploadBtn" class="img_btn user fake_section">찾아보기</button>'
											+'<button id="imgDeleteBtn" class="img_btn user profile_del" onclick="profileDel()">삭제</button>'
										+'</span>'
										+'<span style="font-size: 12px; margin-top: 41px; margin-left: 20px; display: none;" id="imgUploadMsg">MS 익스플로러 8, 9 버전에서는 프로필 사진 수정이 불가 합니다.</span>'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_password"><label for="inputtext2">*비밀번호</label></th>'
									+'<td headers="th_myInfo_password">'
										+'<input type="password" id="inputtext2" name="password" fieldname="비밀번호" required="">'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_name"><label for="inputtext4">*이름</label></th>'
									+'<td headers="th_myInfo_name">'
										+'<input type="text" id="memberName" name="memberName" value="유주열" fieldname="이름" required="" allowtype="hangul" disabled="">'
											+'<button class="btn-s btn-st2 mr18 ml7" style="vertical-align:middle;" data-toggle="modal" data-target="#name_change" onclick="MyInfoNameChange.showPage('+"유주열"+', '+"8E55CCDE-B0CB-4D61-87D0-C86683E0BEB5"+')">이름변경</button><span class="text-sub">* 개명으로 이름이 변경된 경우, 회원정보의 이름을 변경하실 수 있습니다.</span>'
											+'<div class="modal fade" id="name_change" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>'
										+'<!-- button class="btn_s_b"  data-toggle="modal" data-target="#mcsi_coupon" onclick="mcsiCouponList.showPage()">고객 만족도조사 발급쿠폰</button -->'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_birthday"><label id="modUserInfo_birthday" for="inputtext5">*생년월일</label></th>'
									+'<td headers="th_myInfo_birthday">'
										+'<input type="hidden" name="birthDay" value="">'
										+'<input type="text" id="inputtext5" class="w67" name="birthYear" value="1967" fieldname="생년월일" validate="number" allowtype="number" required="" maxlength="4">'
										+'<span class="text-sub ml5 mr8">년</span>'
										+'<input type="text" class="w44" name="birthMonth" value="01" fieldname="생년월일" validate="number" allowtype="number" required="" maxlength="2">'
										+'<span class="text-sub ml5 mr8">월</span>'
										+'<input type="text" class="w44" name="birthDate" value="17" fieldname="생년월일" validate="number" allowtype="number" required="" maxlength="2">'
										+'<span class="text-sub ml5 mr8">일</span>'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_address"><label for="inputtext6">주소</label></th>'
									+'<td headers="th_myInfo_address">'
										+'<input type="hidden" name="zipCode" value="">							'
										+'<div class="mb5 clearfix">							'
												+'<span class="text-sub pt5 pr10 pull-left" id="zipCodeNew">()</span>							'
												+'<button type="button" id="update_address" class="img_btn user input_address">우편번호 검색</button>'
										+'</div>'
										+'<div>															'
												+'<p class="text-sub_st2" id="roadAddr" style="display:none">도로명주소 : </p>'
												+'<p class="text-sub_st2" id="numberAddr">지번주소 : </p>					'
										+'</div>'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_mobile"><label id="modUserInfo_phone" for="inputtext8">*휴대폰</label></th>'
									+'<td headers="th_myInfo_mobile">'
										+'<input type="text" id="inputtext8" name="mobile1" value="010" fieldname="휴대폰" validate="number" allowtype="number" class="w67" required="" maxlength="3">'
										+'<span class="text-sub ml2 mr2">-</span>'
										+'<input type="text" class="w67" name="mobile2" value="3926" fieldname="휴대폰" validate="number" allowtype="number" required="" maxlength="4">'
										+'<span class="text-sub ml2 mr2">-</span>'
										+'<input type="text" class="w67" name="mobile3" value="6789" fieldname="휴대폰" validate="number" allowtype="number" required="" maxlength="4">'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_mobileLogin"><label for="inputtext9">모바일 앱 로그인 설정</label></th>'
									+'<td headers="th_myInfo_mobileLogin">'
										+'<div>'
											+'<span class="title mr35">"생년월일+휴대폰번호" 로그인 기능</span>'
											+'<label class="mr35"><span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" name="mobileLoginYn" value="Y" class="style_input" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>사용</label>'
											+'<label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" name="mobileLoginYn" value="N" class="style_input" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>사용안함</label>'
										+'</div>'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_kioskLogin"><label for="inputtext9">무인발권기(KIOSK)<br>기능 설정</label></th>'
									+'<td headers="th_myInfo_kioskLogin">'
										+'<div>'
											+'<span class="title mr35">"생년월일+휴대폰번호" 티켓 출력 및 회원 찾기 기능</span>'
											+'<label class="mr35"><span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" name="kioskMobileBirthdayLoginYn" value="Y" class="style_input" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>사용</label>'
											+'<label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" name="kioskMobileBirthdayLoginYn" value="N" class="style_input" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>사용안함</label>'
										+'</div>'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_email"><label id="modUserInfo_email" for="inputtext9">*이메일</label></th>'
									+'<td headers="th_myInfo_email">'
										+'<input type="text" name="emailaddr" value="dinryu@naver.com" fieldname="이메일" validate="email" required="">'
									+'</td>'
								+'</tr>'
								+'<tr>'
									+'<th scope="row" id="th_myInfo_favorite">선호영화관</th>'
									+'<td headers="th_myInfo_favorite">'
										+'<div class="mt8 mb9">'
											+'<span class="text-sub">선호 영화관은 최대3개까지 등록 가능합니다.</span>'
										+'</div>'
										+'<div class="mb10">'
											+'<label for="select1" class="mr20"><span class="asterisk"></span>1순위</label>'
											+'<select id="selectGroup1" data-width="154px" class="mr8" style="display: none;">'
												+'<option value="">지역선택</option>'
											+'<option value="10" selected="">서울</option>'
											+'<option value="30">경기</option>'
											+'<option value="35">인천</option>'
											+'<option value="45">대전/충청/세종</option>'
											+'<option value="55">부산/대구/경상</option>'
											+'<option value="65">광주/전라</option>'
											+'<option value="70">강원</option>'
											+'<option value="80">제주</option>'
											+'</select><div class="btn-group bootstrap-select mr8" style="width: 154px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectGroup1" title="지역선택"><span class="filter-option pull-left">서울</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0"><a tabindex="0" class="" style=""><span class="text">지역선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1" class="selected"><a tabindex="0" class="" style=""><span class="text">서울</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">경기</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">인천</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">대전/충청/세종</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">부산/대구/경상</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">광주/전라</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">강원</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">제주</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
											+'<select id="selectCinema1" name="cinemaCode" data-width="119px" style="display: none;"><option value="">영화관선택</option><option value="1372">강남</option><option value="1359">강남대로(씨티)</option><option value="1003">동대문</option><option value="1572">마곡</option><option value="1581">목동</option><option value="1311">상봉</option><option value="1371">센트럴</option><option value="1381">송파파크하비오</option><option value="1421">수유</option><option value="1202">신촌</option><option value="1221">은평</option><option value="1561" selected="">이수</option><option value="1321">창동</option><option value="1351">코엑스</option><option value="1571">화곡</option><option value="1562">ARTNINE</option><option value="1002">EOE4</option></select><div class="btn-group bootstrap-select" style="width: 119px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectCinema1" title="영화관선택"><span class="filter-option pull-left">이수</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0"><a tabindex="0" class="" style=""><span class="text">영화관선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">강남</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">강남대로(씨티)</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">동대문</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">마곡</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">목동</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">상봉</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">센트럴</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">송파파크하비오</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="9"><a tabindex="0" class="" style=""><span class="text">수유</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="10"><a tabindex="0" class="" style=""><span class="text">신촌</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="11"><a tabindex="0" class="" style=""><span class="text">은평</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="12" class="selected"><a tabindex="0" class="" style=""><span class="text">이수</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="13"><a tabindex="0" class="" style=""><span class="text">창동</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="14"><a tabindex="0" class="" style=""><span class="text">코엑스</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="15"><a tabindex="0" class="" style=""><span class="text">화곡</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="16"><a tabindex="0" class="" style=""><span class="text">ARTNINE</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="17"><a tabindex="0" class="" style=""><span class="text">EOE4</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
										+'</div>'
										+'<div class="mb10">'
											+'<label for="select2" class="mr20"><span class="asterisk"></span>2순위</label>'
											+'<select id="selectGroup2" data-width="154px" class="mr8" style="display: none;">'
												+'<option value="">지역선택</option>'
											+'<option value="10" selected="">서울</option>'
											+'<option value="30">경기</option>'
											+'<option value="35">인천</option>'
											+'<option value="45">대전/충청/세종</option>'
											+'<option value="55">부산/대구/경상</option>'
											+'<option value="65">광주/전라</option>'
											+'<option value="70">강원</option>'
											+'<option value="80">제주</option>'
											+'</select><div class="btn-group bootstrap-select mr8" style="width: 154px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectGroup2" title="지역선택"><span class="filter-option pull-left">서울</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0"><a tabindex="0" class="" style=""><span class="text">지역선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1" class="selected"><a tabindex="0" class="" style=""><span class="text">서울</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">경기</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">인천</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">대전/충청/세종</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">부산/대구/경상</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">광주/전라</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">강원</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">제주</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
											+'<select id="selectCinema2" name="cinemaCode2" data-width="119px" style="display: none;"><option value="">영화관선택</option><option value="1372">강남</option><option value="1359">강남대로(씨티)</option><option value="1003">동대문</option><option value="1572">마곡</option><option value="1581">목동</option><option value="1311">상봉</option><option value="1371" selected="">센트럴</option><option value="1381">송파파크하비오</option><option value="1421">수유</option><option value="1202">신촌</option><option value="1221">은평</option><option value="1561">이수</option><option value="1321">창동</option><option value="1351">코엑스</option><option value="1571">화곡</option><option value="1562">ARTNINE</option><option value="1002">EOE4</option></select><div class="btn-group bootstrap-select" style="width: 119px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectCinema2" title="영화관선택"><span class="filter-option pull-left">센트럴</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0"><a tabindex="0" class="" style=""><span class="text">영화관선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">강남</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">강남대로(씨티)</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">동대문</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">마곡</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">목동</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">상봉</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7" class="selected"><a tabindex="0" class="" style=""><span class="text">센트럴</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">송파파크하비오</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="9"><a tabindex="0" class="" style=""><span class="text">수유</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="10"><a tabindex="0" class="" style=""><span class="text">신촌</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="11"><a tabindex="0" class="" style=""><span class="text">은평</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="12"><a tabindex="0" class="" style=""><span class="text">이수</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="13"><a tabindex="0" class="" style=""><span class="text">창동</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="14"><a tabindex="0" class="" style=""><span class="text">코엑스</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="15"><a tabindex="0" class="" style=""><span class="text">화곡</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="16"><a tabindex="0" class="" style=""><span class="text">ARTNINE</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="17"><a tabindex="0" class="" style=""><span class="text">EOE4</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
										+'</div>'
										+'<div>'
											+'<label for="select3" class="mr20"><span class="asterisk"></span>3순위</label>'
											+'<select id="selectGroup3" data-width="154px" class="mr8" style="display: none;">'
												+'<option value="">지역선택</option>'
											+'<option value="10" selected="">서울</option>'
											+'<option value="30">경기</option>'
											+'<option value="35">인천</option>'
											+'<option value="45">대전/충청/세종</option>'
											+'<option value="55">부산/대구/경상</option>'
											+'<option value="65">광주/전라</option>'
											+'<option value="70">강원</option>'
											+'<option value="80">제주</option>'
											+'</select><div class="btn-group bootstrap-select mr8" style="width: 154px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectGroup3" title="지역선택"><span class="filter-option pull-left">서울</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0"><a tabindex="0" class="" style=""><span class="text">지역선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1" class="selected"><a tabindex="0" class="" style=""><span class="text">서울</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">경기</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">인천</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">대전/충청/세종</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">부산/대구/경상</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">광주/전라</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">강원</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">제주</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
											+'<select id="selectCinema3" name="cinemaCode3" data-width="119px" style="display: none;"><option value="">영화관선택</option><option value="1372">강남</option><option value="1359">강남대로(씨티)</option><option value="1003">동대문</option><option value="1572">마곡</option><option value="1581">목동</option><option value="1311">상봉</option><option value="1371">센트럴</option><option value="1381">송파파크하비오</option><option value="1421">수유</option><option value="1202">신촌</option><option value="1221">은평</option><option value="1561">이수</option><option value="1321">창동</option><option value="1351" selected="">코엑스</option><option value="1571">화곡</option><option value="1562">ARTNINE</option><option value="1002">EOE4</option></select><div class="btn-group bootstrap-select" style="width: 119px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectCinema3" title="영화관선택"><span class="filter-option pull-left">코엑스</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0"><a tabindex="0" class="" style=""><span class="text">영화관선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">강남</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">강남대로(씨티)</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">동대문</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">마곡</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">목동</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">상봉</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">센트럴</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">송파파크하비오</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="9"><a tabindex="0" class="" style=""><span class="text">수유</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="10"><a tabindex="0" class="" style=""><span class="text">신촌</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="11"><a tabindex="0" class="" style=""><span class="text">은평</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="12"><a tabindex="0" class="" style=""><span class="text">이수</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="13"><a tabindex="0" class="" style=""><span class="text">창동</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="14" class="selected"><a tabindex="0" class="" style=""><span class="text">코엑스</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="15"><a tabindex="0" class="" style=""><span class="text">화곡</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="16"><a tabindex="0" class="" style=""><span class="text">ARTNINE</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="17"><a tabindex="0" class="" style=""><span class="text">EOE4</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
										+'</div>'
									+'</td>'
								+'</tr>'
							+'</tbody></table>'
						+'</div>'
					+'</div>'
					+'<!-- 마케팅 활용을 위한 개인정보 수집 이용 안내 -->		'
					+'<div class="mt50">'
					+'<h2 class="h2_mypage">'
						+'<span class="sub_title mypage st14">마케팅 활용을 위한 개인정보 수집 이용 안내</span>'
					+'</h2>'
					+'<div class="personal_information_wrap">'
						+'<div id="" class="form-style">'
							+'<table class="form-table">'
								+'<caption class="blind2">개인정보 수집 및 마케팅 활용을 위한 개인정보 수집 목적, 수집 항목, 보유 및 이용 기간, 동유여부</caption>'
								+'<colgroup>'
									+'<col width="35%">'
									+'<col width="20%">'
									+'<col width="30%">'
									+'<col width="">'
								+'</colgroup>'
								+'<thead>'
									+'<tr>'
										+'<th scope="col" id="th_myInfo_purpose">수집 목적</th>'
										+'<th scope="col" id="th_myInfo_item">수집 항목</th>'
										+'<th scope="col" id="th_myInfo_term">보유 및 이용 기간</th>'
										+'<th scope="col" id="th_myInfo_agree">동의여부</th>'
									+'</tr>'
								+'</thead>'
								+'<tbody>'
									+'<tr>'
										+'<td headers="th_myInfo_purpose" class="pl20">'
												+'당사 신규 상품/서비스 안내 및 권유.<br>'
												+'사은/할인 행사 등 각종 이벤트 정보 등의 안내 및 권유'
										+'</td>'
										+'<td headers="th_myInfo_item">'
												+'이메일, 휴대폰번호'
										+'</td>'
										+'<td headers="th_myInfo_term">'
												+'회원 탈퇴 시 혹은 이용 목적 달성 시까지'
										+'</td>'
										+'<td headers="th_myInfo_agree" class="ml20">'
											+'<label for="marketingRuleAgreeY"><span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" id="marketingRuleAgreeY" name="marketingRuleAgreeYN" value="Y" class="icheck" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><strong>동의</strong></label>'
											+'<label for="marketingRuleAgreeN"><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" id="marketingRuleAgreeN" name="marketingRuleAgreeYN" value="N" class="icheck" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><strong>동의 안함</strong></label>'
										+'</td>'
									+'</tr>'
								+'</tbody>'
							+'</table>'
							+'<div class="agree_area">'
								+'<p class="txt">이벤트, 신규 서비스, 할인 혜택 등의 소식을 전해드립니다. (소멸포인트 및 공지성 안내 또는 거래정보와 관련된 내용은 수신동의 여부와 상관없이 발송됩니다.)</p>'
								+'<label for="smsReceiveYN"><span class="icheckbox_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="checkbox" id="smsReceiveYn" name="smsReceiveYn" value="Y" class="icheck" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><span>휴대폰 번호</span></label>'
								+'<label for="mailingReceiveYn" class="ml100"><span class="icheckbox_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="checkbox" id="mailingReceiveYn" name="mailingReceiveYn" value="Y" class="icheck" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><span>이메일</span><span>(동의일시 : 2017-07-06 16:12:25.217)</span></label>'
							+'</div>'
						+'</div>'
					+'</div>'
					+'</div>'
					+'<!-- //마케팅 활용을 위한 개인정보 수집 이용 안내 -->'
					+'<h2 class="h2_mypage mt50">'
						+'<span class="sub_title mypage st12">스페셜 멤버십 이용동의 - 스페셜멤버십 서비스에 대한 이용정보 및 다양한 혜택 정보등의 안내</span>'
					+'</h2>'
					+'<div class="user_wrap">'
						+'<div id="specialMembershipContainer" class="form-style">'
							+'<table class="form-table">'
								+'<caption class="blind2"></caption>'
								+'<colgroup>'
									+'<col width="181">'
									+'<col width="">'
								+'</colgroup>'
								+'<tbody>'
									+'<tr id="specialTr1">'
										+'<th scope="row" id="th_myInfo_entryInfo">가입정보</th>'
										+'<td headers="th_myInfo_entryInfo">							'
											+'<div style="" id="entryInfo"><span class="text-sub">가입된 스페셜 멤버십이 없습니다.</span>'
											+'<button type="button" class="pull-right btn-s btn-st3" onclick="location.href='+"/?menuId=specialcontent"+'">스페셜 멤버십 가입안내&nbsp;<i class="fa fa-angle-right"></i></button>'
											+'</div>'
										+'</td>'
									+'</tr>						'
								+'</tbody>'
							+'</table>'
						+'</div>'
						+'<div class="btn_wrap text-center mt50">'
							+'<button type="button" class="img_btn user cancel mr7" id="myInfoModifycancel">취소</button>'
							+'<button type="button" class="img_btn user modify ml7" onclick="MyPageMyInfoInput.save()">수정</button>'
						+'</div>'
					+'</div> <!-- user_wrap -->'
				+'</div>'
			+''
			+'</div>'
			+'<form name="profileFrm" enctype="multipart/form-data" method="POST">'
				+'<input type="file" style="display:none;" name="profile" id="profilePhoto" value="Choose Photo" accept="image/png,image/jpeg">'
				+'<input type="hidden" name="section" value="profile">'
				+'<input type="hidden" name="marketingagreeyn" value="N">'
			+'</form>'
			+'<!-- //container -->'
			+'<iframe id="profileUploadFrame" title="빈프레임" name="profileUploadFrame" height="0" width="0" marginheight="0" marginwidth="0" src="http://imageu.megabox.co.kr/upload.jsp" frameborder="0" allowtransparency="true" scrolling="no" tabindex="0" style="visibility: none; display: none; border: none;"></iframe>'
			+'</div>';
			
		},
		passchange : ()=>{
			return  '<div class="h2_mypage">'
			+'<h3 class="sub_title">비밀번호 변경</h3>'
			+'<span> 현재 비밀번호를 입력한 후 새로 사용할 비밀번호를 입력하세요.</span>'
			+'</div>'
			+'<div class="user_wrap">'
				+'<div class="form-style" id="changePw">'
					+'<table class="form-table">'
						+'<caption class="blind2">비밀번호 변경:현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 입력</caption>'
						+'<colgroup>'
							+'<col width="181">'
							+'<col width="">'
						+'</colgroup>'
						+'<tbody><tr>'
							+'<th scope="row" id="th_changePass_passNow"><label for="inputtext1">현재 비밀번호</label></th>'
							+'<td headers="th_changePass_passNow">'
								+'<input type="password" id="inputtext1" title="현재 비밀번호" name="oldPassword" allowtype="number alphabet special" validate="number alphabet special">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<th scope="row" id="th_changePass_passNew"><label for="inputtext2">새 비밀번호</label></th>'
							+'<td headers="th_changePass_passNew">'
								+'<input type="password" id="inputtext2" title="새 비밀번호" name="newPassword" maxlength="16" allowtype="number alphabet special" validate="number alphabet special" onkeydown="passwordLengthCheck(this)"><span class="text-sub ml10 t_content">영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리 이상으로 입력 해 주세요.</span>'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<th scope="row" id="th_changePass_passConfirm"><label for="inputtext3">새 비밀번호 확인</label></th>'
							+'<td headers="th_changePass_passConfirm">'
								+'<input type="password" id="inputtext3" title="새 비밀번호 확인" name="confirmNewPassword" maxlength="16" allowtype="number alphabet special" validate="number alphabet special"><span class="text-sub ml10 t_content">비밀번호 확인을 위해 한 번 더 입력해 주시기 바랍니다.</span>'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td colspan="2">'
								+'<ul class="icon_list mypage mt10 mb10">'
									+'<li class="t_content">생년월일, 전화번호 등 개인 정보와 관련된 숫자, 연속된 숫자와 같이 쉬운 비밀번호는 다른 사람이 쉽게 알아낼 수 있으니 사용을 자제해 주세요.</li>'
									+'<li class="t_content">비밀번호는 3-6개월마다 꼭 바꿔 주세요.</li>'
									+'<li class="t_content">비밀번호 변경시 모바일 기기와 홈페이지에서 모두 로그아웃됩니다. 변경한 비밀번호로 다시 로그인해주세요.</li>'
								+'</ul>'
							+'</td>'
						+'</tr>'
					+'</tbody></table>'
				+'</div>'	
			+'	<div id="pw_change" class="btn_wrap text-center mt50">'
					+'<button type="button" class="img_btn user cancel mr7" onclick="history.back()">취소</button>'
					+'<button type="button" class="img_btn user modify ml7" onclick="MyPageMyInfoChangePassword.change('+"dinryu117"+')">수정</button>'
				+'</div>'
			+'</div>';
		},
		personalquit : ()=>{
			return	'<h2 class="h2_mypage">'	
		+'<span class="sub_title mypage st08">회원탈퇴</span>'
		+'</h2>'
		+'<div class="personal_quit">'
			+'<h5>[주의] 메가박스 회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</h5>'
			+'<dl class="first">'
				+'<dt>1. 30일간 회원 재가입이 불가능합니다.</dt>'
				+'<dd><i class="fa fa-angle-right"></i> 회원 탈퇴 후, 30일 경과 후 재가입할 수 있습니다.</dd>'
			+'</dl>'
			+''
			+'<dl>'
				+'<dt>2. 탈퇴 후 삭제 내역 <span>(회원 탈퇴하시면 회원정보와 개인 보유 포인트 등 정보가 삭제되며 데이터는 복구되지 않습니다.)</span></dt>'
				+'<dd><i class="fa fa-angle-right"></i> 메가박스 멤버십 포인트 및 적립/차감 내역</dd>'
				+'<dd><i class="fa fa-angle-right"></i> 관람권 및 쿠폰</dd>'
				+'<dd><i class="fa fa-angle-right"></i> 영화 관람 내역</dd>'
			+'</dl>'
			+''
			+'<dl>'
				+'<dt>3. 고객님께서 불편하셨던 점, 아쉬웠던 점을 알려주시면 앞으로 더 나은 모습으로 찾아 뵙겠습니다.</dt>'
				+'<dd><label><span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" class="icheck" name="retireType" value="1" checked="" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span> 서비스 장애가 잦아서</label></dd>'
				+'<dd><label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" class="icheck" name="retireType" value="2" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span> 이벤트 및 무료서비스 혜택이 적어서</label></dd>'
				+'<dd><label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" class="icheck" name="retireType" value="3" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span> 불만 및 불편사항에 대한 고객응대가 나빠서</label></dd>'
				+'<dd><label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" class="icheck" name="retireType" value="4" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span> 영화관람시 시설 및 가격등의 불만 때문에</label></dd>'
				+'<dd><label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" class="icheck" name="retireType" value="5" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span> 이용빈도가 낮고 개인정보 유출이 우려되어</label></dd>'
				+'<dd><label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" class="icheck" name="retireType" value="6" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span> 탈퇴 후 재가입을 위해</label></dd>'
				+'<dd><label><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" class="icheck mr9" name="retireType" value="7" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span> 기타</label> <input type="text" name="retireReason" maxlength="50" style="width: 500px;"></dd>'
			+'</dl>'
			+''
			+'<dl class="last">'
				+'<dt>4. 회원님의 비밀번호를 입력하시고 [탈퇴] 버튼을 클릭해주세요.</dt>'
				+'<dd><label for="text1" class="mr20">비밀번호</label> <input type="password" id="text1" name="password" maxlength="16"></dd>'
			+'</dl>'
		+'</div>'
		+'<div class="user_wrap">'
			+'<div class="btn_wrap text-center mt50">'
				+'<button type="button" class="img_btn user cancel mr7" onclick="history.back()">취소</button>'
				+'<button type="button" class="img_btn user quit ml7" onclick="MyPageMyInfoCancelMember.cancelMember()">탈퇴</button>'
			+'</div>'
		+'</div>';
		},

		memberadd : ()=>{
			return '<div class="sub_navi ">'	
			+'<div class="sub_navi_wrap">'
			+'<ul class="clearfix">'
				+'<li>'
//					+'<a class="join " href="javascript:showMenu('user-join')" title="회원가입-본인인증 바로가기">회원가입-본인인증</a>'
					+'<a class="join " href="javascript:showMenu()" title="회원가입-본인인증 바로가기">회원가입-본인인증</a>'
				+'</li>'
			+'</ul>'
		+'</div>'
	+'<!-- //header -->'
	+'</div>'
	+'<div id="main" class="main-content">	'
	+'<!-- container// -->'
	+'<div id="container" class="width-fixed">'
		+'<div class="user_wrap" id="userWrap">'
			+'<h2 class="mb35">가입정보입력<span class="ml10"><span class="c_purple text-sub">(*표시 항목 필수입력)</span></span>'
				+'<span class="step step2"></span>'
			+'</h2>'
			+'<div id="userJoinContainer" class="form-style">'
				+'<input type="hidden" id="childrenGubun" name="childrenGubun" value="N">'
				+'<table class="form-table" summary="정보입력">'
					+'<caption class="blind2">회원정보입력 표:아이디, 프로필사진, 비밀번호, 비밀번호 확인,  주소, 이메일, 전화번호, 등 회원가입에 필요한 정보를 입력할 수 있습니다.</caption>'
					+'<colgroup>'
						+'<col width="181">'
						+'<col width="">'
					+'</colgroup>'
					+'<tbody><tr>'
						+'<th scope="row" id="th_joininput_info_id"><label for="inputtext1">*아이디</label></th>'
						+'<td headers="th_joininput_info_id">'
							+'<input type="text" title="아이디" id="inputtext1" name="web_Id" value="" class="pull-left mr8" maxlength="12" fieldname="아이디" allowtype="alphabet number" required="">'
							+'<button type="button" id="img_btn_user_input_id_pull-left" class="img_btn user input_id pull-left">중복확인</button>'
							+'<span class="text-sub ml10">영문이나 숫자 혹은 그 조합 8~12자리</span>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_photo"><label for="profilePhotoImg">프로필 사진</label></th>'
						+'<td headers="th_joininput_info_photo">'
							+'<!-- 여자는 profile_w.png -->'
							+'<img name="photo" id="profilePhotoImg" src="http://image2.megabox.co.kr/mop/home/user/profile_m.png" alt="프로필사진" class="img-circle pull-left" data-original="" data-image="">'
							+'<span class="profile_btn_wrap">'
								+'<button class="img_btn user fake_section">찾아보기</button>'
								+'<button class="img_btn user profile_del" onclick="profileDel()">삭제</button>'
							+'</span>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_password"><label for="inputtext2">*비밀번호</label></th>'
						+'<td headers="th_joininput_info_password">'
							+'<input type="password" title="비밀번호 입력" id="inputtext2" name="password" maxlength="16" value="" fieldname="비밀번호" required="" onkeyup="passwordLengthCheck(this)">'
							+'<span class="text-sub" style="margin-left:111px;">영문, 숫자, 특수문자 중 2가지 이상 조합 10자리 이상</span>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_passwordconfirm"><label for="inputtext3">*비밀번호 확인</label></th>'
						+'<td headers="th_joininput_info_passwordconfirm">'
							+'<input type="password" title="비밀번호 확인 입력" id="inputtext3" name="confirmPassword" maxlength="16" value="" fieldname="비밀번호 확인" required="">'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_name"><label for="inputtext4">*이름</label></th>'
						+'<td headers="th_joininput_info_name">'
							+'<input type="text" title="이름" id="inputtext4" name="memberName" maxlength="30" value="황광회" fieldname="이름" required="" allowtype="hangul number alphabet" readonly="readonly">'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_birthday">*생년월일</th>'
						+'<td headers="th_joininput_info_birthday">'
							+'<input type="hidden" title="생년월일" name="birthDay" value="">'
							+'<input type="text" title="생년월일 년도 입력" class="w67" name="birthYear" value="1992" fieldname="생년월일" validate="number" allowtype="number" required="" maxlength="4">'
							+'<span class="text-sub ml5 mr8">년</span>'
							+'<input type="text" title="생년월일 월 입력" class="w44" name="birthMonth" value="09" fieldname="생년월일" validate="number" allowtype="number" required="" maxlength="2">'
							+'<span class="text-sub ml5 mr8">월</span>'
							+'<input type="text" title="생년월일 일 입력" class="w44" name="birthDate" value="24" fieldname="생년월일" validate="number" allowtype="number" required="" maxlength="2">'
							+'<span class="text-sub ml5 mr8">일</span>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_address">주소</th>'
						+'<td headers="th_joininput_info_address">'
							+'<input type="hidden" title="주소" name="zipCode" value="">'
							+'<!-- <div class="mb10 clearfix">'
								+'<input type="text" title="우편번호 앞자리" class="w95 pull-left" name="zipCode1" readonly="readonly">'
								+'<span class="text-sub ml2 mr2 pull-left">-</span>'
								+'<input type="text" title="우편번호 뒷자리" class="w95 mr8 pull-left" name="zipCode2" readonly="readonly">'
								+'<button type="button" id="btn_user_input_address" class="img_btn user input_address pull-left">우편번호 검색</button>'
							+'</div> -->'
							+'<div class="mb5 clearfix">'
								+'<span class="text-sub pt5 pr10 pull-left" id="zipCodeNew">()</span>'
								+'<button type="button" class="img_btn user input_address">우편번호 검색</button>'
							+'</div>'
	+''
							+'<div>'
								+'<p class="text-sub_st2" id="roadAddr">도로명주소 : </p>'
								+'<p class="text-sub_st2" id="numberAddr">지번주소 : </p>'
							+'</div>'
							+'<!-- <div>'
								+'<input type="text" title="주소" name="addr02" style="width: 300px;" readonly="readonly">'
								+'<span class="text-sub ml10">상세 주소 정보는 받지 않습니다.</span>'
							+'</div> -->'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_mobile">*휴대폰</th>'
						+'<td headers="th_joininput_info_mobile">'
							+'<input type="text" title="휴대폰 앞번호 입력" name="mobile1" value="" fieldname="휴대폰" validate="number" allowtype="number" class="w67" required="" maxlength="3">'
							+'<span class="text-sub ml2 mr2">-</span>'
							+'<input type="text" title="휴대폰 중간번호 입력" class="w67" name="mobile2" value="" fieldname="휴대폰" validate="number" allowtype="number" required="" maxlength="4">'
							+'<span class="text-sub ml2 mr2">-</span>'
							+'<input type="text" title="휴대폰 뒷번호 입력" class="w67" name="mobile3" value="" fieldname="휴대폰" validate="number" allowtype="number" required="" maxlength="4">'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_loginsetting">모바일 앱 로그인 설정</th>'
						+'<td headers="th_joininput_info_loginsetting">'
							+'<div>'
								+'<span class="title mr35">"생년월일+휴대폰번호" 로그인 기능</span>'
								+'<span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" title="생년월일+휴대폰번호 로그인 기능 사용" name="mobileLoginYn" id="inputtext12" value="Y" class="style_input" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
								+'<label for="inputtext12" class="mr35">사용</label>'
								+'<span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" title="생년월일+휴대폰번호 로그인 기능 사용안함" name="mobileLoginYn" id="inputtext13" value="N" class="style_input" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
								+'<label for="inputtext13">사용안함</label>'
							+'</div>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_kiosksetting" width="184">무인발권기(KIOSK)기능 설정</th>'
						+'<td headers="th_joininput_info_kiosksetting">'
							+'<div>'
								+'<span class="title mr35">"생년월일+휴대폰번호"티켓 출력 및 회원 찾기 기능</span>'
								+'<span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" id="inputtext14" title="생년월일+휴대폰번호 티켓 출력 및 회원 찾기 기능 사용" name="kioskMobileBirthdayLoginYn" value="Y" class="style_input" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
								+'<label for="inputtext14" class="mr35">사용</label>'
								+'<span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" id="inputtext15" title="생년월일+휴대폰번호 티켓 출력 및 회원 찾기 기능 사용안함" name="kioskMobileBirthdayLoginYn" value="N" class="style_input" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span>'
								+'<label for="inputtext15">사용안함</label>'
							+'</div>'
						+'</td>'
					+'</tr>'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_email"><label for="inputtext9">*이메일</label></th>'
						+'<td headers="th_joininput_info_email">'
							+'<input type="text" id="inputtext9" title="이메일 입력" name="emailAddr" maxlength="30" value="" fieldname="이메일" validate="email" required="">'
						+'</td>'
					+'</tr>'
							+'<input type="hidden" name="facebook" value="">'
							+'<input type="hidden" name="facebookUUID" value="">'
					+'<tr>'
						+'<th scope="row" id="th_joininput_info_favoritecinema">선호영화관</th>'
						+'<td headers="th_joininput_info_favoritecinema">'
							+'<div class="mt8 mb9">'
								+'<span class="text-sub">선호 영화관은 최대3개까지 등록 가능합니다.</span>'
							+'</div>'
							+'<div class="mb10">'
								+'<label for="select1" class="mr20"><span class="asterisk"></span>1순위</label>'
								+'<select class="selectGroup1" data-width="154px" style="display: none;">'
									+'<option value="">지역선택</option>'
									+'<option value="10">서울</option>'
									+'<option value="30">경기</option>'
									+'<option value="35">인천</option>'
									+'<option value="45">대전/충청/세종</option>'
									+'<option value="55">부산/대구/경상</option>'
									+'<option value="65">광주/전라</option>'
									+'<option value="70">강원</option>'
									+'<option value="80">제주</option>'
								+'</select><div class="btn-group bootstrap-select selectGroup1" style="width: 154px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" title="지역선택"><span class="filter-option pull-left">지역선택</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">지역선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">서울</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">경기</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">인천</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">대전/충청/세종</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">부산/대구/경상</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">광주/전라</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">강원</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">제주</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
								+'<select id="selectCinema1" name="cinemaCode" data-width="119px" style="display: none;">'
									+'<option value="">영화관선택</option></select>'							
								+'<div class="btn-group bootstrap-select" style="width: 119px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectCinema1" title="영화관선택"><span class="filter-option pull-left">영화관선택</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">영화관선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
							+'</div>'
							+'<div class="mb10">'
								+'<label for="select2" class="mr20"><span class="asterisk"></span>2순위</label>'
								+'<select class="selectGroup2" data-width="154px" style="display: none;">'
									+'<option value="">지역선택</option>'
									+'<option value="10">서울</option>'
									+'<option value="30">경기</option>'
									+'<option value="35">인천</option>'
									+'<option value="45">대전/충청/세종</option>'
									+'<option value="55">부산/대구/경상</option>'
									+'<option value="65">광주/전라</option>'
									+'<option value="70">강원</option>'
									+'<option value="80">제주</option>'
								+'</select><div class="btn-group bootstrap-select selectGroup2" style="width: 154px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" title="지역선택"><span class="filter-option pull-left">지역선택</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">지역선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">서울</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">경기</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">인천</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">대전/충청/세종</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">부산/대구/경상</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">광주/전라</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">강원</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">제주</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
								+'<select id="selectCinema2" name="cinemaCode2" data-width="119px" style="display: none;">'
									+'<option value="">영화관선택</option></select>'							
								+'<div class="btn-group bootstrap-select" style="width: 119px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectCinema2" title="영화관선택"><span class="filter-option pull-left">영화관선택</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">영화관선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
							+'</div>'
							+'<div>'
								+'<label for="select3" class="mr20"><span class="asterisk"></span>3순위</label>'
								+'<select class="selectGroup3" data-width="154px" style="display: none;">'
									+'<option value="">지역선택</option>'
									+'<option value="10">서울</option>'
									+'<option value="30">경기</option>'
									+'<option value="35">인천</option>'
									+'<option value="45">대전/충청/세종</option>'
									+'<option value="55">부산/대구/경상</option>'
									+'<option value="65">광주/전라</option>'
									+'<option value="70">강원</option>'
									+'<option value="80">제주</option>'
								+'</select><div class="btn-group bootstrap-select selectGroup3" style="width: 154px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" title="지역선택"><span class="filter-option pull-left">지역선택</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">지역선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">서울</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">경기</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">인천</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="4"><a tabindex="0" class="" style=""><span class="text">대전/충청/세종</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="5"><a tabindex="0" class="" style=""><span class="text">부산/대구/경상</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="6"><a tabindex="0" class="" style=""><span class="text">광주/전라</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="7"><a tabindex="0" class="" style=""><span class="text">강원</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="8"><a tabindex="0" class="" style=""><span class="text">제주</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
								+'<select id="selectCinema3" name="cinemaCode3" data-width="119px" style="display: none;">'
									+'<option value="">영화관선택</option></select>'
								+'<div class="btn-group bootstrap-select" style="width: 119px;"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="selectCinema3" title="영화관선택"><span class="filter-option pull-left">영화관선택</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">영화관선택</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>'
							+'</div>'
						+'</td>'
					+'</tr>'
				+'</tbody></table>'
				+'<input type="hidden" name="auth_Gubun" value="4">'
			+'</div>'
			+'<!-- 마케팅 활용을 위한 개인정보 수집 이용 안내 -->'
			+'<h2 class="mb35 mt50">마케팅 활용을 위한 개인정보 수집 이용 안내</h2>'
			+'<div class="personal_information_wrap">'
				+'<div id="" class="form-style">'
					+'<table class="form-table">'
						+'<caption class="blind2">개인정보 수집 및 마케팅 활용을 위한 개인정보 수집 목적, 수집 항목, 보유 및 이용 기간, 동유여부</caption>'
						+'<colgroup>'
							+'<col width="35%">'
							+'<col width="20%">'
							+'<col width="30%">'
							+'<col width="">'
						+'</colgroup>'
						+'<thead>'
							+'<tr>'
								+'<th scope="col" id="th_privacy_info_purpose">수집 목적</th>'
								+'<th scope="col" id="th_privacy_info_item">수집 항목</th>'
								+'<th scope="col" id="th_privacy_info_term">보유 및 이용 기간</th>'
								+'<th scope="col" id="th_privacy_info_agree">동의여부</th>'
							+'</tr>'
						+'</thead>'
						+'<tbody>'
							+'<tr>'
								+'<td headers="th_privacy_info_purpose" class="pl20">'
										+'당사 신규 상품/서비스 안내 및 권유.<br>'
										+'사은/할인 행사 등 각종 이벤트 정보 등의 안내 및 권유'
								+'</td>'
								+'<td headers="th_privacy_info_item">'
										+'이메일, 휴대폰번호'
								+'</td>'
								+'<td headers="th_privacy_info_term">'
										+'회원 탈퇴 시 혹은 이용 목적 달성 시까지'
								+'</td>'
								+'<td headers="th_privacy_info_agree" class="ml20">'
									+'<label for="marketingRuleAgreeY"><span class="iradio_minimal checked" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" id="marketingRuleAgreeY" name="marketingRuleAgreeYN" value="Y" class="icheck" checked="checked" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><strong>동의</strong></label>'
									+'<label for="marketingRuleAgreeN"><span class="iradio_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="radio" id="marketingRuleAgreeN" name="marketingRuleAgreeYN" value="N" class="icheck" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><strong>동의 안함</strong></label>'
								+'</td>'
							+'</tr>'
						+'</tbody>'
					+'</table>'
					+'<div class="agree_area">'
						+'<p class="txt">이벤트, 신규 서비스, 할인 혜택 등의 소식을 전해드립니다. (소멸포인트 및 공지성 안내 또는 거래정보와 관련된 내용은 수신동의 여부와 상관없이 발송됩니다.)</p>'
						+'<label for="inputtext17"><span class="icheckbox_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="checkbox" id="inputtext17" name="smsReceiveYN" value="Y" class="icheck" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><span>휴대폰 번호</span></label>'
						+'<span></span>'
						+'<label for="inputtext16" class="ml100"><span class="icheckbox_minimal" style="vertical-align: middle; display: inline-block; width: 18px; height: 18px; position: relative;" aria-checked="false" aria-disabled="false"><input type="checkbox" id="inputtext16" name="mailingReceiveYN" value="Y" class="icheck" style="position: absolute; top: 0px; left: 0px; display: block; width: 16px; height: 16px; padding: 0px; margin: 0px; background: rgb(255, 255, 255); z-index: 0; border: 0px; opacity: 1;"><ins class="iCheck-helper" style="position:absolute; width:16px; height:16px; top:0px; left:0px; background-color:#fff; z-index:0"></ins></span><span>이메일</span></label>'
						+'<span></span>'
					+'</div>'
				+'</div>'
			+'</div>'
			+'<!-- //마케팅 활용을 위한 개인정보 수집 이용 안내 -->'
			+'<div class="btn_wrap text-center mt50">'
//			+'<button type="button" class="img_btn user cancel mr7" onclick="showMenu('user-join')">취소</button>'
			+'<button type="button" id="img_btn_user_cancel_mr7" class="img_btn user cancel mr7" onclick="showMenu()">취소</button>'
				+'<button type="button" id="img_btn_user_ok_ml7" class="img_btn user ok ml7" onclick="UserJoin.save()" id="userJoinOk">확인</button>'
			+'</div>'
		+'</div> <!-- user_wrap -->'
	+'</div>'
	+'<!-- //container -->'
	+'<form name="profileFrm" enctype="multipart/form-data">'
		+'<input type="file" style="display:none;" name="profile" id="profilePhoto" value="Choose Photo" accept="image/png,image/jpeg">'
		+'<input type="hidden" name="section" value="profile">'
	+'</form>'
	+'</div>';
		},
		malert : ()=>{
			return '<div class="custom_alert" style="position: absolute; top: 259.5px; left: 242.5px;">'					
			+'<div class="ca_header">'
			    /* +'<h6>비밀번호 변경</h6>	'*/
			     +'<h6>'+x+'</h6>	'
			+'</div>'		
			+'<div class="ca_body">		'	
			     /*+'<p>비밀번호 재입력을 다시 확인해주세요.</p>		'*/
			     +'<p>'+y+'</p>		'
			+'</div>		'
			+'<div class="ca_footer">	'		
				+'<button type="button" class="img_btn booking ok" onmousedown="" autofocus="" onclick="messageBoxClose()">확인</button>	'	
			+'</div>'		
			+'<button type="button" class="img_btn booking btn_ca_close" onmousedown="">알림닫기</button>	'
		+'</div>'	;
		}

	};
