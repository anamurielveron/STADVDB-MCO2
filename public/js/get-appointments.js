const SUBMIT_BTN = document.querySelector('input[type=submit]');

SUBMIT_BTN.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const APPOINTMENT_ID = document.querySelector('#appointmentID').value;
        const RESPONSE = await fetch(`/appointments/${APPOINTMENT_ID}`);
        const DATA = await RESPONSE.json();
    } catch (error) {
        console.error(error);
    }
});