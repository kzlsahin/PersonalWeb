using ApiServer;
using Serilog;

Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Warning()
            .WriteTo.Console() // Logs to the console
            .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day) // Logs to a file, one per day
            .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSerilog();

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

app.MapGet("/selam", () => "Selam yabanci").WithOpenApi();;

app.Run();
