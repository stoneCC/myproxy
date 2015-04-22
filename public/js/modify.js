$(function(){
    
    $("#createProjectBtn").click(function(){
        showProjectForm();
    });
    
    $("button[projectid]").click(function(){
        var projectId = $(this).attr('projectid');
       getProjectFromServer(projectId,function(data){
           showProjectForm(data);
        }); 
    });
    
    var form = $("#project form")[0];
    $(form).submit(function(){
        var projectId = form.elements.projectId.value;
        var name = form.elements.projectName.value;
        var rewrite ={}; 
        var domains = form.elements["rewrite[][domain]"] ;
        var paths = form.elements["rewrite[][path]"];
        for(var i=0;i<domains.length;i++){
            if(domains[i].value == '')break;
		
            rewrite[domains[i].value.trim()] =  paths[i].value.trim();
        }
        if(  !name )return false;
        var data = {
            projectId:projectId,
            name:name,
            rewrite:JSON.stringify(rewrite,null,'\t')
        };
        var url = '/project';
        $.ajax({
            url:url,
            type:projectId==''?"PUT":"POST",
            data:data,
            success:function(msg){
                if( msg == "ok"){
                    window.location.href =  window.location.href;
                }else{
                    alert("操作失败，请修改后再试");
                }
            }
        });
        return false;
    });

    function getProjectFromServer(projectId,callback){
        var url ="/project";
        
        $.ajax({
            type:"GET",
            url:url,
            data:{
                projectId:projectId
            },
            success:function(data){
                callback(data);     
               
            }
        });
    }
    
    function showProjectForm(opt)
    {
            var form = $("#project form")[0];
            var domains = form.elements["rewrite[][domain]"] ;
            var paths = form.elements["rewrite[][path]"];

            form.elements.projectId.value='';
            form.elements.projectName.value='';
            for(var i=0;i<domains.length;i++){
                domains[i].value='';
                paths[i].value='';
            } 
        if(opt){
            form.elements.projectId.value=opt['projectId'] || "";
            form.elements.projectName.value=opt['name']||'';
            var i=0, rew = opt.rewrite;
            for(var p in rew){
                domains[i].value =  p;
                paths[i].value = rew[p];
                i++;
            }
            for(;i<10;i++){
                domains[i].parentNode.parentNode.style.display="none";
            } 
        }
        
        $("#project").show();
    }    

});
