namespace JWT_ELMS.Application.IService
{
    public interface IEmailService
    {
        Task SendAsync(string toEmail, string subject, string body);
    }
}
