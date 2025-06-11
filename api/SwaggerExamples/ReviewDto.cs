using Swashbuckle.AspNetCore.Filters;
using api.DTOs;
using System.Collections.Generic;

namespace api.SwaggerExamples
{
    public class CreateReviewDtoExample : IExamplesProvider<CreateReviewDto>
    {
        public CreateReviewDto GetExamples() => new()
        {
            ProductId = 123,
            UserId = 456,
            AuthorName = "Anna",
            AuthorSurname = "Nowak",
            Rating = 5,
            Content = "Świetny produkt, spełnił moje oczekiwania. Polecam!",
            Images = new List<string>
            {
                "https://example.com/images/review1.jpg",
                "https://example.com/images/review2.jpg"
            }
        };
    }
    public class ReviewResponseDtoExample : IExamplesProvider<ReviewResponseDto>
    {
        public ReviewResponseDto GetExamples() => new()
        {
            Id = 501,
            ProductId = 1001,
            UserId = 42,
            AuthorName = "Maria",
            AuthorSurname = "Wiśniewska",
            Rating = 4,
            Content = "Produkt dobrej jakości, szybka dostawa. Jestem zadowolona z zakupu.",
            Images = new List<string>
            {
                "https://example.com/uploads/review-1001-1.jpg",
                "https://example.com/uploads/review-1001-2.jpg"
            },
            Status = ReviewStatus.APPROVED,
            CreatedAt = new DateTime(2024, 6, 11, 12, 0, 0),
            UpdatedAt = new DateTime(2024, 6, 12, 14, 30, 0),
            ModeratedBy = 5,
            ModeratedAt = new DateTime(2024, 6, 12, 14, 0, 0)
        };
    }
    public class UpdateReviewDtoExample : IExamplesProvider<UpdateReviewDto>
    {
        public UpdateReviewDto GetExamples() => new()
        {
            Rating = 5,
            Content = "Po dłuższym czasie użytkowania jestem jeszcze bardziej zadowolona. Polecam!",
            Images = new List<string>
            {
                "https://example.com/uploads/review-1001-1.jpg",
                "https://example.com/uploads/review-1001-3.jpg"
            }
        };
    }
}
