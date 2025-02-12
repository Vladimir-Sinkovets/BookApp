using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Queries.GetById
{
    public class GetByIdQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetByIdQuery, Result<GetByIdQueryResponse>>
    {
        public async Task<Result<GetByIdQueryResponse>> Handle(GetByIdQuery request, CancellationToken cancellationToken)
        {
            var tagEntry = unitOfWork.TagsRepository
                .FirstOrDefault(t => t.Id == request.Id);

            if (tagEntry == null)
                Result<GetByIdQueryResponse>.Create(Status.NotFound, "Tag not found");

            return Result<GetByIdQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    Id = tagEntry.Id,
                    Name = tagEntry.Name,
                });
        }
    }
}
