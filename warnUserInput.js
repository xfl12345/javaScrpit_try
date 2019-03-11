var warmingDivCount;
var xzzsInit=function(limitTarget){
	var EleId;
	for(var i=0,tmpvar; i<limitTarget.length ;i++){
		//var maxLen=limitTarget[i].getAttribute("maxlength");
		tmpvar=i+1;
		EleId=limitTarget[i].getAttribute("id");
		
		if(EleId == null){
			limitTarget[i].setAttribute("id","inputNo_"+tmpvar);
			EleId="inputNo_"+tmpvar;
		}
		console.log("process:"+EleId);
		//alert(limitTarget[i]);
		var parentOfinputE=xzzsParentNode(limitTarget[i]);
		
		if(!parentOfinputE.getAttribute("id"))
			parentOfinputE.setAttribute("id",EleId+"_"+tmpvar);
		if(  (limitTarget[i].getAttribute("type")=="text" || limitTarget[i].getAttribute("type")=="password")  )
		{
			limitTarget[i].addEventListener('focus',xzzsCreate.bind(this,EleId));
			limitTarget[i].addEventListener('blur',xzzsRemove.bind(this,EleId));
			limitTarget[i].addEventListener('keyup',xzzs.bind(this,EleId));
			/*
			limitTarget[i].addEventListener('focus',abc.bind(this,limitTarget[i].getAttribute("id")+" is focus."));
			limitTarget[i].addEventListener('blur',abc.bind(this,limitTarget[i].getAttribute("id")+" is blur."));
			*/
			console.log("processed:"+EleId);
		}
			
		/*
		limitTarget[i].setAttribute("onfocus","xzzsCreate('"+EleId+"')");
		limitTarget[i].setAttribute("onblur","xzzsRemove('"+EleId+"')");
		limitTarget[i].setAttribute("onkeyup","xzzs('"+EleId+"')");
		*/
	}
}
function xzzsCreate(inputE){
	var aim = xzzsParentNode(document.getElementById(inputE));
	/*var aim = inputE;*/
	var idOfMarkedWords=inputE+'xz';
	if(document.getElementById(idOfMarkedWords))
		return;
	console.log("xzzsCreate("+inputE+");Running!");
	if(aim.tagName=="TR")
		var markedWords = document.createElement("td");
	else
		var markedWords = document.createElement("div");
	markedWords.setAttribute("id",idOfMarkedWords);
	markedWords.setAttribute("class","JSinsert");
	//markedWords.setAttribute("style","display:block;");
	markedWords.style.display = "block;";
	//markedWords.innerHTML="<br>Worked!";
	aim.appendChild(markedWords);
	warmingDivCount++;
	console.log("xzzsCreate("+inputE+");Done!");
}
function xzzsRemove(inputE){
	var aim = document.getElementById(inputE);
	/*var aim = inputE;*/
	var idOfMarkedWords=aim.getAttribute("id")+'xz';
	
	/* DIY code start*/
	if(friendlyWarming(inputE)){
		var markedWords = document.getElementById(idOfMarkedWords);
		markedWords.style.display="block";
		return;
	}
	/* DIY code end*/
	console.log("xzzsRemove("+inputE+");Running!");
	var parentOfthisnode = xzzsParentNode(aim);
	var markedWords = document.getElementById(idOfMarkedWords);
	parentOfthisnode.removeChild(markedWords);
	warmingDivCount--;
	console.log("xzzsRemove("+inputE+");Done!");
};

function xzzs(inputE){
	var inputEle = document.getElementById(inputE);
	/*var inputEle = inputE;*/
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
function xzzsParentNode(inputE){
	var child=inputE;
	var parentEle=child.parentNode;
	if(parentEle.tagName=="TD")
		for(parentEle=parentEle.parentNode ; parentEle.tagName != "TR" ; parentEle=parentEle.parentNode );
	if(parentEle.tagName=="td")
		for(parentEle=parentEle.parentNode ; parentEle.tagName != "tr" ; parentEle=parentEle.parentNode );
	/*
	var tmpvar=document.getElementById("jsDebug");
	tmpvar.innerHTML=tmpvar.innerHTML+child.tagName+"&nbsp;"+parentEle;
	if(parentEle)
		tmpvar.innerHTML=tmpvar.innerHTML+"&nbsp;"+parentEle.tagName;
	tmpvar.innerHTML=tmpvar.innerHTML+"<br>";
	*/
	return parentEle;
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
var outputDebug=function(){
	
};
window.onload=function(){
	var kuan=document.documentElement.clientWidth;
	var gao=document.documentElement.clientHeight;
	document.styleSheets[0].cssRules[0].style.left=kuan/2 +"px";
	
	
	var AllinputE = document.getElementsByTagName("input");
	xzzsInit(AllinputE);
	var AlltextareaE = document.getElementsByTagName("textarea");
	xzzsInit(AlltextareaE);
	
	var passwordRecheckEle=document.getElementById("password2");
	if(passwordRecheckEle)
		passwordRecheckEle.setAttribute("compareWithTarget","password");
	warmingDivCount=0;
};
function abc(key){
    console.log(key);
}
