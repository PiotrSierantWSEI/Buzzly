using Swashbuckle.AspNetCore.Filters;
using api.DTOs;

namespace api.SwaggerExamples
{
    public class LoginDtoExample : IExamplesProvider<LoginDto>
    {
        public LoginDto GetExamples() => new()
        {
            Email = "user@example.com",
            Password = "string"
        };
    }
}
