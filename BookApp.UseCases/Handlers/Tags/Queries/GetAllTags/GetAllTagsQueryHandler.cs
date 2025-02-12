using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookApp.UseCases.Handlers.Tags.Queries.GetAllTags
{
    public class GetAllTagsQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetAllTagsQuery, GetAllTagsQueryResponse>
    {
        public async Task<GetAllTagsQueryResponse> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
        {
            return new()
            {
                Tags = await unitOfWork.TagsRepository.GetAll()
                    .Take(100)
                    .Select(t => new TagDataResponse()
                        {
                            Id = t.Id,
                            Name = t.Name,
                        })
                    .ToListAsync(cancellationToken: cancellationToken)
            };
        }
    }
}
