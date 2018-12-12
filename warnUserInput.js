var warmingDivCount;
var xzzsInit=function(limitTarget){
	for(var i=0,tmpvar; i<limitTarget.length ;i++){
		//var maxLen=limitTarget[i].getAttribute("maxlength");
		tmpvar=i+1;
		var EleId=limitTarget[i].getAttribute("id");
		if(!EleId){
			limitTarget[i].setAttribute("id","inputNo_"+tmpvar);
			EleId="inputNo_"+tmpvar;
		}
		//var inputE=document.getElementById(EleId);
		var parentOfinputE=limitTarget[i].parentNode;
		if(!parentOfinputE.getAttribute("id"))
			parentOfinputE.setAttribute("id",EleId+"_"+tmpvar);
		if(  !(limitTarget[i].getAttribute("type")=="text" || limitTarget[i].getAttribute("type")=="password")  )
		continue;
		limitTarget[i].setAttribute("onfocus","xzzsCreate('"+EleId+"')");
		limitTarget[i].setAttribute("onblur","xzzsRemove('"+EleId+"')");
		limitTarget[i].setAttribute("onkeyup","xzzs('"+EleId+"')");
	}
}
var xzzsCreate=function(inputE){
	var aim = document.getElementById(inputE).parentNode;
	var idOfMarkedWords=inputE+'xz';
	if(document.getElementById(idOfMarkedWords))
		return;
	var markedWords = document.createElement("div");
	markedWords.setAttribute("id",idOfMarkedWords);
	markedWords.setAttribute("class","JSinsert");
	markedWords.setAttribute("style","display: block;");
	//markedWords.innerHTML="<br>Worked!";
	aim.appendChild(markedWords);
	warmingDivCount++;
}
var xzzsRemove=function(inputE){
	/* DIY code start*/
	if(friendlyWarming(inputE)){
		var idOfMarkedWords=inputE+'xz';
		var markedWords = document.getElementById(idOfMarkedWords);
		markedWords.style.display="block";
		return;
	}
	/* DIY code end*/
	var parentOfthisnode = document.getElementById(inputE).parentNode;
	var idOfMarkedWords=inputE+'xz';
	var markedWords = document.getElementById(idOfMarkedWords);
	parentOfthisnode.removeChild(markedWords);
	warmingDivCount--;
};
var xzzs=function(inputE){
	//var inputE1 =inputE.toString();
	var inputEle = document.getElementById(inputE);
	var idOfMarkedWords=inputE+'xz';
	var markedWords = document.getElementById(idOfMarkedWords);
	var maxcharLength;
	//alert(inputEle);
	if(inputEle.getAttribute("maxlength")){
		maxcharLength= parseInt(inputEle.getAttribute("maxlength"));
	}else{
		maxcharLength=0;
	}
	
	var LenTmp = inputEle.value.length;
	//if(markedWords.style.display=="none")
	//	markedWords.style.display="block";
	//markedWords.innerText='目前输入的长度为 '+LenTmp;
	if( LenTmp > (maxcharLength - 6)){
		if(LenTmp <= maxcharLength && LenTmp >= maxcharLength -5 ){
			if(markedWords.style.display=="none")
				markedWords.style.display="block";
			markedWords.innerText='您还可以继续输入 '+(maxcharLength-LenTmp)+' 个字符';
		}
	}else{
			markedWords.style.display="none";
	}
};
var friendlyWarming=function(inputE){
	var aim=document.getElementById(inputE);
	var idOfMarkedWords=inputE+'xz';
	var markedWords = document.getElementById(idOfMarkedWords);
	var typeOfEle=aim.getAttribute("type");
	var typeString1='password';
	var typeString2='text';
	var keepWarming=false;
	
	if(typeOfEle == typeString1){
		if(aim.getAttribute("compareWithTarget")){
			var key1=document.getElementById(aim.getAttribute("compareWithTarget")).value;
			var key2=aim.value;
			if(key1 != key2){
				markedWords.innerText='密码不一致，请重新输入！';
				keepWarming=true;
			}
		}
		else{
			var minLen=aim.getAttribute("minlength");
			if(minLen){
				if(aim.value.length<=minLen){
					minLen++;
					markedWords.innerText='密码长度至少 '+ minLen +' 位！';
					keepWarming=true;
				}
			}
		}
	}
	if(typeOfEle == typeString2){
		if(inputE == 'userName'){
			if(aim.value.length<1){
				markedWords.innerText='用户名别漏了哦！';
				keepWarming=true;
			}
		}
		if(inputE == 'email'){
			if(aim.value.length<1){
				markedWords.innerText='邮箱地址别漏了哦！';
				keepWarming=true;
			}else if(!isEmail(aim.value)){
				markedWords.innerText='请重新输入一个合法的邮箱地址！';
				keepWarming=true;
			}
		}
	}
	return keepWarming;
};
function isEmail(str){ 
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
};
function inputLenghtCheck(Target){
	for(var i=0,tmpvar; i<Target.length ;i++){
		if(Target.value==null){
			return false;
		}else{
			if(Target.value.length<=1)
				return false;
		}
	}
	return true;
};
var finalcheck=function(){
	
	var is_done=true;
	
	if(warmingDivCount>0){
		is_done=false;
	}
	else{
		var AllinputE = document.getElementsByTagName("input");
		var AlltextareaE = document.getElementsByTagName("textarea");
		if( !(inputLenghtCheck(AllinputE)&&inputLenghtCheck(AlltextareaE)) )
			is_done=false;
	}
    if(!is_done)
    	alert("还有些东东没搞定呢！");
    return is_done;
};

window.onload=function(){	
	var AllinputE = document.getElementsByTagName("input");
	xzzsInit(AllinputE);
	var AlltextareaE = document.getElementsByTagName("textarea");
	xzzsInit(AlltextareaE);
	
	var passwordRecheckEle=document.getElementById("password2");
	if(passwordRecheckEle)
		passwordRecheckEle.setAttribute("compareWithTarget","password");
	warmingDivCount=0;
};
