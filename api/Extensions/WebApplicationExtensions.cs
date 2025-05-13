namespace api.Extensions
{
    public static class WebApplicationExtensions
    {
        public static WebApplication UseCustomSwagger(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            return app;
        }

        public static WebApplication UseCustomPipeline(this WebApplication app)
        {
            app.UseHttpsRedirection()
               .UseRouting()
               .UseCors("AllowReactApp")
               .UseAuthentication()
               .UseAuthorization()
               .UseEndpoints(endpoints =>
               {
                   endpoints.MapControllers();
               });
            return app;
        }
    }
}
