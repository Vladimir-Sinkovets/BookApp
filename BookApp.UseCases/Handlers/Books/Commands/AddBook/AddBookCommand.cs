using MediatR;

namespace BookApp.UseCases.Handlers.Books.Commands.AddBook
{
    public class AddBookCommand : IRequest<Result<AddBookCommandResponse>>
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Fragment { get; set; }
        public List<string> Tags { get; set; }
    }
}
