const SUBMIT_BTN = document.querySelector('input[type=submit]');

SUBMIT_BTN.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const TYPE_DROPDOWN = document.querySelector('#apptType');
        const APPOINTMENT_TYPE = TYPE_DROPDOWN
            .options[TYPE_DROPDOWN.selectedIndex]
            .text;
        const VIRTUAL_DROPDOWN = document.querySelector('#virtual');
        const IS_VIRTUAL = VIRTUAL_DROPDOWN
            .options[VIRTUAL_DROPDOWN.selectedIndex]
            .text;
        const DATA = {
            clinicId: document.querySelector('#clinicId').value,
            queueDate: document.querySelector('#apptDate').value,
            startTime: document.querySelector('#apptTime').value,
            type: APPOINTMENT_TYPE,
            virtual: IS_VIRTUAL === 'Yes' ? 'True' : 'False',
        };

        const RESPONSE = await fetch('/appointments', {
            body: JSON.stringify(DATA),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        });
    } catch(error) {
        console.error(error);
    }
});