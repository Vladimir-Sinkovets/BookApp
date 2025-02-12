namespace BookApp.UseCases.Handlers.Auth.Queries.Login
{
    public class LoginQueryResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
