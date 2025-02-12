using MediatR;

namespace BookApp.UseCases.Handlers.Books.Commands.DeleteBook
{
    public class DeleteBookCommand : IRequest<Result<DeleteBookCommandResponse>>
    {
        public int Id {  get; set; }
    }
}
