  $(function(){
    $("#btn_pensamentos").click(function(){
        $("#pensamentos").show()
        $("#fotos").hide()
        $("#videos").hide()
        $("#desportivo").hide()
        $("#receita").hide()
        $(this).css("background-color", "#cccccc")
        $("#btn_videos").css("background-color", "white")
        $("#btn_fotos").css("background-color", "white")
        $("#btn_desportivo").css("background-color", "white")
        $("#btn_receita").css("background-color", "white")
        
      });
    $("#btn_fotos").click(function(){
        $("#fotos").show()
        $("#pensamentos").hide()
        $("#videos").hide()
        $("#desportivo").hide()
        $("#receita").hide()
        $(this).css("background-color", "#cccccc")
        $("#btn_videos").css("background-color", "white")
        $("#btn_desportivo").css("background-color", "white")
        $("#btn_pensamentos").css("background-color", "white")
        $("#btn_receita").css("background-color", "white")
      });
    $("#btn_videos").click(function(){
        $("#videos").show()
        $("#fotos").hide()
        $("#pensamentos").hide()
        $("#desportivo").hide()
        $("#receita").hide()
        $(this).css("background-color", "#cccccc")
        $("#btn_desportivo").css("background-color", "white")
        $("#btn_fotos").css("background-color", "white")
        $("#btn_pensamentos").css("background-color", "white")
        $("#btn_receita").css("background-color", "white")
      });
    $("#btn_desportivo").click(function(){
        $("#desportivo").show()
        $("#fotos").hide()
        $("#videos").hide()
        $("#pensamentos").hide()
        $("#receita").hide()
        $(this).css("background-color", "#cccccc")
        $("#btn_videos").css("background-color", "white")
        $("#btn_fotos").css("background-color", "white")
        $("#btn_pensamentos").css("background-color", "white")
        $("#btn_receita").css("background-color", "white")
      });
    $("#btn_receita").click(function(){
        $("#receita").show()
        $("#fotos").hide()
        $("#videos").hide()
        $("#pensamentos").hide()
        $("#desportivo").hide()
        $(this).css("background-color", "#cccccc")
        $("#btn_videos").css("background-color", "white")
        $("#btn_fotos").css("background-color", "white")
        $("#btn_pensamentos").css("background-color", "white")
        $("#btn_desportivo").css("background-color", "white")
      });
      $("#btn_password").click(function(){
        $("#password").show()
      });

      $('#btnIngr').click(function(){
        var text = $('#ingredient').val();
        if(text.length){
            $('<li style="margin-top:10px"> <input type="text" name="ingredient" placeholder="Ingrediente" class="form-control" style="width: 50%" id="ingredient"/><button class="w3-button w3-red w3-border">Eliminar</button><li/>', {html: text}).appendTo('ul.list-unstyled')
        }
    });

    $('ul').on('click','button' , function(el){
        $(this).parent().remove()
    });
    });