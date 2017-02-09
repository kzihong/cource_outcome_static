function page(json) {
	if(!json.id){return ;}
	var obj=document.getElementById(json.id);
	var now=json.now||1;
	var Max=json.Max||5;
	var width = 5;//默认显示页码数目为5
	var head = 0; //头页码
	var tail = 0;//尾页码
	if(width>Max){
		head = 1;
		tail = Max;
	}else{
		if(now<parseInt(width/2)){
			head = 1;
			tail = width;
		}else{
			head=now-(parseInt(width/2)-1);
			tail = head+width-1;
		}
		if(tail>Max){
			tail=Max;
			head = tail-(width-1);
		}
	}
	var fn=json.fn;
	fn(head,tail,now);
	var a=obj.getElementsByTagName("a");
	for(var i=0;i<a.length;i++){
		a[i].onclick=function() {
			var pageOffset = parseInt($("#current").html());
			if(this.innerHTML=="上一页"){
				pageOffset--;
			}else if(this.innerHTML=="下一页"){
				pageOffset++;
			}else{
			   pageOffset = parseInt(this.getAttribute("page"));
			}
			  quesList(pageOffset,8);
		};
	}

}