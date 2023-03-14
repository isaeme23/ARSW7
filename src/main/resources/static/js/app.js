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
         const total = datanew.reduce((suma, {puntos}) => suma + puntos, 0);

         $("#points").text("Total user points: " + total);
        }
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