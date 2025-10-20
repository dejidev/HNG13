const form = document.getElementById("contactForm");
const successMsg = document.getElementById("success");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const fields = ["name", "email", "subject", "message"];

    fields.forEach((field) => {
        const input = document.getElementById(field);
        const error = document.getElementById(`error-${field}`);
        error.textContent = "";

        if (!input.value.trim()) {
            error.textContent = `${field} is required.`;
            valid = false;
        } else if (field === "email" && !/\S+@\S+\.\S+/.test(input.value)) {
            error.textContent = "Please enter a valid email.";
            valid = false;
        } else if (field === "message" && input.value.length < 10) {
            error.textContent = "Message must be at least 10 characters.";
            valid = false;
        }
    });

    if (valid) {
        successMsg.hidden = false;
        form.reset();
    } else {
        successMsg.hidden = true;
    }
});
