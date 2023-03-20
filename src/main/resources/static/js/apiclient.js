//@author hcadavid

apiclient=(function(){



	return {
		getBlueprintsByAuthor:function(authname,callback){
		    //console.log($.get(`/blueprints/${authname}`).responseTEXT);
			$.get(`http://localhost:8080/blueprints/${authname}`, function(data) {callback(data)});
		},
		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}/${bpname}`, function(data) {callback(data)});
		},
		putUpdateBluePrint:function(blueprint){
		   return $.ajax({
               url: `http://localhost:8080/blueprints/${blueprint.author}/${blueprint.name}`,
               type: 'PUT',
               data: JSON.stringify(blueprint),
               contentType: "application/json"
           });
		}
	}

})();
