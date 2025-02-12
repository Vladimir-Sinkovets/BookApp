namespace BookApp.UseCases.Handlers.Auth.Commands.Register
{
    public class RegisterCommandResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}