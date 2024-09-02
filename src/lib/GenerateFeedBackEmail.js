// GenerateFeedBackEmail.js
export const generateAdminMailNotification = (
    firstName,
    middleName,
    lastName,
    emailAddress,
    phoneNumber,
    graduatedYear,
    supervisor,
    locationOrCountry,
    previousJob,
    currentJob,
    advice
  ) => {
    return `
      <html>
      <body>
        <h2>New Form Received</h2>
        <p><strong>Name:</strong> ${firstName} ${middleName} ${lastName}</p>
        <p><strong>Email:</strong> ${emailAddress}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Graduated Year:</strong> ${graduatedYear}</p>
        <p><strong>Supervisor:</strong> ${supervisor}</p>
        <p><strong>Address:</strong> ${locationOrCountry}</p>
        <p><strong>Previous Job:</strong> ${previousJob}</p>
        <p><strong>Current Job:</strong> ${currentJob}</p>
        <p><strong>Advice for the department:</strong> ${advice}</p>
      </body>
      </html>
    `;
  };
  
  export const generateFeedbackEmail = (
    firstName,
    middleName,
    lastName,
    emailAddress,
    phoneNumber,
    graduatedYear,
    supervisor,
    locationOrCountry,
    previousJob,
    currentJob,
    advice
  ) => {
    return `
      <html>
      <body>
        <h2>Thank You for Your Feedback!</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your feedback. Here are the details:</p>
        <p><strong>Name:</strong> ${firstName} ${middleName} ${lastName}</p>
        <p><strong>Email:</strong> ${emailAddress}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Graduated Year:</strong> ${graduatedYear}</p>
        <p><strong>Supervisor:</strong> ${supervisor}</p>
        <p><strong>Address:</strong> ${locationOrCountry}</p>
        <p><strong>Previous Job:</strong> ${previousJob}</p>
        <p><strong>Current Job:</strong> ${currentJob}</p>
        <p><strong>Advice for the department:</strong> ${advice}</p>
        <p>We appreciate your time and effort in providing us with your valuable feedback.</p>
        <p>Best regards,<br>Department of Animal Breeding And Genetics</p>
      </body>
      </html>
    `;
  };
  