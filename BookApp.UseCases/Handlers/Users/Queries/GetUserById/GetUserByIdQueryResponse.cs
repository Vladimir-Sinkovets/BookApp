namespace BookApp.UseCases.Handlers.Users.Queries.GetUserById
{
    public class GetUserByIdQueryResponse
    {
        public int Id { get; internal set; }
        public string Email { get; internal set; }
        public string Name { get; internal set; }
    }
}
