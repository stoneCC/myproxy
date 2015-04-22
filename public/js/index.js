$(function(){
	$("#projectList button").on('click',function(e){
		var projectName = $(this).text();
		var m=this;
		var url= "/user";
		$.ajax({
		   type: "POST",
		   url: url,
		   data: {
			projectId:$(this).attr("projectId")
		   },
		   success: function(msg){
		     if("ok"== msg ){
				$("#projectList button[projectid]").removeClass("btn-success");
				$(m).addClass("btn-success");
			};
		   }
		});
	});
});
