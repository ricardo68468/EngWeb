
console.log("script");


$(document).ready(function() {
    $("#passwordreg2").keyup(validate);
    $('#regform').on('submit', function(e) { //use on if jQuery 1.7+
        
        var data = $("#regform :input").serializeArray();
        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
        console.log("print "+data[2].value)

        // if password don't match
        if(data[2].value != data[3].value){
            e.preventDefault();  //prevent form from submitting
            alert("Password don't match!!!");
        }
    });
});

function validate() {
    var password1 = $("#passwordreg1").val();
    var password2 = $("#passwordreg2").val();
    console.log("password1 "+password1)
    console.log("password2 "+password2)
   
    if(password1 == password2) {
        $("#validate-status").text("");        
    }
    else {
        
        $("#validate-status").text("* - Password don't match");  
    }
}

