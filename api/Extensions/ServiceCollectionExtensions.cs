using api.Data;
using api.Models;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Swashbuckle.AspNetCore.Filters;
using api.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
namespace api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDataAccess(this IServiceCollection services, IConfiguration config)
        {
            // Rejestracja DbContextu z użyciem Npgsql i connection stringa
            // Npgsql to dostawca bazy danych PostgreSQL dla platformy .NET
            var connectionString = config.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(opt => opt.UseNpgsql(connectionString));
            return services;
        }

        public static IServiceCollection AddIdentityServices(this IServiceCollection services)
        {
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
        {
            // Rejestracja JWT z użyciem klucza i ustawień z pliku konfiguracyjnego
            var jwt = config.GetSection("JWT").Get<JwtSettings>()!;
            services
                .AddAuthentication(options =>
                {
                    // Ustawienia domyślne dla uwierzytelniania
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    // Weryfikacja tokenu JWT
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = jwt.Issuer,
                        ValidateAudience = true,
                        ValidAudience = jwt.Audience,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key)),
                        ValidateIssuerSigningKey = true
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            // Sprawdzam, czy token JWT jest w nagłówku Authorization
                            if (context.Request.Cookies.TryGetValue("jwt", out var token))
                                context.Token = token;
                            return Task.CompletedTask;
                        },
                        OnChallenge = async context =>
                        {
                            // Nadpisanie odpowiedźi 401 własnym interfejsem ErrorDetails
                            context.HandleResponse();
                            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                            context.Response.ContentType = "application/json";
                            var payload = new ErrorDetails
                            {
                                Status = 401,
                                Message = "Brak lub nieprawidłowy token uwierzytelniający."
                            };
                            await context.Response.WriteAsJsonAsync(payload);
                        },
                        OnForbidden = async context =>
                        {
                            // Nadpisanie odpowiedźi 403 własnym interfejsem ErrorDetails
                            context.Response.StatusCode = StatusCodes.Status403Forbidden;
                            context.Response.ContentType = "application/json";
                            var payload = new ErrorDetails
                            {
                                Status = 403,
                                Message = "Brak dostępu do zasobu (niewłaściwe uprawnienia)."
                            };
                            await context.Response.WriteAsJsonAsync(payload);
                        }
                    };
                });
            // Rejestracja polityki autoryzacji
            services.AddAuthorization();
            return services;
        }

        public static IServiceCollection AddApiBehaviorAndJson(this IServiceCollection services)
        {
            services
              .AddControllers() // Rejestracja kontrolerów
              .AddJsonOptions(options =>
              {
                  // wszystkie zwracane JSON-y będą mieć camelCase: error, status, message
                  options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
              })
              .ConfigureApiBehaviorOptions(options =>
              {
                  // Domyślnie ASP.NET Core zwraca 400 BadRequest, gdy model jest nieprawidłowy w moim interfejsie błędów
                  options.SuppressModelStateInvalidFilter = true;
                  options.InvalidModelStateResponseFactory = context =>
                  {
                      var payload = new ErrorDetails
                      {
                          Status = StatusCodes.Status400BadRequest,
                          Message = "Nieprawidłowe dane wejściowe."
                      };
                      return new BadRequestObjectResult(payload);
                  };
              });
            return services;
        }

        public static IServiceCollection AddSwaggerWithJwt(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(config =>
            {
                config.EnableAnnotations();
                // Definicja schematu Bearer
                config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT: „Bearer {token}” lub tylko token",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer"
                });
                // Wymóg (dla wszystkich endpointów [Authorize])
                config.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {
                  new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {
                      Type = ReferenceType.SecurityScheme,
                      Id   = "Bearer"
                    }
                  },
                  Array.Empty<string>()
                }
              });
                config.ExampleFilters();
            });
            // Rejestruje wewnątrz Swaggera wszystkie przykładowe dane (IExamplesProvider<T>) 
            // LoginDto, RegisterDto i inne, które są w tej samej przestrzeni czyli api.DTOs
            services.AddSwaggerExamplesFromAssemblyOf<LoginDto>();
            return services;
        }

        public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
        {
            // Rejestracja polityki CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", p =>
                  p.WithOrigins("http://localhost:3000") // React app URL
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials()
                );
            });
            return services;
        }
    }
}
