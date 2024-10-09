export const generateResetPasswordEmail = (email, resetLink) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333;
        }

        p {
            color: #666;
            margin-bottom: 10px;
        }

        .message {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .message p {
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <div class="message">
            <p>Dear ${email},</p>
            <p>We received a request to reset your password. To reset your password, please click the link below:</p>
            <p><a href="${resetLink}" style="color: #4F46E5;">Reset Your Password</a></p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
          <p>Best regards,<br>Department of Animal Breeding And Genetics</p>
    </div>
</body>

</html>
`;


export const generateSignupOtpEmail = (email, otp,verificationLink) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333;
        }

        p {
            color: #666;
            margin-bottom: 10px;
        }

        .message {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .message p {
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Email Verification</h2>
        <div class="message">
            <p>Dear ${email},</p>
            <p>Thank you for signing up! To complete your registration, please use the OTP below to verify your email address:</p>
            <p><strong>OTP:</strong> ${otp}</p>
            <p>${verificationLink}</p>
            <p>If you did not sign up for this account, please ignore this email.</p>
        </div>
          <p>Best regards,<br>Department of Animal Breeding And Genetics</p>
    </div>
</body>

</html>
`;


