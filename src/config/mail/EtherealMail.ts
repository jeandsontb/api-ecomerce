import nodemailer from 'nodemailer';
import HandlebarsEmailTemplate from './HandlebarsEmailTemplate';

interface MailContact {
  name: string;
  email: string;
}

interface TemplateVariables {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  template: string;
  variables: TemplateVariables;
}

interface SendEmail {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplate;
}

export default class EtherealMail {
  static async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: SendEmail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsEmailTemplate();

    const transport = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transport.sendMail({
      from: {
        name: from?.name || 'Equipe Ecomerce',
        address: from?.email || 'equipe@ecomerce.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL %s', nodemailer.getTestMessageUrl(message));
  }
}
