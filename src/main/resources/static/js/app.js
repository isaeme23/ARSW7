//$( document ).ready(function() {
var app = (function(api){

    var author;
    var lista;
    var bpnames = {};
    var name;



    function saveAuthor(){
         $("#name").text(author + "'s Blueprints");
    }

    function getBlueprintsAuthor(){
        author = $("#author").val();
        api.getBlueprintsByAuthor(author, blueprints);
    }

    var blueprints = function(data){
        $("#table tbody").empty();

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
                bpnames = data;
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                c.width = c.width;
                data.points.map((elemento) => {
                             ctx.lineTo(elemento.x,elemento.y);
                         });
                ctx.stroke();
                return data;
        });
    }


    let readyblueprint = (data) =>{
                        canvas(data);
                        bpnames = data;}

    let _getOffset = function (obj) {
            var offsetLeft = 0;
            var offsetTop = 0;
            do {
              if (!isNaN(obj.offsetLeft)) {
                  offsetLeft += obj.offsetLeft;
              }
              if (!isNaN(obj.offsetTop)) {
                  offsetTop += obj.offsetTop;
              }
            } while(obj = obj.offsetParent );
            return {left: offsetLeft, top: offsetTop};
        }

    function saveUpdate(){
        api.putUpdateBluePrint(bpnames);
        getBlueprintsAuthor();
        getBlueprintsAuthor();
    }

    function createBlueprint(){
        clearCanva();
        var name = prompt("Ingrese el Nuevo nombre del plano");
        bpnames = {
            author: author,
            name: name,
            points: []
        };
        getBlueprintsAuthor();
    }

    function clearCanva(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        canvas.width = canvas.width;
    }

    function deleteBlueprint(){
        getBlueprintsAuthor();
        api.deleteBlueprint(bpnames);
        clearCanva();
        bpnames = {};
        getBlueprintsAuthor();
    }




    function init(){
         $(document).ready(function() {
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
              if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                  var offset = _getOffset(canvas);
                      bpnames.points.push({x: event.pageX - offset.left,y: event.pageY - offset.top});
                      readyblueprint(bpnames);
                }
                );
              }
              else {
                canvas.addEventListener("mousedown", function(event){
                  var offset = _getOffset(canvas);
                  bpnames.points.push({x: event.pageX - offset.left,y: event.pageY - offset.top});
                  readyblueprint(bpnames);
                }
                );
              }
            });
         }

    return{
        saveAuthor:saveAuthor,
        getBlueprintsAuthor:getBlueprintsAuthor,
        getBlueprintsAuthorAndName:getBlueprintsAuthorAndName,
        init:init,
        saveUpdate:saveUpdate,
        clearCanva:clearCanva,
        createBlueprint:createBlueprint,
        deleteBlueprint:deleteBlueprint
    };
})(apiclient);

//});