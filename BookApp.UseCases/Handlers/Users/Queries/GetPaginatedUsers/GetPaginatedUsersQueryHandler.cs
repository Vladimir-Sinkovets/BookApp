using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Users.Queries.GetPaginatedUsers
{
    public class GetPaginatedUsersQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetPaginatedUsersQuery, GetPaginatedUsersQueryResponse>
    {
        public async Task<GetPaginatedUsersQueryResponse> Handle(GetPaginatedUsersQuery request, CancellationToken cancellationToken)
        {
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

            return new()
            {
                Items = users,
                LastPage = (int)Math.Ceiling(usersCount / (decimal)request.ItemsPerPage),
            };
        }
    }
}
