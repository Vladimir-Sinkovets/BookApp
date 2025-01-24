using System.Security.Cryptography;
using System.Text;

namespace BookApp.BLL.Services.CryptoServices
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
