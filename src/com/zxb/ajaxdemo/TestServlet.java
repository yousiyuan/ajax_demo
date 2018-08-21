package com.zxb.ajaxdemo;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestServlet extends HttpServlet {

	private static final long serialVersionUID = 2120983832780275828L;

	public TestServlet() {
	}

	@Override
	public void init() throws ServletException {
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String k = req.getParameter("k");
		String v = req.getParameter("v");
		System.out.println(k);
		System.out.println(v);
		
		
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/json;UTF-8");
		resp.getWriter().write(
				"<h4>" + new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date()) + "</h4>");
		resp.getWriter().write("<font color='blue'>皇甫卓：</font><br />");
		resp.getWriter().write("<font color='red'>妖女，这些村民是不是你害的，回答！</font>");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String k = req.getParameter("k");
		String v = req.getParameter("v");
		System.out.println(k);
		System.out.println(v);
		
		
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/json;UTF-8");
		resp.getWriter().write(
				"<h4>" + new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date()) + "</h4>");
		resp.getWriter().write("<font color='red'>请别说爱上我是一个错，哪怕注定没有结果，我爱你胜过你爱我</font>");
	}

	@Override
	public void destroy() {
	}
}
