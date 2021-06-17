function handleEnter(e) {
    if(e.keyCode === 13){
        validate();
    }
  }

function validate()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "admin" && password == "user"){
        console.log("Allo");
        window.location.replace("../graph/index.html");
    }
    else{
        alert("Login failed");
    }
}