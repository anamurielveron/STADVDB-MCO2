const SUBMIT_BTN = document.querySelector('input[type=submit]');

SUBMIT_BTN.addEventListener('click', async () => {
    try {
        const RESPONSE = await fetch('/appointments', {
            body: {
                appointmentId: document.querySelector('#appointmentId').value,
                endTime: document.querySelector('#apptEndTime').value,
                queueDate: document.querySelector('#apptDate').value,
                startTime: document.querySelector('#apptStartTimet').value,
                status: document.querySelector('#apptStatus').value,
                type: document.querySelector('#apptType').value,
                virtual: document.querySelector('#virtual').value,
            },
            method: 'DELETE',
        });
    } catch(error) {
        console.error(error);
    }
});