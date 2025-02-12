using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Queries.GetById
{
    public class GetByIdQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetByIdQuery, GetByIdQueryResponse>
    {
        public async Task<GetByIdQueryResponse> Handle(GetByIdQuery request, CancellationToken cancellationToken)
        {
            var tagEntry = unitOfWork.TagsRepository
                .FirstOrDefault(t => t.Id == request.Id);

            //if (tagEntry == null)
            //    throw new NotFoundException();

            return new()
            {
                Id = tagEntry.Id,
                Name = tagEntry.Name,
            };
        }
    }
}
