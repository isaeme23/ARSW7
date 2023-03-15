var app = (function(api){

    var author;
    var lista;
    var bpname;

    function saveAuthor(){
         $("#name").text(author + "'s Blueprints");
    }

    function getBlueprintsAuthor(){
        author = $("#author").val();
        api.getBlueprintsByAuthor(author, blueprints);
    }

    var blueprints = function(data){
        $("#table tbody").empty();
     if (data === undefined) {
         alert("No existe el autor");
         $("#name").empty();
         $("#points").text("Total Points");
         $("#nameblu").empty();
     } else {
        saveAuthor();
         const datanew = data.map((elemento) => {
             return {
                 name: elemento.name,
                 puntos: elemento.points.length
             }
         });

         datanew.map((elementos) => {
             $("#table > tbody:last").append($("<tr><td>" + elementos.name + "</td><td>" + elementos.puntos.toString() +
                 "</td><td>" + "<button  id=" + elementos.name + " onclick=app.getBlueprintsAuthorAndName('"+ author + "','" +  elementos.name +"')>open</button>" + "</td>"));
         });
         total(datanew);
        }
    }

    let total = function(data){
        let aux = 0;
        let totalPoints = data.reduce((accumulator, x) => accumulator + x.puntos, aux);
        $("#points").html(`Total user points: ${totalPoints}`);
    }

    function getBlueprintsAuthorAndName(author, bpname){
        api.getBlueprintsByNameAndAuthor(author, bpname, canvas);
    }

    var canvas = function(data){
        $(document).ready(function() {
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                c.width = c.width;
                console.log(data);
                data.points.map((elemento) => {
                             ctx.lineTo(elemento.x,elemento.y);
                         });
                ctx.stroke();
        });
    }

    return{
        saveAuthor:saveAuthor,
        getBlueprintsAuthor:getBlueprintsAuthor,
        getBlueprintsAuthorAndName:getBlueprintsAuthorAndName
    }
})(apiclient);