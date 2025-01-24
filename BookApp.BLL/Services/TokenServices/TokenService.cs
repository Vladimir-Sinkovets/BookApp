using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookApp.DAL.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BookApp.BLL.Services.TokenServices
{
    public class TokenService(IConfiguration config) : ITokenService
    {
        private const int AccessTokenExp = 30;
        private const int RefreshTokenExp = 0;

        private string Audience => config["Jwt:Audience"];
        private string Issuer => config["Jwt:Issuer"];
        private string Key => config["Jwt:Key"];

        public string GenerateAccessJwt(UserEntry userEntry)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userEntry.Id.ToString()),
                new Claim(ClaimTypes.Role, userEntry.Role.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            return GenerateJwt(claims, AccessTokenExp);
        }
        public string GenerateRefreshJwt(UserEntry userEntry)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userEntry.Id.ToString()),
            };
            return GenerateJwt(claims, RefreshTokenExp);
        }
        public ClaimsPrincipal ValidateRefreshToken(string refreshToken)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = Issuer,
                ValidateAudience = true,
                ValidAudience = Audience,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key)),
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out var securityToken);

                if (securityToken is not JwtSecurityToken jwtToken ||
                    !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                return principal;
            }
            catch
            {
                return null;
            }
        }

        private string GenerateJwt(Claim[] claims, double exp)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(exp),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
