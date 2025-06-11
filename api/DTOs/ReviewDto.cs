using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

public enum ReviewStatus
{
    PENDING,
    APPROVED,
    REJECTED
}

namespace api.DTOs
{
    public class CreateReviewDto
    {
        [Required]
        [SwaggerSchema(Description = "Identyfikator produktu, do którego dodawana jest recenzja")]
        public int ProductId { get; set; }

        [SwaggerSchema(Description = "Identyfikator użytkownika, który dodaje recenzję (opcjonalny)")]
        public int? UserId { get; set; }

        [SwaggerSchema(Description = "Imię autora recenzji (opcjonalne)")]
        [StringLength(35, ErrorMessage = "Maksymalnie 35 znaków")]
        public string? AuthorName { get; set; }

        [SwaggerSchema(Description = "Nazwisko autora recenzji (opcjonalne)")]
        [StringLength(35, ErrorMessage = "Maksymalnie 35 znaków")]
        public string? AuthorSurname { get; set; }

        [Required]
        [SwaggerSchema(Description = "Ocena recenzji w skali od 1 do 5")]
        [Range(1, 5, ErrorMessage = "Ocena musi być w zakresie od 1 do 5")]
        public int Rating { get; set; }

        [Required]
        [SwaggerSchema(Description = "Treść recenzji")]
        public string Content { get; set; } = null!;

        [SwaggerSchema(Description = "Lista URLi do zdjęć recenzji (opcjonalne)")]
        public List<string>? Images { get; set; }
    }

    public class ReviewResponseDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int? UserId { get; set; }
        public string? AuthorName { get; set; }
        public string? AuthorSurname { get; set; }
        public int Rating { get; set; }
        public string Content { get; set; } = null!;
        public List<string>? Images { get; set; }
        public ReviewStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? ModeratedBy { get; set; }
        public DateTime? ModeratedAt { get; set; }
    }
    public class UpdateReviewDto
    {
        [Range(1, 5)]
        public int? Rating { get; set; }
        public string? Content { get; set; }
        public List<string>? Images { get; set; }
    }
}