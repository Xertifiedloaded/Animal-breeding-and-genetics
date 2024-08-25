// ConfirmationTemplate.js

function ConfirmationTemplate({ firstName, emailAddress }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Submission Received</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; }
          .header { text-align: center; padding: 10px; background-color: #007bff; color: #ffffff; }
          .content { padding: 20px; }
          .footer { text-align: center; padding: 10px; background-color: #f4f4f4; color: #777; font-size: 12px; }
          .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .details-table th, .details-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .details-table th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Form Submission</h1>
          </div>
          <div class="content">
            <p>Hello Admin,</p>
            <p>A new form has been submitted. Here are the details:</p>
            <table class="details-table">
              <tr>
                <th>Name</th>
                <td>${firstName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>${emailAddress}</td>
              </tr>
              <!-- Add more rows as needed for other fields -->
            </table>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Department Of Animal Breeding And Genetics. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  export default ConfirmationTemplate;