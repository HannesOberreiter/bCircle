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
    var flag = false;
    var cx = outerCanvas.width();

    var background = new Image();
    background.src = "./img/circle-bg.png";
    background.width = cx;
    background.height = cx;

    var innerCircle = new Image();
    innerCircle.src = "./img/circle-bee.png";
    innerCircle.width = cx;
    innerCircle.height = cx;


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
      redrawBG();
    });

    background.onload = function(){ redrawBG(); }

    function redrawBG ()
    {
      ctx.clearRect(0, 0, cx, cx);
      ctx.drawImage(background, 0, 0, cx, cx);
      ctx.save();
      ctx.translate(cx/2, cx/2);
      ctx.rotate(r);
      ctx.drawImage(innerCircle, -cx/2, -cx/2, cx, cx);
      ctx.restore();
    }

    function handleMouseDown(e) {
      handleMouseUp(); //to clear it if any intervall is open
      isDown = setInterval(spinImage, 100 /*execute every 100ms*/);
      flag = true;
    }

    function handleMouseUp(e) {
      if(isDown)
      {
        clearInterval(isDown);
        flag = false;
      }
    }

    function spinImage()
    {
      r = r + (1.47*Math.PI/180);
      redrawBG();
    }

    $("#circleCanvas").mousedown(handleMouseDown);
    $("#circleCanvas").mouseup(handleMouseUp);
    $('#circleCanvas').on("touchstart", handleMouseDown);
    $('#circleCanvas').on("touchend", handleMouseUp);

    $("#btnCircleSpin").on('click', function(){
      if(!flag)
      {
        clearInterval(isDown);
        isDown = setInterval(spinImage, 100 /*execute every 100ms*/);
        flag = true;
        $(this).text('Stop Spin');
      } else {
        clearInterval(isDown);
        flag = false;
        $(this).text('Spin circle');
      }
    });



    $("#btnCircleBee").on("click", function(){
      innerCircle.src = "./img/circle-bee.png";
      r = 0;
      innerCircle.onload = function(){ redrawBG(); }
    });
    $("#btnCircleVarroa").on("click", function(){
      innerCircle.src = "./img/circle-varroa.png";
      r = 0;
      innerCircle.onload = function(){ redrawBG(); }
    });


  }

})(window, document, window.jQuery);
