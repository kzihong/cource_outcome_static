//CKEditor插件扩展
	var my_browser = '/course/resources/ckeditor/photo.jsp';//自定义图片浏览窗口
	function addBrowserButton(editor){
		CKEDITOR.on('dialogDefinition',function(ev){
			var dialogName = ev.data.name;
			var dialogDefinition = ev.data.definition;
			if(dialogName == 'image'){
				var infoTab = dialogDefinition.getContents('info');
				infoTab.add({
					type:'button',
					id:'image_browser',
					align:'center',
					style:'margin-top:15px',
					label:'浏览服务器',
					onClick:function(evt){
						var thisDialog = this.getDialog();
						var txtUrlObj = thisDialog.getContentElement('info','txtUrl');
						var txtUrlId = txtUrlObj.getInputElement().$.id;
						addImage(txtUrlId);
					}
				},'browse');//覆盖原来的浏览按钮的位置 
			}
		});
	}
	function addImage(theURLElementId){
		var browserUrl = my_browser;
		window.open(browserUrl+'?urlId='+theURLElementId,"图片管理","top=100,left=200,height=400,width=800,status=yes,tollbar=no,menubar=no");
		//var urlObj = document.getElementById(theURLElementId);
		//urlObj.value = imgUrl;
		//urlObj.fireEvent("onchange"); //触发url文本框的onchange事件
	}