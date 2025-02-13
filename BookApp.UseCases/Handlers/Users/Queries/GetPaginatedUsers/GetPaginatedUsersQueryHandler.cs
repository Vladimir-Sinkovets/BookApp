using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Users.Queries.GetPaginatedUsers
{
    public class GetPaginatedUsersQueryHandler(
        IUnitOfWork unitOfWork,
        ILogger<GetPaginatedUsersQueryHandler> logger) : IRequestHandler<GetPaginatedUsersQuery, Result<GetPaginatedUsersQueryResponse>>
    {
        public async Task<Result<GetPaginatedUsersQueryResponse>> Handle(GetPaginatedUsersQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Request a list of users");

            var usersCount = unitOfWork.UsersRepository.GetAll().Count();

            var users = unitOfWork.UsersRepository.GetAll()
                .Skip(request.ItemsPerPage * (request.Page - 1))
                .Take(request.ItemsPerPage)
                .Select(x => new UserDataResponse()
                {
                    Id = x.Id,
                    Email = x.Email,
                    Name = x.Name,
                });

            logger.LogInformation("List of users returned");

            return Result<GetPaginatedUsersQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    Users = users,
                    LastPage = (int)Math.Ceiling(usersCount / (decimal)request.ItemsPerPage),
                });
        }
    }
}
