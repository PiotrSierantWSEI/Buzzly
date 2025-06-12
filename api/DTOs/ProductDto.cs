using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.DTOs
{
    public class CreateProductDto
    {
        [Required]
        [SwaggerSchema(Description = "Nazwa produktu(slug)")]
        [StringLength(35, ErrorMessage = "Maksymalnie 35 znaków")]
        public string Name { get; set; } = null!;

        [Required]
        [SwaggerSchema(Description = "Tytuł produktu")]
        public string Title { get; set; } = null!;

        [Required]
        [SwaggerSchema(Description = "Autor produktu")]
        [StringLength(35, ErrorMessage = "Maksymalnie 35 znaków")]
        public string Author { get; set; } = null!;

        [SwaggerSchema(Description = "Opis produktu")]
        public string? Description { get; set; }

        [Required]
        [SwaggerSchema(Description = "Cena produktu")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Cena musi być większa od zera")]
        public decimal Price { get; set; }

        [Url(ErrorMessage = "Nieprawidłowy URL")]
        [SwaggerSchema(Description = "URL do zdjęcia produktu")]
        [JsonPropertyName("cover_image_url")]
        public string? CoverImageUrl { get; set; }
    }

    public class ProductResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        [JsonPropertyName("cover_image_url")]
        public string? CoverImageUrl { get; set; }
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonPropertyName("reviews_count")]
        public int? ReviewsCount { get; set; }
    }
    public class ProductsResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public decimal Price { get; set; }
        [JsonPropertyName("cover_image_url")]
        public string? CoverImageUrl { get; set; }
    }
}