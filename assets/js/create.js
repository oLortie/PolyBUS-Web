// Add new suspect on form submit
var newSuspectForm = document.getElementById("NewSuspectForm");
newSuspectForm.onsubmit = async (e) => {
  console.log("marche tu?");
  e.preventDefault();
  if (newSuspectForm.checkValidity() === false) {
    e.stopPropagation();
  } else {
    await submitForm("URL de l'API", newSuspectForm);
  }
};

