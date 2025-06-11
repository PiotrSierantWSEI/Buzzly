using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class UpdateReviewDto
    {
        [Range(1, 5)]
        public int? Rating { get; set; }
        public string? Content { get; set; }
        public List<string>? Images { get; set; }
    }
}