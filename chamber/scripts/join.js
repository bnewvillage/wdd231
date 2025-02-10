document.addEventListener("DOMContentLoaded", () => {
    // selct all modal triggers
    const modalTriggers = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll("[data-close]");

    // open modal when link is clicked
    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", event => {
            event.preventDefault(); 
            const modalId = trigger.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // close modal when button is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-close");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.close();
            }
        });
    });
    

    // close modal when clicking outside of it
    document.querySelectorAll("dialog").forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});

//get data from form
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("firstName").textContent = params.get("firstName") || "N/A";
    document.getElementById("lastName").textContent = params.get("lastName") || "N/A";
    document.getElementById("email").textContent = params.get("email") || "N/A";
    document.getElementById("phoneNumber").textContent = params.get("phoneNumber") || "N/A";
    document.getElementById("businessName").textContent = params.get("businessName") || "N/A";
    document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";
});


//get timestmap
const timestamp = document.getElementById('timestamp')
const form = document.querySelector('form');
form.addEventListener(`submit`, function(event){
    event.preventDefault();
    let timeNow = new Date().toISOString().slice(0,10);
    timestamp.value = timeNow;
    this.submit();
})