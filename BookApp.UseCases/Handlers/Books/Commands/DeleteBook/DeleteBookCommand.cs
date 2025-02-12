using MediatR;

namespace BookApp.UseCases.Handlers.Books.Commands.DeleteBook
{
    public class DeleteBookCommand : IRequest<DeleteBookCommandResponse>
    {
        public int Id {  get; set; }
    }
}
