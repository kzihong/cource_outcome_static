//分页组件
	function getFileList(pageOffset,pageSize){
		$.ajax({
			url:'file_pagerList.action?aa='+new Date(),
			type:'POST',
			dataType:'json',
			data:{'pageOffset':pageOffset,'pageSize':pageSize,'catalog_id':$("#catalog_id").val()},
			success:function(data){
				if(data.errorCode=="0000"){
					var pager = data.pager_list;
					var currentPage = pager.currentPage;
					var totalPages = pager.totalPages;
					var begin=pager.beginPageIndex;
					var end=pager.endPageIndex;
					$(".indexPage").html("");
					if(end!=0){
						for(var i =begin;i<=end;i++){
							if(i==currentPage){
								$(".indexPage").append("<a id='currentPage'>"+i+"</a>");
							}else{
								$(".indexPage").append("<a href='javascript:void(0)' onClick='turnPage("+i+")'>"+i+"</a>");
							}
						}
					}else{
						$(".indexPage").append("<a id='currentPage'>1</a>");
					}
					$("#top").attr("onClick","turnPage(1)");
					$("#bottom").attr("onClick","turnPage("+totalPages+")");
					$("#file_list tbody").empty();
					var count = 0;
					$.each(pager.datas,function(i,item){
						var visiable="";
						visiable = item.visiable==1?"是":"否";
						$("<tr onClick='loadFile(this)'>"+
							"<td class='title'>"+item.title+"</td>"+
							"<td>"+item.type+"</td>"+
							"<td>"+item.uploadDate+"</td>"+
							"<td>"+item.description+"</td>"+
							"<td class='visiable' status="+item.visiable+">"+visiable+"</td>"+
							"<input type='hidden' class='url' value="+item.url+" />"+
							"<input type='hidden' class='id' value="+item.id+" />"+
						  "</tr>").appendTo($("#file_list tbody"));
						count = count +1;
					});
					//默认加载第一个文件项目
					$("#file_list tbody").find("tr:eq(0)").click();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				 alert(XMLHttpRequest.status);
				 alert(XMLHttpRequest.readyState);
				 alert(textStatus);
			}
		});
	};
	//换页事件
	function turnPage(pageOffset){
		var pageSize = 11;
		getFileList(pageOffset,pageSize);
	}