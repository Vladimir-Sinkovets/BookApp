﻿using BookApp.BLL.Models;

namespace BookApp.BLL.Services.BookServices
{
    public interface IBookService
    {
        Task<BookData> AddBookAsync(BookData book);
        Task DeleteAsync(int id);
        BookData GetBook(int id);
        PaginatedData<IEnumerable<BookData>> GetPaginatedBooks(int page, int itemsPerPage);
        Task<BookData> UpdateBookAsync(BookData book);
    }
}