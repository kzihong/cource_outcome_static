var status = 0; //状态切换
		function load(){//加载图片
			$.ajax({
				url:'file_photo.action?aa='+Math.random(),
				type:'POST',
				success:function(data){
					if(data.errorCode=="0000"){
						var path = data.path;
						$("#path").val(path);
						$("#photo_list").empty();//清空列表
						var id = 0;
						exit();
						$.each(data.photo_list,function(i,item){
							$("<div class='photo' file="+item+" onClick='change(this)'>"+
				   			"<img class='img' src="+path+"/"+item+"></img>"+
				   			"<input type='hidden' class='id' value='"+id+"'/>"+
				   			"<div class='item-ft'><input type='checkbox' id='"+id+"' class='check' style='display:none;'/><span>"+
				   			item+"</span></div></div>").appendTo($("#photo_list"));
							id++;
						});
					};
				},
				error:function(data){
					alert("wrong");
				}
			});
		}
		function change(e){ //样式切换
			var id = $(e).children('.id').val();
			if(status == 1){//编辑模式
				var checkbox = $("#"+id);
				checkbox.prop("checked",'true');
				if(checkbox.attr("checked")){
					checkbox.removeAttr("checked");
				}else{
					checkbox.attr("checked","true");
				}
				if($(e).hasClass("decoration")){
					$(e).removeClass("decoration");
				}else{
					$(e).addClass("decoration");
				}
			}else{
				$(e).addClass("decoration");
				$(e).siblings().removeClass("decoration");
			}
		};
		function certain(){ //确认图片
			var $certain = $(".decoration").first();
			if(!(typeof($certain.html())=="undefined")){
				var urlObj = window.opener.document.getElementById($("#urlId").val());
				urlObj.value = "/course/"+$certain.children("img").attr("src");
				//urlObj.onchange();//触发url文本框的onchange事件
				 var  evt  =   window.opener.document.createEvent('HTMLEvents');  
		         evt.initEvent('change',true,true);  
		         urlObj.dispatchEvent(   evt   );  
		         window.close();
			}
		}
		function edit(){ //编辑图片
			status = 1;
			$("#photo_list").children(".photo").removeClass("decoration");
			$("#certain").hide();
			$("#edit").hide();
			$("#del").show(100);
			$("#exit").show(100);
			$("input[type='checkbox']").show(100);
		}
		function exit(){//退出编辑
			status = 0;
			$("#photo_list").children(".photo").removeClass("decoration");
			$("input[type='checkbox']").removeAttr("checked");
			$("#del").hide();
			$("#exit").hide();
			$("input[type='checkbox']").hide();
			$("#certain").show(100);
			$("#edit").show(100);
		}
		function del(){ //删除图片
			var $del_photo = $(".decoration");
			var photos = "";
			$del_photo.each(function(){
				photos+=","+$(this).attr("file");
			});
			$.ajax({
				url:'file_delete_html.action?aa='+Math.random(),
				data:{delete_files:photos},
				success:function(data){
					if(data.errorCode="0000"){
						alert("删除文件成功");
						load();
					}else{
						alert("删除文件失败");
					}
				}
			});
		}