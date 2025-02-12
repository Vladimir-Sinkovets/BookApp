using System.Security.Cryptography;
using System.Text;
using BookApp.Infrastructure.Interfaces.Services;

namespace BookApp.Infrastructure.Implementations.Services
{
    public class CryptoService : ICryptoService
    {
        public string HashPassword(string password)
        {
            var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));

            var hash = BitConverter.ToString(hashedBytes, 0);

            return hash;
        }

        public bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }
    }
}
