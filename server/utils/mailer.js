// server/utils/mailer.js
import nodemailer from "nodemailer";

let transporter;

function getTransporter(config) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: Number(config.smtpPort || 587),
      secure: false,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });
  }
  return transporter;
}

export async function sendVerificationEmail(to, token, config) {
  const baseUrl = config.mailVerificationBaseUrl || config.public.appBaseUrl;
  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${encodeURIComponent(
    token
  )}`;

  const transport = getTransporter(config);

  await transport.sendMail({
    from: config.mailFrom,
    to,
    subject: "Confirmez votre adresse e-mail",
    html: `
      <p>Bienvenue chez Batina Media,</p>
      <p>Merci de créer un compte. Pour activer votre compte, cliquez sur le lien ci-dessous :</p>
      <p><a href="${verifyUrl}">Confirmer mon adresse e-mail</a></p>
      <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement ce message.</p>
    `,
  });
}
