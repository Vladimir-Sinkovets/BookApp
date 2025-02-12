using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Users.Queries.GetUserById
{
    public class GetUserByIdQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetUserByIdQuery, Result<GetUserByIdQueryResponse>>
    {
        public async Task<Result<GetUserByIdQueryResponse>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = unitOfWork.UsersRepository.FirstOrDefault(x => x.Id == request.Id);

            if (user == null)
                Result<GetUserByIdQueryResponse>.Create(Status.NotFound, "User not found");

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
