const form = document.getElementById("myForm");

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("textarea").value;

  //   const formData = new FormData(form);

  const dataToSave = {
    name,
    email,
    message,
  };

  localStorage.setItem("formData", JSON.stringify(dataToSave));

  // Clear the form or show a success message
  form.reset();
  alert("Form data saved to localStorage!");
}

form.addEventListener("submit", handleFormSubmit);
