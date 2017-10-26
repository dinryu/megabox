package com.megabox.web.controller;
/*
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JYController {

}
*/
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
 
import com.megabox.web.command.Command;
import com.megabox.web.domain.Member;
import com.megabox.web.domain.Movie;
import com.megabox.web.mapper.JYMapper;
import com.megabox.web.service.IGetService;
import com.megabox.web.service.IPutService;

 @RestController
 public class JYController {
	@Autowired Command cmd;
	@Autowired Movie sw;
	@Autowired Member member;
	@Autowired JYMapper JYmapper;
	
	
	@RequestMapping(value="/login",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody Map<?,?> login(@RequestBody Map<String,String> login){
		Map<String,Object> map = new HashMap<>();
		IGetService loginService = null;
		cmd.setSearch(login.get("id"));
		loginService=(x)->{
			return JYmapper.selectOne(cmd);
		};
		member = (Member) loginService.execute(cmd);
		
		if(member.getPassword().equals(login.get("password"))) {
			map.put("msg", "성공");
			map.put("member", member);
		}else {
			map.put("msg", "실패");
		}
		
		return map;
	}
	
	@RequestMapping(value="/get/idfind",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody Map<?,?> idfind(@RequestBody Map<String,String> idfind){
		System.out.println("아이디 찾기 => 넘어온 이름 :"+idfind.get("name")+" 생일 : "+idfind.get("birth")+" 핸드폰번호 :"+idfind.get("phone"));
		Map<String,Object> map=new HashMap<>();
		IGetService findService = null;
		
		sw.setMovieSeq(idfind.get("name"));
		sw.setMovieTitle(idfind.get("phone"));

		findService = (x)-> {		
			return JYmapper.findById(sw);			
		};
		member = (Member) findService.execute(sw);
		if(member != null) {
			map.put("member", member);
			map.put("msg", "성공");
		} else {
			map.put("msg", "실패");
		};
		return map;	
	}
	
	@RequestMapping(value="/get/pwfind",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody Map<?,?> pwfind(@RequestBody Map<String,String> pwfind){
		System.out.println("아이디 찾기 => 넘어온 아이디 :"+pwfind.get("id")+", 이름 : "+pwfind.get("name")+", 이메일 :"+pwfind.get("email"));
		Map<String,Object> map=new HashMap<>();
		IGetService findService = null;
		
		sw.setMovieSeq((String) pwfind.get("id"));
		sw.setMovieTitle((String) pwfind.get("name"));

		findService = (x)-> {		
			return JYmapper.findByPw(sw);			
		};
		member = (Member) findService.execute(sw);
		System.out.println("member : "+member);
		if(member != null) {
			map.put("member", member);
			map.put("msg", "성공");
		} else {
			map.put("msg", "실패");
		};
		return map;	
	}
	
	@RequestMapping(value="/get/pwupdate",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody Map<?,?> pwupdate(@RequestBody Map<String,String> pwupdate){
		System.out.println("비번변경 => 넘어온 아이디 :"+pwupdate.get("id")+", 비번 : "+pwupdate.get("oldpass"));
		Map<String,Object> map=new HashMap<>();
		IGetService idChkService = null;
		IPutService pwUpdateService = null;
		cmd.setSearch(pwupdate.get("id"));
		idChkService=(x)->{
			return JYmapper.selectOne(cmd);
		};
		member = (Member) idChkService.execute(cmd);
		System.out.println("id check 후 : "+member.getId());
		
		if(member.getPassword().equals(pwupdate.get("oldpass"))) {
			System.out.println("password 가 같으면 : "+member.getPassword());
			member.setPassword(pwupdate.get("newpass"));
			member.setId(pwupdate.get("id"));
			pwUpdateService=(x)->{
				JYmapper.passUpdate(member);
			};
			pwUpdateService.execute(cmd);
			map.put("msg", "성공");
			System.out.println("password update 후 : "+member.getPassword());
		}else {
			System.out.println("password 비교 실패 : "+member.getPassword());
			map.put("msg", "실패");
		}
						
		return map;	
	}
	
 
 }