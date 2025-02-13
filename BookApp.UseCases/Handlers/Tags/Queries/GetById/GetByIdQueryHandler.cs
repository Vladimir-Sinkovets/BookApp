using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Tags.Queries.GetById
{
    public class GetByIdQueryHandler(
        IUnitOfWork unitOfWork,
        ILogger<GetByIdQueryHandler> logger) : IRequestHandler<GetByIdQuery, Result<GetByIdQueryResponse>>
    {
        public async Task<Result<GetByIdQueryResponse>> Handle(GetByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Request tag by id: {id}", request.Id);

            var tagEntry = unitOfWork.TagsRepository
                .FirstOrDefault(t => t.Id == request.Id);

            if (tagEntry == null)
            {
                logger.LogWarning("Tag not found: {id}", request.Id);

                return Result<GetByIdQueryResponse>.Create(Status.NotFound, "Tag not found");
            }

            logger.LogInformation("Tag returned with id: {id}", request.Id);

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
