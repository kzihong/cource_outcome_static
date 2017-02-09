function pic_row(){
    var oUlTeam=document.getElementById('team');
    var imgWidth=290;
    var timer=setInterval(function(){
        oUlTeam.style.left=parseInt(getStyle(oUlTeam,"left"))-1+"px";
        if(parseInt(oUlTeam.style.left)==-290){
            oUlTeam.appendChild(oUlTeam.children[0]);
            oUlTeam.style.left=0;
        }
    },25);
    
};

function getStyle(obj,name)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
    }
    else
    {
        return getComputedStyle(obj,false)[name];
    }
}