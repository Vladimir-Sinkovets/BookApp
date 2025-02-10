using BookApp.BLL.Exceptions;
using BookApp.BLL.Models;
using BookApp.DAL.Models;
using BookApp.DAL.Repositories;

namespace BookApp.BLL.Services.UserServices
{
    public class UserService(IUnitOfWork unitOfWork) : IUserService
    {
        public UserResponseData GetUserById(int id)
        {
            var user = unitOfWork.UsersRepository.FirstOrDefault(x => x.Id == id);

            if (user == null)
                throw new NotFoundException();

            return MapToUserResponseData(user);
        }

        public PaginatedData<UserResponseData> GetPaginatedUsers(int page, int itemsPerPage)
        {
            var usersCount = unitOfWork.UsersRepository.GetAll().Count();

            var users = unitOfWork.UsersRepository.GetAll()
                .Skip(itemsPerPage * (page - 1))
                .Take(itemsPerPage)
                .Select(x => MapToUserResponseData(x));

            return new PaginatedData<UserResponseData>
            {
                Items = users,
                LastPage = (int)Math.Ceiling(usersCount / (decimal)itemsPerPage),
            };
        }

        private static UserResponseData MapToUserResponseData(UserEntry user)
        {
            return new UserResponseData()
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
            };
        }
    }
}
