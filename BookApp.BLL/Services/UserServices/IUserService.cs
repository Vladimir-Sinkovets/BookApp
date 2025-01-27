using BookApp.BLL.Models;

namespace BookApp.BLL.Services.UserServices
{
    public interface IUserService
    {
        IEnumerable<UserResponseData> GetPaginatedUsers(int page, int itemPerPage);
        UserResponseData GetUserById(int id);
    }
}