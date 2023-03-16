var canvas=(function(){

    var canvas = document.getElementById("myCanvas"),
          context = canvas.getContext("2d");

    function init(){
     $(document).ready(function() {
        console.info('initialized');

              //if PointerEvent is suppported by the browser:
              if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                  //alert('pointerdown at '+event.pageX+','+event.pageY);

                });
              }
              else {
                canvas.addEventListener("mousedown", function(event){
                    //alert('mousedown at '+event.clientX+','+event.clientY);

                  }
                );
              }
        });
     }
  //returns an object with 'public' functions:
  return {
    init:init
  };

})();
