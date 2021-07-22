// Add new suspect on form submit
var newSuspectForm = document.getElementById("NewSuspectForm");

newSuspectForm.onsubmit = async(e) => {
  e.preventDefault();
  var form = new FormData(newSuspectForm);
  await console.log(JSON.stringify(form));
  //fetch("https://localhost:44318/api/PolyBUSAPI/CreateSuspect/",{ method: 'POST', mode:'cors', body: form})
};

