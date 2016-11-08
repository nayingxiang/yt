/*思路
1判断浏览器
document.getElementByClassname
2获取所有元素
3元素类名是否等于指定类名
4符合条件存储元素
5返回数组 
*/
function getClass(classname,obj){
	obj=obj||document;

	if (obj.getElementByClassname){
		return obj.getElementsByClassName(classname);
	}
	else{
		var arr=[];
		var all=obj.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){
			if(chekclass(all[i].className,classname)){
				arr.push(all[i])
			}	
		}return arr;
	}
}
 /* chekclass(classStr,classname)
 calssStr 是否等于classname
*/
function chekclass(classStr,classname){
	 var all=classStr.split(" ");
	 for(var i=0;i<all.length;i++){
	 	if(all[i]==classname){
	 		return true;
	 	}
	 }
	 return false
}

/*$函数 获取元素
$(selecter,范围)
$(.one)获取指定类名
$(#one)获取指定id
$("标签")获取指定标签
1初始化参数（范围）
2slecter.trim()
3获取元素
*/
function $(selecter,range){
	if(typeof selecter=="function"){
		window.onload=function(){
			selecter();
		}
	}
	else if(typeof selecter=="string"){
	range=range||document;
	selecter.trim();
	if(selecter.charAt(0)=="."){
		 return getClass(selecter.substring(1),range)
	}
     else if(selecter.charAt(0)=="#"){
	 return range.getElementById(selecter.substring(1),range)}
	else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selecter)){
		 return range.getElementsByTagName(selecter)}
    else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(selecter)){
    	return document.createElement(selecter.slice(1,-1))
    }
}

}


/*getContent 
判断是获取还是设置
设置
判断浏览器兼容
获取
判断浏览器兼容*/

function getContent(obj,value){
	if(value){
		if(obj.innerText){
			obj.innerText=value
			}
		else{
		obj.textContent=value
			}
	}
	else{	
		if(obj.innerText){
			 return obj.innerText
			}
		else{
		     return obj.textContent
			}
	}
}

/*获取样式*/
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}
	else {
		return obj.currentStyle[attr];
	}
}

/*obj 获取指定子元素对象集合
obj 指定对象
type 指定会的子元素节点类型(布尔值 true false)
 true 元素节点 
 false 元素节点和有意义的文本
1 获得所有子元素
2 节点类型
(/\s*|\s*$/g,"")(\s 表示空白)

*/ 
 function getChilds(obj,type){
 	var type=type==undefined?true:type;
 	var arr=[];
 	var childs=obj.childNodes;
 	if(type){
 	for(var i=0;i<childs.length;i++){
 		if(childs[i].nodeType==1){
 			arr.push(childs[i])
 		}
 }
}
 else{
 for(var i=0;i<childs.length;i++){
 	if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/\s*|\s*$/g,""))){
	   arr.push(childs[i])
}
}[]
 }
 return arr;
}

/*getNext(obj)
获取他的兄弟元素（元素节点）
       1先获取兄弟节点 next
       没有 false
       2有
       判断兄弟节点  nodeTYPE ！=1
       next=nextSibling
       next==null false
       nodeType=1
       重复 步骤 2
       return next
*/
 
function getNext(obj,type){
   	var type=type?type:false;
   	var next=obj.nextSibling;
   	if(type===false){
       if(!next){
   		 return false;
   		 }
   		 while(next.nodeType==3||next.nodeType==8){
   		 	next=next.nextSibling;
   		 	if(!next){
   		 return false;
   		 }
   		 }
   }else if(type===true){
      if(!next){
   		 return false;
   		 }
   		 while((next.nodeType==3&&/^\s+$/.test(next.nodeValue))||next.nodeType==8){
   		 	next=next.nextSibling;
   		 	if(!next){
   		 return false;
   		 }
   		 }
   	}
   	
   	
   }


// function getprevious(obj,type){
//        type=type==undefined?true:type;
//        if(type){
//        	var previous=obj.previousSibling;
//        	if(previous==null){
//        		return false
//        	}
//        	while(previous.nodeType==3||previous.nodeType==8){
//        		previous=previous.previousSibling;
//        		if(previous==null){
//        			return false;
//        		}
//        	}return previous

//        }else{
//        	var previous=obj.previousSibling;
//        	if(previous==null){
//        		return false
//        	}
//        	while(!(previous.nodeType==8||(previous.nodeType==3&&previous.nodeValue.replace(/\s*|\s*$/g,"")))){
//        		previous=previous.previousSibling;
//        		if(previous==null){
//        			return false;
//        		}
//        	}return previous

//        }
// }
	
/*inserAfert 
将 nweobj插入到obj后面
obj 插入的位置
newobj 要插入的元素
type 类型
   true  元素节点
   false 元素节点和有意义的文本
   1、获取obj的下一兄弟元素next
   2、获取obj的父元素 parent
   3 next false
   parent.appendChild(newobj)
   4parent.insertbefore(newobj,next);
   */
   function insertAftert(newobj,obj,type){
    var next=getNext(obj,type)
    var parent=obj.parentNode;
    if(next){
      parent.insertBefore(newobj,next)
    }
    else{
      parent.appendChild(newobj);
    }
}


function insertBefore(obj,newobj){
	var parent=obj.parentNode;
	parent.insertBefore(obj,newobj)

}

 
function firstChild(obj){
	return getChilds(obj)[0]
}

function lastChild(obj){
	return getChilds(obj)[getChilds(obj).length-1]
}


function getN(obj,n,type){
	type=type==undefined?true:type;
	var childs=getChilds(obj,type);
	if(n>=childs.length||n<1){
		return false;
	}
	return childs[n-1];
}

//
function   addEvent(obj,event,fun){
	if(obj.addEvenrListener){
		obj.addEvenrListener(event,fun,false)
	}
	else{
		obj.attachEvent("on"+event,fun);
	}
}


function removeEvent(obj,event,fun){
    if(obj.addEvenrListener){
		obj.removeEvenrListener(event,fun,false)
	}
	else{
		obj.detachEvent("on"+event,fun);
	}
}


function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",sceollFun)
	}else{
		obj.addEventListener("mousewheel".scrollFun,false)
		obj.addEventListener("DOMMouseScroll".scrollFun,false)
	}


function scrollFun(e){
	var e=e||window.event
	if(e.preventDefault){
		e.preventDefault()
	}else{
		e.returnValue=false
	}
	var nub=e.whellDelta||e.detail
	if(nub==120||nub==-3){
		//改变THIS属性，让this指向obj
		up.call(obj);
	}else if(nub==-120||nub==3){
		down.call(obj)
	}

}
}



//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}
