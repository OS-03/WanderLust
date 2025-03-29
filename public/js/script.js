// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  let taxSwitch2 = document.getElementById("flexSwitchCheckDefault2");
  let taxSwitch = document.getElementById("flexSwitchCheckDefault1");
  let cardItem1 = document.getElementById("card-element1");
  let cardItem2 = document.getElementById("card-element2");
  
  cardItem1.addEventListener("click", () => {
    taxSwitch.checked = !taxSwitch.checked;
  });
  
  cardItem2.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    let displayState = taxSwitch2.checked ? "none" : "inline";
  
    for (let info of taxInfo) {
      info.style.display = displayState;
    }
  
    taxSwitch2.checked = !taxSwitch2.checked;
  });