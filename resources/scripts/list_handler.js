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
}
//上一级菜单点击后，下级菜单展开和收缩
function listScroll(oParent,obj){
    ad.innerHTML="当前位置><a href='#'>首页</a>><a href='#'>"
        +document.title+"</a>>"+oParent.innerHTML+"";
    document.getElementsByTagName('h3')[0].innerHTML=""+oParent.innerHTML;
    move(obj, {height: 0});
            	  if(oParent.turn){
            		  oParent.turn = false;
            	  }else{
            		  var n=obj.children.length;
            		  move(obj, {height: 38*n});    //oLi.offsetHeight之后动态获取
            		  oParent.turn=true;
            	  }

        for(var i=0;i<oParent.children.length;i++){
            if(oParent.children[i].children[0].catalog_id!="btn"){
                list_btn.push(oParent.children[i]);
            }
        }
}

//二级目录更新地址



//全局变量
var oLi = null;
var ad=document.getElementById('content').getElementsByTagName('p')[0];    //当前地址
var btn=[];
var list_btn=[];
window.onload=function(){
    var menu=document.getElementById('menu');       //菜单栏
    var content=document.getElementById('content'); //右边主体
    if(menu.getElementsByClassName) {
        var list = menu.getElementsByClassName('list');   //子菜单
    }
    var list = getByClassName(menu, 'list');
    var oA=menu.getElementsByTagName('a');          //获取菜单栏的所有a标签触发点击事件


    for(var i=0;i<oA.length;i++){           //点击分组
        if(oA[i].name=="btn"){
            btn.push(oA[i]);
        }
    }
//除第一个子菜单外的其他菜单收起
    for(var i=0;i<list.length;i++){
        var n=list[i].children.length;
        if(i>0)
            list[i].style.height='0';
        else
      //  ie：第一个子菜单未设置height样式，无法动态改变——bug
            list[i].style.height=42*n+'px';
    }

    for(var j=0;j<btn.length;j++){
        //模拟开关
          btn[j].turn=false;
    }
//    菜单下拉效果
    for(var i=0;i<btn.length;i++){
        btn[i].index=i;
        btn[i].onclick=function(){
            listScroll(this,list[this.index]);
        }
    }
    btn[0].click();
//    更新地址
    for(var i=0;i<list_btn.length;i++){
        list_btn[i].onclick=function(){
            updateAdd(this);
        }
    }
};