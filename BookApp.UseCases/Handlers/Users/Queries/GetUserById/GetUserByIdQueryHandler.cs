using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Users.Queries.GetUserById
{
    public class GetUserByIdQueryHandler(
        IUnitOfWork unitOfWork,
        ILogger<GetUserByIdQueryHandler> logger) : IRequestHandler<GetUserByIdQuery, Result<GetUserByIdQueryResponse>>
    {
        public async Task<Result<GetUserByIdQueryResponse>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Request a user with id: {id}", request.Id);

            var user = unitOfWork.UsersRepository.FirstOrDefault(x => x.Id == request.Id);

            if (user == null)
            {
                logger.LogInformation("User not found with id: {id}", request.Id);

                return Result<GetUserByIdQueryResponse>.Create(Status.NotFound, "User not found");
            }

            logger.LogInformation("User returned with id: {id}", request.Id);

            return Result<GetUserByIdQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                });
        }
    }
}
