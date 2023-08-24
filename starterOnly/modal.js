function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formDataRadios = document.querySelector(".formData--radios");
const radios = formDataRadios.querySelectorAll("input");
const emailInput = document.getElementById("email");
const regexEmail = new RegExp("^[a-z0-9._-]+@[a-z0-9-_]+\\.[a-z]{2,}$");
const regexQuantity = new RegExp("^[0-9]+$");
const checkBoxRequired = document.getElementById("checkbox1");
const checkBoxNotRequired = document.getElementById("checkbox2");
const firstnameInput = document.getElementById("first");
const lastnameInput = document.getElementById("last");
const closeModalBtn = document.querySelector('.close');
const birthDateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const form = document.querySelector("form");

// launches modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// submits modal event
function validate(){
  event.preventDefault();
  let result = {
    "firstName" : firstnameInput.value,
    "lastName" :lastnameInput.value,
    "email" :emailInput.value,
    "birthDate":birthDateInput.value,
    "quantity":quantityInput.value,
    "place":radioChecked(),
    "checkBoxRequired":checkBoxRequired.checked,
    "checkBoxNotRequired":checkBoxNotRequired.checked
  }
  if (validateFirstname() && validateLastname() && validateEmail() && validateBirthDate() && validateQuantity() && validateRadioChecked() && checkBoxRequired.checked){
    console.log(result);
    removeErrors();
    validationMsg();
    emptyInputs();
    console.log("TOUT EST VALIDE");
  } else {

    removeErrors();

    if(!validateFirstname()){
      errorFirstname();
    }
    if(!validateLastname()){
      errorLastname();
    }
    if(!validateEmail()){
      errorEmail();
    }
    if(!validateBirthDate()){
      errorBirthDate();
    }
    if(!validateQuantity()){
      errorQuantity();
    }
    if(!validateRadioChecked()){
      errorRadio();
    }
    if(!checkBoxRequired.checked){
      console.log('?');
      errorCheckbox();
    }
    console.log("INVALIDE");
  }
}

// close modal event
closeModalBtn.addEventListener("click", ()=>{
  closeModal();
});

// launches modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Verifies that a radio has been checked
function validateRadioChecked(){
  for (radio of radios){
    if(radio.checked){
      return true;
    }
  }
  return false;
}

// Verifies that a radio has been checked
function radioChecked(){
  for (radio of radios){
    if(radio.checked){
      return radio.value;
    }
  }
  return "Aucun radio sélectionné";
}

// Verifies that there is a number inside the quantity input
function validateQuantity(){
  return regexQuantity.test(quantityInput.value);
}

// closes modal form
function closeModal(){
  modalbg.style.display = "none";
  document.getElementById("validationMsg").remove();
}

// Verifies that the firstname input has something and more than 2 characters
function validateFirstname(){
  let firstname=firstnameInput.value;
  return (firstname.length>=2);
}

// Verifies that the lastname input has something and more than 2 characters
function validateLastname(){
  let lastname=lastnameInput.value;
  return (lastname.length>=2);
}

// Verifies that there is a number inside the quantity input
function validateEmail(){
  return regexEmail.test(emailInput.value);
}

// Verifies that there is a birth date
function validateBirthDate(){
  let currentDate = Date();
  let birthDate = Date(birthDateInput.calue);

  const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    ageDifference--;
  }

  return birthDateInput.value!="" && ageDiff >= 13;
}

// Removes error messages
function removeErrors(){
  let errors=document.querySelectorAll(".modalErrorMsg");
  errors.forEach(error => {
    error.remove();
  });
}

// Adds an error message under the firstname input
function errorFirstname(){
  if(document.getElementById("errorFirstname")==null){
    let errorMsg=document.createElement("p");
    errorMsg.setAttribute("id","errorFirstname");
    errorMsg.classList.add("modalErrorMsg");
    errorMsg.innerText="Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";
    firstnameInput.parentElement.appendChild(errorMsg);
  }
}

// Adds an error message under the lastname input
function errorLastname(){
  if(document.getElementById("errorLastname")==null){
    let errorMsg=document.createElement("p");
    errorMsg.setAttribute("id","errorLastname");
    errorMsg.classList.add("modalErrorMsg");
    errorMsg.innerText="Veuillez entrer 2 caractères ou plus pour le champ du Nom.";
    lastnameInput.parentElement.appendChild(errorMsg);
  }
}

// Adds an error message under the email input
function errorEmail(){
  if(document.getElementById("errorEmail")==null){
    let errorMsg=document.createElement("p");
    errorMsg.setAttribute("id","errorEmail");
    errorMsg.classList.add("modalErrorMsg");
    errorMsg.innerText="Votre adresse mail a un mauvais format.";
    emailInput.parentElement.appendChild(errorMsg);
  }
}

// Adds an error message under the birthDate input
function errorBirthDate(){
  if(document.getElementById("errorBirthDate")==null){
    let errorMsg=document.createElement("p");
    errorMsg.setAttribute("id","errorBirthDate");
    errorMsg.classList.add("modalErrorMsg");
    errorMsg.innerText="Vous devez indiquer votre date de naissance, vous devez avoir 13 ans ou plus.";
    birthDateInput.parentElement.appendChild(errorMsg);
  }
}

// Adds an error message under the quantity input
function errorQuantity(){
  if(document.getElementById("errorQuantity")==null){
    let errorMsg=document.createElement("p");
    errorMsg.setAttribute("id","errorQuantity");
    errorMsg.classList.add("modalErrorMsg");
    errorMsg.innerText="Vous devez insérer un nombre dans ce champ.";
    quantityInput.parentElement.appendChild(errorMsg);
  }
}

// Adds an error message under the quantity input
function errorRadio(){
  if(document.getElementById("errorRadio")==null){
    let errorMsg=document.createElement("p");
    errorMsg.setAttribute("id","errorRadio");
    errorMsg.classList.add("modalErrorMsg");
    errorMsg.innerText="Vous devez sélectionner une localisation.";
    formDataRadios.before(errorMsg);
  }
}

// Adds an error message under the quantity input
function errorCheckbox(){
  if(document.getElementById("errorCheckbox")==null){
    let errorMsg=document.createElement("p");
    errorMsg.setAttribute("id","errorCheckbox");
    errorMsg.classList.add("modalErrorMsg");
    errorMsg.innerText="Vous devez vérifier que vous acceptez les termes et conditions.";
    checkBoxRequired.parentElement.appendChild(errorMsg);
  }
}

// Creates a validation msg
function validationMsg(){
  let validationMsg = document.createElement("div");
  validationMsg.setAttribute("id","validationMsg");
  let msg = document.createElement("p");
  msg.innerText="Merci ! Votre réservation a été reçue.";
  validationMsg.appendChild(msg);
  form.prepend(validationMsg)
}

// empties the inputs
function emptyInputs(){
  firstnameInput.value="";
  lastnameInput.value="";
  emailInput.value="";
  birthDateInput.value="";
  quantityInput.value="";
  uncheckRadios();
}

// unchecks the checked radio
function uncheckRadios(){
  for (radio of radios){
    if(radio.checked){
      radio.checked=false;
    }
  }
}