using ApiServer;
using Serilog;

Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Information()
            .WriteTo.Console() // Logs to the console
            .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day) // Logs to a file, one per day
            .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog();

builder.Configuration
    .AddJsonFile(".sec/cloudflare.json", optional: false, reloadOnChange: true);

builder.Services.Configure<CloudflareSettings>(
    builder.Configuration.GetSection("Cloudflare")
);

builder.Services.AddHttpClient();
builder.Services.AddHostedService<DDNSUpdater>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
