

export const generateEmailTemplate = (timestamp, uptime, status, apiCheckMessages, databaseStatus) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #4CAF50; text-align: center; margin-bottom: 30px;">Website Health Report</h2>
  
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Timestamp:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${timestamp}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Uptime:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${uptime.toFixed(2)} seconds</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Status:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; color: ${status === 'fail' ? 'red' : 'green'};"><strong>${status === 'fail' ? 'Failure' : 'Operational'}</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Database Connection:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; color: ${databaseStatus === 'fail' ? 'red' : 'green'};"><strong>${databaseStatus === 'fail' ? 'Failure' : 'Connected'}</strong></td>
          </tr>
        </table>
  
        ${apiCheckMessages}
  
        <p style="margin-top: 20px; color: #555;">If any issues are identified, please address them promptly to ensure optimal performance.</p>
        <div style="margin-top: 40px; text-align: center;">
          <a href="https://www.abg-funaab.com.ng" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Website</a>
        </div>
  
        <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #999;">
          <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
      </div>
    `;
  };



  export const generateApiCheckMessages = (apiChecks) => {
    if (!apiChecks || apiChecks.length === 0) {
      return '';
    }
    
    return `
      <h3 style="color: #4CAF50; margin-bottom: 10px;">Internal API Checks</h3>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        ${apiChecks.map(check => `
          <li style="background-color: ${check.status === 'fail' ? '#f8d7da' : '#d4edda'};
                     color: ${check.status === 'fail' ? '#721c24' : '#155724'};
                     padding: 10px; margin-bottom: 5px; border-radius: 5px;">
            ${check.message.replace(/(https?:\/\/[^\s]+)/g, `<a href="$1" style="color: inherit; text-decoration: none;">${check.name}</a>`)}
          </li>`).join('')}
      </ul>
    `;
  };
  