using Swashbuckle.AspNetCore.Filters;
using api.DTOs;

namespace api.SwaggerExamples
{
    public class RegisterDtoExample : IExamplesProvider<RegisterDto>
    {
        public RegisterDto GetExamples() => new()
        {
            Username = "username",
            Email = "user@example.com",
            Password = "string"
        };
    }
}
