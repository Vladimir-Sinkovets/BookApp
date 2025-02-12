namespace BookApp.Infrastructure.Interfaces.Services
{
    public interface ICryptoService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
}
