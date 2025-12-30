using System.Net;
using System.Net.Mail;
using JWT_ELMS.Application.IService;
using Microsoft.Extensions.Configuration;

namespace JWT_ELMS.Application.Service

    //http://localhost:5173/reset-password
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendAsync(string toEmail, string subject, string resetLink)
        {
            var smtpHost = _configuration["Email:Smtp"];
            var port = int.Parse(_configuration["Email:Port"]!);
            var username = _configuration["Email:Username"];
            var password = _configuration["Email:Password"];
            var fromEmail = _configuration["Email:From"];

            var htmlBody = $@"
        <html>
        <body style='font-family: Arial, sans-serif;'>
            <p>You requested to reset your password.</p>

            <a href='{resetLink}'
               style='
                    display:inline-block;
                    padding:10px 20px;
                    background-color:#0d6efd;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:5px;
                    font-weight:bold;
               '>
                Reset
            </a>

            <p style='margin-top:15px;'>
                If you did not request this, please ignore this email.
            </p>
        </body>
        </html>
    ";

            var message = new MailMessage
            {
                From = new MailAddress(fromEmail!),
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true
            };

            message.To.Add(toEmail);

            using var smtpClient = new SmtpClient(smtpHost!, port)
            {
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };

            await smtpClient.SendMailAsync(message);
        }

    }
}
