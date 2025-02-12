using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Books.Commands.DeleteBook
{
    public class DeleteBookCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteBookCommand, Result<DeleteBookCommandResponse>>
    {
        public async Task<Result<DeleteBookCommandResponse>> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
        {
            unitOfWork.BooksRepository.Remove(b => b.Id == request.Id);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return Result<DeleteBookCommandResponse>.Create(Status.Success, "Success");
        }
    }
}
