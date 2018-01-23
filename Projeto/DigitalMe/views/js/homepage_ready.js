$(document).ready(function() {
    // fazer o pedido a db
    /*$.getJSON("http://localhost:3000/getfeed", function(data){
        alert("Recebi a DB: "+JSON.stringify(data))
        $.each(data, function(ind,elem){
            $("#lista").append("<li id='"+elem.id+"'>"+elem.conteudo+"</li>")
        })
    })*/
    //alert("homepage")
    
    if(1==0){
        $('#feed_id').append(
            '<li>'+
                '<div class="w3-container w3-white w3-margin w3-padding-large">'+
                    // meta dados
                    '<hr>'+
                    '<div class="w3-col l1 m3">'+
                        '<img src="'+/*meter imagem*/+'" style="width:50px; border-radius: 50%;">'+
                    '</div>'+
                    '<div class="w3-col l6 m9">'+
                        '<h4>'+/*nome*/+'<span class="w3-opacity w3-medium">'+/*fazer um parse da data e local*/+'</span></h4>'+
                    '</div>'+
                    '<div class="w3-justify">'+
                        '<p>'+/*descricao*/+'</p>'+
                        '<div class="w3-container">'+
                            '<center>'+
                            '<img src="'+/*imagem do post*/+'" align="middle" style="width:900px;" class="w3-padding-16">'+
                            '</center>'+
                        '</div>'+
                        '<p class="w3-left">'+
                            '<button class="w3-button w3-white w3-border" onclick="likeFunction(this)"><b><i class="fa fa-thumbs-up"></i> Like</b></button>'+
                            '<button type="button" class="w3-button w3-white w3-border" data-toggle="modal" data-target="#myModal"><b><i class="fa fa-commenting-o"></i> Comentar </b></button>'+
                        '</p>'+
                        '<p class="w3-right">'+
                            '<button class="w3-button w3-black" onclick="showComments('+"'demo1'"+')" id="commentButton"><b>Comentários</b> <span class="w3-tag w3-white">'/*num de comentarios*/+'</span></button>'+
                        '</p>'+
                        '<p class="w3-clear"></p>'+
                    '</div>'+
                '</div>'+
            '</li>'
        )
    }
    
    
});