using BookApp.BLL.Models;

namespace BookApp.BLL.Services.UserServices
{
    public interface IUserService
    {
        PaginatedData<UserResponseData> GetPaginatedUsers(int page, int itemsPerPage);
        UserResponseData GetUserById(int id);
    }
}