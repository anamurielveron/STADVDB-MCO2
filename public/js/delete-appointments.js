const SUBMIT_BTN = document.querySelector('input[type=submit]');

SUBMIT_BTN.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const DATA = {
            appointmentId: document.querySelector('#appointmentID').value,
        };
        const RESPONSE = await fetch('/appointments', {
            body: JSON.stringify(DATA),
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
        });
    } catch(error) {
        console.error(error);
    }
});