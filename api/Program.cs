using api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// 1. Usługi
builder.Services
  .AddDataAccess(builder.Configuration)
  .AddIdentityServices()
  .AddJwtAuthentication(builder.Configuration)
  .AddCorsPolicy()
  .AddApiBehaviorAndJson()
  .AddSwaggerWithJwt();

var app = builder.Build();

// 2. Middleware
app
  .UseCustomSwagger()
  .UseCustomPipeline();

app.Run();
