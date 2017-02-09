//编辑框加载事件
	function setEditorContents(url){ //加载html编辑框
		$.ajax({
			url:'file_read.action?aa='+Math.random(),
			data:{url:url},
			success:function(data){
				CKEDITOR.instances.html_textarea.setData(data);
			}
		});
	}
	function alterHtml(){
			$.ajax({
				url:'file_alter.action?aa='+Math.random(),
				type:'POST',
				data:{id:$("#file_id").val(),content:CKEDITOR.instances.html_textarea.getData()},
				success:function(data){
					if(data.errorCode=="0000"){
						alert("修改成功");
					}
				}
			});
	}
	function setImageContent(url){//加载image编辑框
		$("#image-frame").empty();//先清空
		$("<img id='pic' src='file_read.action?url="+url+"'style='display:none;margin-top:100px;'></img>").appendTo($("#image-frame"));
		var width = $("#pic").width();
		var height = $("#pic").height();
		var scale = width/height;//获得图片比例
		height = 180;
		width = height*scale;
		$("#pic").width(width);
		$("#pic").height(height);
		$("#pic").show();
	}
	function setPdfContent(url){//加载pdf编辑框
		var Sys={};//判断浏览器类型
		var ua = navigator.userAgent.toLowerCase();
		var s;
		if((s=ua.match(/msie ([\d.]+)/))){
			Sys.ie = s[1];
		}
		if(Sys.ie){
			document.getElementById("pdf-frame").contentWindow.document
				.getElementsByTagName("body")[0]
			.innerHTML="<embed width='100%' height='100%' type='application/pdf' src='file_read.action?isDownload=false&url="+url+"'></embed>";
		}else{
			$("#pdf-frame").attr("src","file_read.action?isDownload=false&url="+url);
		}
	}
	function setVideoContent(url){//加载video浏览框
		$("<video id='my_video' class='video-js vjs-defalut-skin' controls preload='none'  width='543' height='461'></video>").appendTo($("#video-frame"));
		var type = "";
		if(url.indexOf(".wmv")>0){
			type = "x-ms-wmv";
		}else{
			type = url.substring(url.indexOf(".")+1,url.length-1);
		}
		$("#my_video").append("<source src='file_read.action?url="+url+"&aa="+Math.random()+"' type='video/"+type+"'></source>");
		player = videojs('#my_video',{
			teachOrder:["html5","flash"],
			children:{
				bigPlayButton:true,
				textTrackDisplay:false,
				posterImage:false,
				errorDisplay:false,
				controlBar:{
					captionsButton:false,
					chaptersButton:false,
					subtitlesButton:false,
					playbackRateMenuButton:false,
					liveDisplay:false,
				}
			}
		});
	}