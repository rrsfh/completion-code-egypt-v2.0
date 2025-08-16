// Function to get URL parameter
function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// Function to submit data to Google Sheets automatically
function submitForm(assignmentID, responseID, completionCode) {
    var formData = new FormData();
    formData.append('assignmentID', assignmentID);
    formData.append('responseID', responseID);
    formData.append('completionCode', completionCode);

    // Google Sheets URL for form submission
    var googleSheetURL = 'https://script.google.com/macros/s/AKfycbw_bAtjkCAOyg5crw6TDKYtZty4WYgHlcmQXuhMeW0sXZPYkpIn8twXmaJf4GtqoueRAQ/exec';

    // Make the API request to Google Sheets
    return fetch(googleSheetURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Form submitted successfully", data);
    })
    .catch(error => {
        console.error("Error submitting the form", error);
    });
}


// Extract and store the participant ID and completion token from the URL
var assignmentID = getURLParameter('assignment_id')
var responseID = getURLParameter('response_id');

// Check if participantID exists and handle the completion code
if (responseID) {
    var n1 = 97580; // The hard-coded number
    var completionCode = n1 * responseID;
    document.getElementById('completionCode').innerHTML = `رمز إكمالك هو: ${completionCode}`;

    // Show the h2 message with instructions
    document.getElementById('completionCodeMessage').style.display = 'block';

    // Submit the participantID and completionCode to Google Sheets automatically
    submitForm(assignmentID, responseID, completionCode);

    // Display the button after 5 seconds
    setTimeout(() => {
        document.getElementById('linkButton').style.display = 'block'; // Show the button
        document.getElementById('linkButton').disabled = false;        // Enable the button
    }, 5000); // 5000 milliseconds = 5 seconds

} else {
    document.getElementById('completionCode').innerHTML = `خطأ: لا يمكن المتابعة لأن معرف المشارك الخاص بك مفقود. يرجى التواصل مع BeSample للحصول على المساعدة.`;

    // Hide the h2 message if participantID is missing
    document.getElementById('completionCodeMessage').style.display = 'none';

    // Hide the button if participantID is missing
    document.getElementById('linkButton').style.display = 'none';
}




// Function to show alerts for different tabs
function showAlert(tabName) {
    let message;
    switch (tabName) {
      case 'Home':
        message = "هذا هو رمز الإكمال الخاص بك. يرجى تدوينه ثم الضغط على الزر لإنهاء الدراسة.";
        break;
      case 'Instructions':
        message = "التعليمات: قم بتدوين رمز الإكمال الخاص بك واضغط على الزر لإنهاء الدراسة.";
        break;
      case 'Contact':
        message = "إذا واجهت صعوبة في هذه الصفحة، لا تقلق. فقط قدم رمز الإكمال الخاص بك إلى BeSample لإنهاء الدراسة.";
        break;
      default:
        message = "لا توجد معلومات متاحة.";
    }
    alert(message);
}
