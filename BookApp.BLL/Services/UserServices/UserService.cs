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

        public IEnumerable<UserResponseData> GetPaginatedUsers(int page, int itemsPerPage)
        {
            return unitOfWork.UsersRepository.GetAll()
                .Skip(itemsPerPage * (page - 1))
                .Take(itemsPerPage)
                .Select(x => MapToUserResponseData(x));
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
