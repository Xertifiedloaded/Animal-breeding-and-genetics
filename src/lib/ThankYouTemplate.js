// CustomerThankYouTemplate.js

function ThankYouTemplate({ firstName }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; }
          .header { text-align: center; padding: 10px; background-color: #007bff; color: #ffffff; }
          .content { padding: 20px; text-align: center; }
          .footer { text-align: center; padding: 10px; background-color: #f4f4f4; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Submission, ${firstName}!</h1>
          </div>
          <div class="content">
            <p>We have received your information and will process it shortly.</p>
            <p>If you have any questions, feel free to contact us.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Department of Animal Breeding Ang Genetics. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  export default ThankYouTemplate;