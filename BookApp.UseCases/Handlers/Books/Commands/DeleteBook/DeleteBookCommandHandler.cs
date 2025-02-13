using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Books.Commands.DeleteBook
{
    public class DeleteBookCommandHandler(
        IUnitOfWork unitOfWork,
        ILogger<DeleteBookCommandHandler> logger) : IRequestHandler<DeleteBookCommand, Result<DeleteBookCommandResponse>>
    {
        public async Task<Result<DeleteBookCommandResponse>> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Attempting to delete book with id: {id}", request.Id);

            unitOfWork.BooksRepository.Remove(b => b.Id == request.Id);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Book deleted with id: {id}", request.Id);

            return Result<DeleteBookCommandResponse>.Create(Status.Success, "Success");
        }
    }
}
