// Toggle between hiding and showing blog replies/comments

// when comment button is pressed
document.getElementById("myBtn").click();
function myFunction(id) {
    var x = document.getElementById(id);
    alert("x:"+x)
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

// when like button is pressed
function likeFunction(x) {
    x.style.fontWeight = "bold";
    x.innerHTML = "✓ Liked";
    // por o botao do like a dar 
}
