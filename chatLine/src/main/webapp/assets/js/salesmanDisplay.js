

function showAllSalesmen(data){
	var content = "<thead><tr><th>ID</th><th>昵称</th><th>手机</th><th>操作</th></tr></thead><tbody>";
	for(var i = 0;i < data.length;i++){
		var str = "<td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].phone+"</td>";
		str += "<td> <div class='btn-group'>"
		str += "<button type='button' class='btn btn-default' onclick='showChangeSalesmanNameDialog("+data[i].id+")' >修改昵称</button>";
		str += "<button type='button' class='btn btn-default' onclick='showChangeSalesmanPasswordDialog("+data[i].id+")' >重置密码</button>";
		str += "<button type='button' class='btn btn-default' onclick='deleteSalesman("+data[i].id+")' >删除</button>";
		str += "</td></div>"
		content = content +"<tr>"+ str + "</tr>";
	}
	content += "</tbody>";
	$("#showAllSalesmen").html(content);
}




function loadAllSalesmen(){
	$.ajax({url:"findAll",success:function(data){showAllSalesmen(data);},error:function(){alert("无法获取客服列表");}});
}





function refresh(){
	loadAllSalesmen();
}
function changeSalesmanName(id){
	var name = $("#myModal-name").val();
	if(name.length==0){
		alert("昵称不能为空");
	}else{
		$.ajax({
			type:"post",
			url:"update",
			data:{
				"id":id,
				"name":name
			},
			success:function(data){
				data = arguments[2].responseText;
				if(data=="success"){
					alert("修改成功");
					$("#myModal").modal("hide");
					refresh();
				}else if(data=="duplicateName"){
					alert("昵称重复");
				}
				refresh();
			},
			error:function(){alert("修改昵称失败");}
		});
	}
}

function showChangeSalesmanNameDialog(id){
	$("#myModal-body").html("<label>新昵称</label><input type='text' class='form-control' " + 
			"id='myModal-name'/><input id='myModal-id' hidden value='"+id+"'></input>");
	$("#myModal-comfirm-button").attr("onclick",
			"changeSalesmanName("+id+")");
	$("#myModal-title").html("修改昵称");
	$("#myModal").modal("show");
}
function changeSalesmanPassword(id){
	var psw = $("#myModal-password").val();
	if(psw.length==0){
		alert("密码不能为空");
	}else{
		var password = psw;
		$.ajax({
			type:"post",
			url:"update",
			data:{
				"id":id,
				"password":password
			},
			success:function(){
				var data = arguments[2].responseText;
				if(data=="success"){
					alert("修改成功");
					$("#myModal").modal("hide");
				}
				refresh();
			},
			error:function(){alert("修改密码失败");}
		});
	}
}
function showChangeSalesmanPasswordDialog(id){
	$("#myModal-body").html("<label>新密码</label><input type='password'"
			+ " class='form-control' id='myModal-password'/><input id='myModal-id' hidden value='"+id+"'></input>");
	$("#myModal-comfirm-button").attr("onclick",
			"changeSalesmanPassword("+id+")");
	
	$("#myModal-title").html("修改密码");
	$("#myModal").modal("show");
}
function deleteSalesman(id){
	alert("操作正在进行,请稍后...");
	$.ajax({
		type:"post",
		url:"delete",
		data:{
			"id":id,
		},
		success:function(){
			var data = arguments[2].responseText;
			if(data=="success"){
				alert("删除成功");
			}
			refresh();
		},
		error:function(){alert("删除失败");}
	});
}
function addNewSalesman(){
	alert("操作正在进行,请稍后...");
	var name = $("#newname").val();
	var password = $("#newpassword").val();
	var phone = $("#newphone").val();
	if(password.length == 0 || name.length==0){
		alert("属性不能为空");
	}else{
		$.ajax({
			type:"post",
			url:"add",
			data:{
				"name":name,
				"password":password,
				"phone":phone
			},
			success:function(){
				var data = arguments[2].responseText;
				if(data=="success"){
					alert("添加成功");
					refresh();
				}else if(data=="duplicateName"){
					alert("昵称重复");
				}
			},
			error:function(){alert("添加失败");}
		});
	}
}

function salesmanLogin(){
	var psw =$("#salesmanPassword").val(); 
	var name = $("#salesmanName").val();
	if(name.length==0||psw.length==0){
		alert("输入不能为空！");
	}else{
	$.ajax({
		type:"post",
		url:"authenticate",
		data:{
			"name":name,
			"password":psw
		},
		success:function(data){
			data = arguments[2].responseText;
			if(data=="true"){
				alert("登录成功");
				window.location.href="../../chats/"
			}
			else {
				alert("用户名或密码错误");
			}
			
		},
		error:function(){alert("登录失败");}
		});
	}
}