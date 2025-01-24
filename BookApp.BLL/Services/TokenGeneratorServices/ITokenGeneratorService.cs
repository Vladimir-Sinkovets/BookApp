namespace BookApp.BLL.Services.TokenGeneratorServices
{
    public interface ITokenGeneratorService
    {
        string GenerateJwtToken(string username);
    }
}
