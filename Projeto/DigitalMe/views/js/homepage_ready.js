$(document).ready(function() {
    
    $("#newPasswordCheck").keyup(validate);
    $("#newPassword").keyup(validate);    
    
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
