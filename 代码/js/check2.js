function checkUser() {
	var user=document.getElementById("user").value;
	var userMsg=document.getElementById("userMsg");
	userMsg.innerHTML="";
	//用户名长度为在4—12字符（要求使用正则表达式）
	var userReg=/^[\w]{4,12}$/gi;//
	if(userReg.test(user)==false)//
	{
		userMsg.innerHTML="用户名有误，请重新输入 ！";
		return false;
	}
	return true;
}
function checkPwd() {
	var pwd=document.getElementById("pwd").value;
	var pwdMsg=document.getElementById("pwdMsg");
	pwdMsg.innerHTML="";
	//密码长度为在6—12字符（要求使用正则表达式）
	var pwdReg=/^[\w]{6,12}$/gi;
	if(pwdReg.test(pwd)==false){
		pwdMsg.innerHTML="密码输入有误，请重新输入";
		return false;
	}
	return true;
}
function checkRepwd() {
	var repwd=document.getElementById("repwd").value;
	var repwdMsg=document.getElementById("repwdMsg");
	var pwd=document.getElementById("pwd").value;
	repwdMsg.innerHTML="";
	if(pwd!=repwd){
		repwdMsg.innerHTML="两次输入的密码不一致";
		return false;
	}
	return true;
}
function checkEmail(){
	var mail=document.getElementById("email").value;
	var emailMsg=document.getElementById("emailMsg");
	emailMsg.innerHTML="";
	//电子邮件地址是否包含“@”、“.”（要求使用正则表达式）
	var mailReg= /\@|\./gi;
	if(mailReg.test(mail)==false){//检测Email
		emailMsg.innerHTML="电子邮件地址输入有误";
		return false;
	}
	return true;
}
function checkSex() {
	var sexMsg=document.getElementById("sexMsg");
	sexMsg.innerHTML="";
	var j=0;
	var sex=document.getElementsByName("sex");
	for(var i=0;i<sex.length;i++){
		if(sex[i].checked==true){
			j=1;
			break;
		}
	}
	if(j==0){
		sexMsg.innerHTML="请选择性别";
		return false;
	}
	return true;
}
function checkAll(){
	if(checkUser()&&checkPwd()&&checkRepwd()&&checkEmail()&&checkSex()) {
		//所有函数返回true时提交表单
		return true;
	}
	else {
		return false;
	}
	return true;
}
