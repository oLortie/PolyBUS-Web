function validate()
{
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;

    if(username == "admin" && password == "user"){
        console.log("Allo");
        window.location.replace = "../graph/index.html";
       return false;
        
    }

    else{
        alert("login failed");
    }
}