public enum ReviewStatus
{
    PENDING,
    APPROVED,
    REJECTED
}

namespace api.DTOs
{
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
}