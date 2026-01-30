import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
);

/**
 * Generate a random secure password
 * @param length - Length of the password (default: 12)
 * @returns Random password string
 */
export function generateRandomPassword(length: number = 12): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Send credentials email to a new user via Brevo
 * @param email - Recipient email address
 * @param password - Generated password
 */
export async function sendCredentialsEmail(
  email: string,
  password: string
): Promise<void> {
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = 'Vos identifiants Prestalink';
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = {
    name: 'Prestalink',
    email: process.env.EMAIL_FROM || 'noreply@prestalink.com',
  };
  
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f172a; color: white; padding: 20px; text-align: center; }
          .content { background: #f8fafc; padding: 30px; border-radius: 8px; margin-top: 20px; }
          .credentials { background: white; padding: 20px; border-radius: 4px; margin: 20px 0; }
          .label { font-weight: bold; color: #64748b; }
          .value { font-family: monospace; background: #f1f5f9; padding: 8px; border-radius: 4px; margin-top: 5px; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; letter-spacing: 0.3em; font-weight: 300;">PRESTALINK</h1>
          </div>
          <div class="content">
            <h2>Bienvenue sur Prestalink</h2>
            <p>Votre compte a été créé avec succès. Voici vos identifiants de connexion :</p>
            
            <div class="credentials">
              <div style="margin-bottom: 15px;">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div>
                <div class="label">Mot de passe</div>
                <div class="value">${password}</div>
              </div>
            </div>
            
            <p><strong>Important :</strong> Pour des raisons de sécurité, nous vous recommandons de changer votre mot de passe lors de votre première connexion.</p>
            
            <p>Vous pouvez vous connecter à l'adresse : <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login">Prestalink</a></p>
          </div>
          <div class="footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    throw new Error('Failed to send credentials email');
  }
}
