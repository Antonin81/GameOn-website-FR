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
const modalBody = document.querySelector(".modal-body");

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
    closeButton();
    eraseInputs();
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

// creates a button able to close the modal after validation
function closeButton(){
  let closeButton = document.createElement("button");
  closeButton.setAttribute("class","btn-submit closeBtn");
  closeButton.setAttribute("onClick","closeModal()");
  closeButton.innerText="Fermer";
  modalBody.append(closeButton);
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
  let currentDate = new Date();
  let birthDate = new Date(birthDateInput.value);

  let ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    console.log(ageDifference)
    ageDifference--;
  }

  return birthDateInput.value!="" && ageDifference >= 13;
}

// Removes error messages
function removeErrors(){
  let errors=document.querySelectorAll("[data-error-visible=true]");
  errors.forEach(error => {
    error.setAttribute("data-error-visible","false");
  });
}

// Adds an error message under the firstname input
function errorFirstname(){
  if(firstnameInput.parentNode.getAttribute("data-error-visible")!=true){
    firstnameInput.parentNode.setAttribute("data-error-visible",true);
    firstnameInput.parentNode.setAttribute("data-error","Veuillez entrer 2 caractères ou plus pour le champ du Prénom.");
  }
}

// Adds an error message under the lastname input
function errorLastname(){
  if(lastnameInput.parentNode.getAttribute("data-error-visible")!=true){
    lastnameInput.parentNode.setAttribute("data-error-visible",true);
    lastnameInput.parentNode.setAttribute("data-error","Veuillez entrer 2 caractères ou plus pour le champ du Nom.");
  }
}

// Adds an error message under the email input
function errorEmail(){
  if(emailInput.parentNode.getAttribute("data-error-visible")!=true){
    emailInput.parentNode.setAttribute("data-error-visible",true);
    emailInput.parentNode.setAttribute("data-error","Votre adresse mail a un mauvais format.");
  }
}

// Adds an error message under the birthDate input
function errorBirthDate(){
  if(birthDateInput.parentNode.getAttribute("data-error-visible")!=true){
    birthDateInput.parentNode.setAttribute("data-error-visible",true);
    birthDateInput.parentNode.setAttribute("data-error","Vous devez indiquer votre date de naissance, vous devez avoir 13 ans ou plus.");
  }
}

// Adds an error message under the quantity input
function errorQuantity(){
  if(quantityInput.parentNode.getAttribute("data-error-visible")!=true){
    quantityInput.parentNode.setAttribute("data-error-visible",true);
    quantityInput.parentNode.setAttribute("data-error","Vous devez insérer un nombre dans ce champ.");
  }
}

// Adds an error message under the quantity input
function errorRadio(){
  if(formDataRadios.getAttribute("data-error-visible")!=true){
    formDataRadios.setAttribute("data-error-visible",true);
    formDataRadios.setAttribute("data-error","Vous devez sélectionner une localisation.");
  }
}

// Adds an error message under the quantity input
function errorCheckbox(){
  if(checkBoxRequired.parentNode.getAttribute("data-error-visible")!=true){
    checkBoxRequired.parentNode.setAttribute("data-error-visible",true);
    checkBoxRequired.parentNode.setAttribute("data-error","Vous devez vérifier que vous acceptez les termes et conditions.");
  }
}

// Creates a validation msg
function validationMsg(){
  let validationMsg = document.createElement("div");
  validationMsg.setAttribute("id","validationMsg");
  let msg = document.createElement("p");
  msg.innerText="Merci pour votre inscription";
  validationMsg.appendChild(msg);
  modalBody.append(validationMsg)
}

// erases the inputs
function eraseInputs(){
  form.style.display="none";
}