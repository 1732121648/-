
var roleName = null;
var roleCode = null;
var addBtn = null;
var backBtn = null;


$(function(){
	roleName = $("#roleName");
	roleCode = $("#roleCode");
	addBtn = $("#save");
	backBtn = $("#back");
	//初始化的时候，要把所有的提示信息变为：* 以提示必填项，更灵活，不要写在页面上
	roleCode.next().html("*");
	roleName.next().html("*");


	/*
	 * 验证
	 * 失焦\获焦
	 * jquery的方法传递
	 */
	roleCode.bind("blur",function(){
		//ajax后台验证--userCode是否已存在
		//user.do?method=ucexist&userCode=**
		$.ajax({
			type:"post",//请求类型
			url:path+"/jsp/findByRoleCode",//请求的url
			data:{"roleCode":roleCode.val()},//请求参数
			dataType:"json",//ajax接口（请求url）返回的数据类型
			success:function(data){//data：返回数据（json对象）
				if(data.RoleCode == "exist"){//账号已存在，错误提示
					validateTip(roleCode.next(),{"color":"red"},imgNo+ " 该角色编码已存在",false);
				}else{//账号可用，正确提示
					validateTip(roleCode.next(),{"color":"green"},imgYes+" 该角色编码可以使用",true);
				}
			},
			error:function(data){//当访问时候，404，500 等非200的错误状态码
				validateTip(roleCode.next(),{"color":"red"},imgNo+" 您访问的页面不存在",false);
			}
		});
		
	}).bind("focus",function(){
		//显示友情提示
		validateTip(roleCode.next(),{"color":"#666666"},"* 用户编码是您登录系统的账号",false);
	}).focus();

	roleName.on("focus",function(){
		validateTip(roleName.next(),{"color":"#666666"},"* 请输入角色名称",false);
	}).on("blur",function(){
		if(roleName.val() != null && roleName.val() != ""){
			validateTip(roleName.next(),{"color":"green"},imgYes,true);
		}else{
			validateTip(roleName.next(),{"color":"red"},imgNo+" 角色名称不能为空，请重新输入",false);
		}
	});

	roleCode.on("focus",function(){
		validateTip(roleCode.next(),{"color":"#666666"},"* 请输入角色编码",false);
	}).on("blur",function(){
		if(roleCode.val() != null && roleCode.val() != ""){
			validateTip(roleCode.next(),{"color":"green"},imgYes,true);
		}else{
			validateTip(roleCode.next(),{"color":"red"},imgNo+"角色编码不能为空，请重新输入",false);
		}

	});
	
	addBtn.bind("click",function(){
		if(roleCode.attr("validateStatus") != "true"){
			roleCode.blur();
		}else if(roleName.attr("validateStatus") != "true"){
			roleName.blur();
		}else{
			if(confirm("是否确认提交数据")){
				$("#userForm").submit();
			}
		}
	});
	
	backBtn.on("click",function(){
		if(referer != undefined 
			&& null != referer 
			&& "" != referer
			&& "null" != referer
			&& referer.length > 4){
		 window.location.href = referer;
		}else{
			history.back(-1);
		}
	});
});