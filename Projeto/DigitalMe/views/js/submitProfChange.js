// submitProfChange.js

$('#changeprofdata').on('submit', function(e) { //use on if jQuery 1.7+
    e.preventDefault();  //prevent form from submitting
    var data = $("#changeProfData :input").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    console.log("print "+data[2].value)
});
