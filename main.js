(function(window, document, $, undefined){


  $(function(){

    loadCircle();

  });

  function loadCircle()
  {
    var canvas = document.getElementById("circleCanvas");
    var outerCanvas = $('#outerCanvas');
    var ctx = canvas.getContext("2d");
    var r = 0;
    var isDown;
    var cx = outerCanvas.width();

    var background = new Image();
    background.src = "./img/circle-bg.svg";
    var innerCircle = new Image();
    innerCircle.src = "./img/circle-bee.svg";


    //Set Canvas Size from Outer Box
    outerCanvas.height(cx+50);
    canvas.width = cx;
    canvas.height = cx;

    $(window).resize(function()
    {
      console.log('Canvas Box resized!');
      cx = outerCanvas.width();
      canvas.width = cx;
      canvas.height = cx;
      redrawImage();
    });

    background.onload = function(){ redrawImage(); }

    function redrawImage () {
      ctx.clearRect(0, 0, cx, cx);
      ctx.drawImage(background, 0, 0, cx, cx);
      ctx.save();
      ctx.translate(cx/2, cx/2);
      ctx.rotate(r);
      ctx.drawImage(innerCircle, -cx/2, -cx/2, cx, cx);
      ctx.restore();
    }

    function handleMouseDown(e) {
      isDown = setInterval(spinImage, 100 /*execute every 100ms*/);
    }

    function handleMouseUp(e) {
      if(isDown)
      {
        clearInterval(isDown);
      }
    }

    function spinImage()
    {
      r = r + (1.5*Math.PI/180);
      redrawImage();
    }

    $("#circleCanvas").mousedown(handleMouseDown);
    $("#circleCanvas").mouseup(handleMouseUp);

    $("#btnCircleBee").on("click", function(){
      innerCircle.src = "./img/circle-bee.svg";
      r = 0;
      innerCircle.onload = function(){ redrawImage(); }
    });
    $("#btnCircleVarroa").on("click", function(){
      innerCircle.src = "./img/circle-varroa.svg";
      r = 0;
      innerCircle.onload = function(){ redrawImage(); }
    });


  }

})(window, document, window.jQuery);
