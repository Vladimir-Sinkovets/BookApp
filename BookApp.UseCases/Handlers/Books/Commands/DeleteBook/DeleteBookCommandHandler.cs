using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Books.Commands.DeleteBook
{
    public class DeleteBookCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteBookCommand, DeleteBookCommandResponse>
    {
        public async Task<DeleteBookCommandResponse> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
        {
            unitOfWork.BooksRepository.Remove(b => b.Id == request.Id);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return new();
        }
    }
}
