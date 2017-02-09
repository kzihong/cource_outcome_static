/**
 * Created by zifeng on 2015/10/3.
 */

//兼容ie8-
function getByClassName(oParent,oClass){
    var result=[];
    var element=oParent.getElementsByTagName('*');
    for(var i=0;i<element.length;i++){
        if(element[i].className==oClass){
            result.push(element[i]);
        }
    }
    return result;
};

window.onload=function(){
    var menu=document.getElementById('menu');       //菜单栏
    var content=document.getElementById('content'); //右边主体
    if(menu.getElementsByClassName) {
        var list = menu.getElementsByClassName('list');   //子菜单
    }
    var list = getByClassName(menu, 'list');
    var oLi=list[0].getElementsByTagName('li')[0];
    var oA=menu.getElementsByTagName('a');          //获取菜单栏的所有a标签触发点击事件
    var ad=content.getElementsByTagName('p')[0];    //当前地址
    var btn=[];
    var list_btn=[];

    for(var i=0;i<oA.length;i++){           //点击分组
        if(oA[i].name=="btn"){
            btn.push(oA[i]);
        }else {
            list_btn.push(oA[i]);
        }
    }

//除第一个子菜单外的其他菜单收起
    for(var i=1;i<list.length;i++){
        list[i].style.height='0';
    }

    for(var j=0;j<btn.length;j++){
        //模拟开关
        if(j==0)
            btn[j].turn=true;
        else
            btn[j].turn=false;
    }

//    菜单下拉效果
    for(var i=0;i<btn.length;i++){
        btn[i].index=i;

        btn[i].onclick=function(){
            var n=list[this.index].children.length;
            ad.innerHTML="当前位置><a href='#'>首页</a>><a href='#'>"
                +document.title+"</a>><a href=''>"+this.innerHTML+"</a> ";
            if(this.turn) {
                //alert(this.turn);
                move(list[this.index], {height: 0});
                this.turn=false;
            }
            else{
               //alert(this.turn);
			   alert(oLi.offsetHeight);
                move(list[this.index], {height: oLi.offsetHeight*n});
                this.turn=true;
            }
        }
    }

//    更新地址
    for(var i=0;i<list_btn.length;i++){
        list_btn[i].onclick=function(){
            ad.innerHTML="当前位置><a href='#'>首页</a>><a href='#'>"+
                document.title+"</a>><a href='#'>"+
                this.parentNode.parentNode.parentNode.children[1].innerHTML+"</a>>" +
                this.innerHTML;
        }
    }
};