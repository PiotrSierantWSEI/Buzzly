using Swashbuckle.AspNetCore.Filters;
using api.DTOs;

namespace api.SwaggerExamples
{
    public class ProductDtoExample : IExamplesProvider<CreateProductDto>
    {
        public CreateProductDto GetExamples() => new()
        {
            Name = "przykładowy-slug-produktu",
            Title = "Tytuł produktu",
            Author = "Jan Kowalski",
            Description = "Opis przykładowego produktu jako ciąg znaków HTML.",
            Price = 19.99m,
            CoverImageUrl = "https://example.com/cover.jpg"
        };
    }
}
