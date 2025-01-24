﻿namespace BookApp.BLL.Services.CryptoServices
{
    public interface ICryptoService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
}
