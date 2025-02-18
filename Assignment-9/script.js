document.addEventListener("DOMContentLoaded", function () {
    const bookButtons = document.querySelectorAll(".book-btn");
    const formPopup = document.getElementById("form-popup");
    const closeForm = document.querySelector(".close");
    const form = document.getElementById("appointment-form");
    const appointmentList = document.getElementById("appointments");
    const confirmationPopup = document.getElementById("confirmation-popup");
    const confirmationMessage = document.getElementById("confirmation-message");
    const closePopup = document.getElementById("close-popup");

    let selectedService = "";

    bookButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectedService = this.getAttribute("data-service");
            document.getElementById("service").value = selectedService;
            formPopup.style.display = "flex";
        });
    });

    closeForm.addEventListener("click", () => {
        formPopup.style.display = "none";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let datetime = document.getElementById("datetime").value;
        let terms = document.getElementById("terms").checked;

        if (!name || !email.includes("@") || phone.length !== 10 || !datetime || !terms) {
            alert("Please fill all fields correctly.");
            return;
        }

        let appointment = {
            name,
            email,
            phone,
            service: selectedService,
            datetime,
            status: "Pending"
        };

        saveAppointment(appointment);
        formPopup.style.display = "none";

        confirmationMessage.textContent = `Thank you, ${name}! Your appointment for ${selectedService} on ${datetime} is confirmed.`;
        confirmationPopup.style.display = "flex";
    });

    closePopup.addEventListener("click", () => {
        confirmationPopup.style.display = "none";
    });

    function saveAppointment(appointment) {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        displayAppointments();
    }

    function displayAppointments() {
        appointmentList.innerHTML = "";
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.forEach(app => {
            let row = `<tr><td>${app.name}</td><td>${app.service}</td><td>${app.datetime}</td><td>${app.status}</td></tr>`;
            appointmentList.innerHTML += row;
        });
    }

    displayAppointments();
});