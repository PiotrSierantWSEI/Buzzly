using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class RegisterDto
    {
        [Required]
        [StringLength(35, MinimumLength = 3)]
        public string Username { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;
    }
    public class RegisterResponseDto
    {
        public int Status { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; } = null!;
    }
}
