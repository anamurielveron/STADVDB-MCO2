const SUBMIT_BTN = document.querySelector('input[type=submit]');

SUBMIT_BTN.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const DATA = {
            appointmentId: document.querySelector('#appointmentId').value,
            endTime: document.querySelector('#apptEndTime').value,
            queueDate: document.querySelector('#apptDate').value,
            startTime: document.querySelector('#apptStartTimet').value,
            status: document.querySelector('#apptStatus').value,
            type: document.querySelector('#apptType').value,
            virtual: document.querySelector('#virtual').value,
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