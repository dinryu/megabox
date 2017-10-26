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
			map.put("msg", "����");
			map.put("member", member);
		}else {
			map.put("msg", "����");
		}
		
		return map;
	}
	
	@RequestMapping(value="/get/idfind",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody Map<?,?> idfind(@RequestBody Map<String,String> idfind){
		System.out.println("���̵� ã�� => �Ѿ�� �̸� :"+idfind.get("name")+" ���� : "+idfind.get("birth")+" �ڵ�����ȣ :"+idfind.get("phone"));
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
			map.put("msg", "����");
		} else {
			map.put("msg", "����");
		};
		return map;	
	}
	
	@RequestMapping(value="/get/pwfind",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody Map<?,?> pwfind(@RequestBody Map<String,String> pwfind){
		System.out.println("���̵� ã�� => �Ѿ�� ���̵� :"+pwfind.get("id")+", �̸� : "+pwfind.get("name")+", �̸��� :"+pwfind.get("email"));
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
			map.put("msg", "����");
		} else {
			map.put("msg", "����");
		};
		return map;	
	}
	
	@RequestMapping(value="/get/pwupdate",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody Map<?,?> pwupdate(@RequestBody Map<String,String> pwupdate){
		System.out.println("������� => �Ѿ�� ���̵� :"+pwupdate.get("id")+", ��� : "+pwupdate.get("oldpass"));
		Map<String,Object> map=new HashMap<>();
		IGetService idChkService = null;
		IPutService pwUpdateService = null;
		cmd.setSearch(pwupdate.get("id"));
		idChkService=(x)->{
			return JYmapper.selectOne(cmd);
		};
		member = (Member) idChkService.execute(cmd);
		System.out.println("id check �� : "+member.getId());
		
		if(member.getPassword().equals(pwupdate.get("oldpass"))) {
			System.out.println("password �� ������ : "+member.getPassword());
			member.setPassword(pwupdate.get("newpass"));
			member.setId(pwupdate.get("id"));
			pwUpdateService=(x)->{
				JYmapper.passUpdate(member);
			};
			pwUpdateService.execute(cmd);
			map.put("msg", "����");
			System.out.println("password update �� : "+member.getPassword());
		}else {
			System.out.println("password �� ���� : "+member.getPassword());
			map.put("msg", "����");
		}
						
		return map;	
	}
	
 
 }