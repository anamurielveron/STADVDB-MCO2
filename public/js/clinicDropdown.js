// fetch CSV data
async function fetchClinicsData() {
    try {
        const response = await fetch('/data/clinics.csv');
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching clinics data:', error);
        return null;
    }
}

// parse CSV data and populate dropdown
// Function to parse CSV data and populate dropdown without duplicates
async function populateClinicDropdown() {
    try {
        console.log('Populating clinic dropdown...');
        const clinicsData = await fetchClinicsData();
        if (!clinicsData) {
            console.error('No data fetched from clinics.csv');
            return;
        }
        const rows = clinicsData.split('\n').slice(1); // Remove header row and split data into rows
        const dropdown = document.getElementById('clinicName');
        const clinicSet = new Set(); // Use Set to store unique clinic names
        
        rows.forEach(row => {
            const columns = row.split(',');
            const clinicID = columns[0].replace(/"/g, '').trim(); // Remove double quotes and trim whitespace
            const clinicName = columns[1].replace(/"/g, '').trim(); // Remove double quotes and trim whitespace

            // Ignore rows without clinic names and duplicates
            if (clinicName !== '' && !clinicSet.has(clinicName)) {
                clinicSet.add(clinicName); // Add clinic name to Set
                const option = document.createElement('option');
                option.text = clinicName;
                option.value = clinicID;
                dropdown.add(option);
            }
        });

        console.log('Clinic dropdown populated successfully.');
    } catch (error) {
        console.error('Error populating clinic dropdown:', error);
    }
}

// update hidden input field with selected clinic ID
function updateClinicID() {
    const dropdown = document.getElementById('clinicName');
    const clinicIDField = document.getElementById('clinicID');
    const selectedClinicID = dropdown.value;
    clinicIDField.value = selectedClinicID;
}

// Call the function to populate the dropdown when the page loads
window.onload = populateClinicDropdown;

// Add event listener to dropdown to update clinic ID when selection changes
document.getElementById('clinicName').addEventListener('change', updateClinicID);
