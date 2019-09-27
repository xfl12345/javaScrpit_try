var warmingDivCount = 0;
var secondPasswordConfirm = null;
var passwordTypeCount = 0;
var nickNameCanBeNull = false;
function xzzsInit(limitTarget){
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
			if( limitTarget[i].getAttribute("type")=="password" ) 
			{
				passwordTypeCount++;
				if(passwordTypeCount == 2)
				{
					secondPasswordConfirm = limitTarget[i].getAttribute("id");
				}
			}
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
	var idOfMarkedWords=inputE+'xz';
	if(document.getElementById(idOfMarkedWords))
	{
		return;
	}
	var aim = xzzsParentNode(document.getElementById(inputE));
	console.log("xzzsCreate("+inputE+");Running!");
	if(aim.tagName=="TABLE")
	{
		var trEle = aim.getElementsByTagName("tr");
		var childTdCountMax = 0;
		for(var i=0,tmpCount; i < trEle.length ;i++)
		{
			tmpCount = trEle[i].getElementsByTagName("td").length;
			if(tmpCount > childTdCountMax)
			{
				childTdCountMax = tmpCount;
			}
		}
		var inputEleTrNode = document.getElementById(inputE).parentNode ;
		for(; inputEleTrNode.tagName != "TR" ; inputEleTrNode = inputEleTrNode.parentNode );
		var markedWords = document.createElement("td");
		markedWords.setAttribute("id",idOfMarkedWords);
		markedWords.colSpan = childTdCountMax;
		markedWords.style.display = "table-cell";
		markedWords.classList.add("JSinsert");
		var markedWordsParent = document.createElement("tr");
		markedWordsParent.setAttribute("id",idOfMarkedWords+"P");
		markedWordsParent.appendChild(markedWords);
		/*
		for(var t=1 ; t < childTdCountMax ; t++)
		{
			markedWordsParent.appendChild(document.createElement("td"));
		}
		*/
		insertAfter(markedWordsParent,inputEleTrNode);
	}
	else
	{
		var markedWords = document.createElement("div");
		markedWords.setAttribute("id",idOfMarkedWords);
		markedWords.classList.add("JSinsert");
		markedWords.style.display = "block";
		aim.appendChild(markedWords);
	}
	//markedWords.innerHTML="<br>Worked!";
	warmingDivCount++;
	console.log("xzzsCreate("+inputE+");Done!\nWDC:"+warmingDivCount+"\n");
}
function xzzsRemove(inputE){
	console.log("xzzsRemove("+inputE+");Running!");
	var idOfMarkedWords = document.getElementById(inputE).getAttribute("id") +'xz';
	var markedWords = document.getElementById(idOfMarkedWords);
	/* DIY code start*/
	if(friendlyWarming(inputE)){
		xzzsBlockShow(markedWords);
		/*console.log(entireNode.getAttribute("id"));*/
		console.log("xzzsRemove("+inputE+");exit!");
		return;
	}
	/* DIY code end*/
	xzzsEntireNode(markedWords).parentNode.removeChild(xzzsEntireNode(markedWords));
	warmingDivCount--;
	console.log("xzzsRemove("+inputE+");Done!\nWDC:"+warmingDivCount+"\n");
};
function xzzs(inputE){
	var inputEle = document.getElementById(inputE);
	/*var inputEle = inputE;*/
	var idOfMarkedWords=inputE+'xz';
	var markedWords = document.getElementById(idOfMarkedWords);
	var maxcharLength;
	if(inputEle.getAttribute("maxlength"))
	{
		maxcharLength= parseInt(inputEle.getAttribute("maxlength"));
	}
	else
	{
		maxcharLength=0;
	}
	
	var lenTmp = inputEle.value.length;
	//if(markedWords.style.display=="none")
	//	markedWords.style.display="block";
	//markedWords.innerText='目前输入的长度为 '+lenTmp;
	if( lenTmp > (maxcharLength - 6))
	{
		if(lenTmp <= maxcharLength && lenTmp >= maxcharLength -5 )
		{
			if(markedWords.style.display=="none")
			{
				xzzsBlockShow(markedWords);
			}
			markedWords.innerHTML="您还可以继续输入 "+"<span style=\"color:blue;\">"+(maxcharLength-lenTmp)+"</span>"+" 个字符";
		}
	}
	else if( lenTmp > (maxcharLength - 6)/4 )
	{
		markedWords.innerHTML="您已输入 "+"<span style=\"color:green;\">"+lenTmp+"</span>"+" 个字符";
	}
	else
	{
		markedWords.style.display="none";
	}
};
function xzzsParentNode(inputE){
	var inputEParent = inputE.parentNode;
	if(inputEParent.tagName == "TD")
	{
		for(inputEParent = inputEParent.parentNode ; inputEParent.tagName != "TABLE" ; inputEParent = inputEParent.parentNode );
	}
	return inputEParent;
}
function xzzsEntireNode(markedWords){
	var aim;
	if(markedWords.tagName == "TD")
	{
		aim = markedWords.parentNode;
	}
	else
	{
		aim = markedWords;
	}
	return aim;
}
function xzzsBlockShow(markedWords){
	if(markedWords.tagName == "TD")
	{
		markedWords.style.display = "table-cell";
	}
	else
	{
		markedWords.style.display = "block";
	}
}
function friendlyWarming(inputE){
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
	}
	if(typeOfEle == typeString2){
		if(inputE == 'nickName'){
			if(!nickNameCanBeNull && aim.value.length<1){
				markedWords.innerText='昵称别漏了哦！';
				keepWarming=true;
			}
		}else if(inputE == 'userName'){
			if(aim.value.length<1){
				markedWords.innerText='用户名别漏了哦！';
				keepWarming=true;
			}
		}else if(inputE == 'email'){
			if(aim.value.length<1){
				markedWords.innerText='邮箱地址别漏了哦！';
				keepWarming=true;
			}else if(!isEmail(aim.value)){
				markedWords.innerText='请重新输入一个合法的邮箱地址！';
				keepWarming=true;
			}
		}
	}
	if(!keepWarming){
		var minLenA=aim.getAttribute("minlength");
		if(minLenA){
			var minLen = parseInt(minLenA);
			if(aim.value.length <=  minLen){
				minLen++;
				markedWords.innerText='长度至少 '+ minLen +' 位！';
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
function inputUnfinishCount(target){
	var count=0;
	for(var i=0,tmpvar; i<target.length ;i++)
	{
		if(  target[i].getAttribute("type")=="text" ||
		     target[i].getAttribute("type")=="password"  )
		if(target[i].value == null)
		{
			count++;
		}
		else if(target[i].value.length<=1)
		{
			count++;
		}
	}
	return count;
};
function inputLenghtCheck(target){
	if(target.value==null)
	{
		return false;
	}
	else if(target.value.length<=1)
	{
		return false;
	}
	return true;
};
function finalcheck(){
	var is_done=true;
	
	if(warmingDivCount>0)
	{
		is_done=false;
	}
	else
	{
		var AllinputE = document.getElementsByTagName("input");
		var AlltextareaE = document.getElementsByTagName("textarea");
		var inputEleUnfinishCount = inputUnfinishCount(AllinputE);
		console.log("finalcheck:unfinishCount="+inputEleUnfinishCount);
		if( inputUnfinishCount(AlltextareaE) > 0 )
		{
			is_done = false;
		}
		else if( inputEleUnfinishCount <= 1)
		{
			is_done = false;
			if(inputEleUnfinishCount == 1 && nickNameCanBeNull)
			{
				var nicknameEle = document.getElementById("nickName");
				if(nicknameEle)
				{
					if( !inputLenghtCheck(nicknameEle)) 
					{
						is_done = true;
					}
				}
			}
		}
	}
    if(!is_done)
		alert("还有些东东没搞定呢！");
    return is_done;
};
function insertAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }
	else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
window.onload=function(){
	/*
	var kuan=document.documentElement.clientWidth;
	var gao=document.documentElement.clientHeight;
	document.styleSheets[0].cssRules[0].style.left=kuan/2 +"px";
	*/
	
	var AllinputE = document.getElementsByTagName("input");

	xzzsInit(AllinputE);
	var AlltextareaE = document.getElementsByTagName("textarea");
	xzzsInit(AlltextareaE);
	
	if(secondPasswordConfirm != null)
	{
		var passwordRecheckEle=document.getElementById(secondPasswordConfirm);
		if(passwordRecheckEle)
			passwordRecheckEle.setAttribute("compareWithTarget","password");
	}
	warmingDivCount=0;
};
