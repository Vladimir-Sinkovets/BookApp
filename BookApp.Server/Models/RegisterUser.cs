using System.ComponentModel.DataAnnotations;

namespace BookApp.Server.Models
{
    public class RegisterUser
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
