using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Tags.Queries.GetAllTags
{
    public class GetAllTagsQueryHandler(
        IUnitOfWork unitOfWork,
        ILogger<GetAllTagsQueryHandler> logger) : IRequestHandler<GetAllTagsQuery, Result<GetAllTagsQueryResponse>>
    {
        public async Task<Result<GetAllTagsQueryResponse>> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Request list of tags");

            var tags = await unitOfWork.TagsRepository.GetAll()
                        .Take(100)
                        .Select(t => new TagDataResponse()
                        {
                            Id = t.Id,
                            Name = t.Name,
                        })
                        .ToListAsync(cancellationToken: cancellationToken);

            logger.LogInformation("List of tags obtained from the database");
            

            return Result<GetAllTagsQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    Tags = tags,
                });
        }
    }
}
