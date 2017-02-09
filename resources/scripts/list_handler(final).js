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
        +document.title+"</a>><a href=''>"+oParent.innerHTML+"</a> ";
    document.getElementsByTagName('h3')[0].innerHTML=""+oParent.innerHTML;
    move(obj, {height: 0});
    if(oParent.turn) {
        oParent.turn=false;
    }
    else{
        //清空DOM元素
        if(obj.innerHTML!='')
            obj.innerHTML='';
        $.ajax({ 
            url:"file_load.action?aa="+Math.random(),
            type:'POST',
            data:{catalog_id:$(obj).siblings('a').attr("catalog_id")},
            success:function(data){
                //后台返回的数据,fileList文件json数组:obj.title,obj.url,obj.description,obj.visible
                if(data.errorCode=="0000"){
                    var fileList = data.file_list;
                    for(var z=0;z<fileList.length;z++){
                        //文件的显示与否
                        if(fileList[z].visiable==1) {
                            var Li = document.createElement('li');
                            Li.innerHTML = "<a href='file_read.action?url=" + fileList[z].url
                                + "' target='detail'>" + fileList[z].title + "</a>";
                            obj.appendChild(Li);
                        }
                    }
                    var n=obj.children.length;
                    move(obj, {height: 42*n});    //oLi.offsetHeight之后动态获取
                    oParent.turn=true;
                }
            }
        });
        for(var i=0;i<oParent.children.length;i++){
            if(oParent.children[i].children[0].catalog_id!="btn"){
                list_btn.push(oParent.children[i]);
            }
        }
    }
}

//二级目录更新地址
function updateAdd(obj){
    document.getElementsByTagName('h3')[0].innerHTML=""+obj.innerHTML;
    ad.innerHTML="当前位置><a href='#'>首页</a>><a href='#'>"+
        document.title+"</a>><a href='#'>"+
        obj.parentNode.parentNode.parentNode.children[1].innerHTML+"</a>>" +
        obj.innerHTML;
    document.getElementById('content').getElementsByTagName('iframe')[0].src=""+obj.children[0].href;
}

//侧栏菜单ajax函数
//function ajaxOperation(obj){
//    //每次ajax前将文件json数组清空
//    //ajax给后台发送侧栏的id信息,返回文件的json数组
//}
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
//    for(var i=0;i<list.length;i++){
//        var n=list[i].children.length;
//        if(i>0)
//            list[i].style.height='0';
//        else
//        //ie：第一个子菜单未设置height样式，无法动态改变——bug
//            list[i].style.height=oLi.offsetHeight*n+'px';
//    }

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

            listScroll(this,list[this.index]);
        }
    }
//    更新地址
    for(var i=0;i<list_btn.length;i++){
        list_btn[i].onclick=function(){
            updateAdd(this);
        }
    }
};