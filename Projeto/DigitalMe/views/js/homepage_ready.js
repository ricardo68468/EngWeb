$(document).ready(function() {
    //alert("homepage")
    /*$('#changeprofdata').on('submit', function(e) { //use on if jQuery 1.7+
        alert("submit")
        e.preventDefault();  //prevent form from submitting
        var data = $("#changeProfData :input").serializeArray();
        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
        console.log("print "+data[2].value)
    });*/
    $('#newProfPic').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        console.log("tmppath!!!!!!!!!!!!!!!!!!!!!!: "+tmppath)   
        $("#fotoUser").fadeIn("fast").attr('src',tmppath);  
          
    });
    $("#newPasswordCheck").keyup(validate);
<<<<<<< HEAD
    $("#newPassword").keyup(validate);    

    $("#filterAll").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"All"},
        });  
    });

    $("#filterPics").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"Pics"},
        });  
    });

    $('#filterThoughts').click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"Thoughts"},
        });  
    })

    $("#filterSports").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"Sports"},
        });  
    });

    $("#filterVideos").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"Videos"},
        });  
    });

    $("#filterRecipes").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"Recipes"},
        });  
    });

    $("#filterEvents").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"Events"},
        });  
    });

    $("#MyPostsAll").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"MyAll"},
        });  
    });
    $("#MyPostsPublic").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"MyPub"},
        });  
    });
    $("#MyPostsPrivate").click(function(){
        $.ajax({
            url: 'homepage/filter',
            type: 'POST',
            data: {'type':"MyPriv"},
        });  
    });
=======
    $("#newPassword").keyup(validate);
    
>>>>>>> 1eb6da3d14d7df46b553f1f1c402322153836efc
});
function validate() {
    var password1 = $("#newPassword").val();
    var password2 = $("#newPasswordCheck").val();
    console.log("password1 "+password1)
    console.log("password2 "+password2)
   
    if(password1 == password2) {
        $("#validate-status").text("")
        $("#submitchangeprof").attr("disabled", false)      
    }
    else {
        
        $("#validate-status").text("* - Password don't match"); 
        $("#submitchangeprof").attr("disabled", true)
         
    }
}
