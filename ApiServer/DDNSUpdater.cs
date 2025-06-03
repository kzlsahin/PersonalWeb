using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Options;

namespace ApiServer;

public class DDNSUpdater : BackgroundService
{
    private readonly ILogger<DDNSUpdater> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private string? _lastIp;
    private readonly CloudflareSettings _settings;

    public DDNSUpdater(
        ILogger<DDNSUpdater> logger,
        IHttpClientFactory httpClientFactory,
        IOptions<CloudflareSettings> options)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
        _settings = options.Value;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var currentIp = await GetPublicIpAsync();
                if (_lastIp != currentIp)
                {
                    var updated = await UpdateCloudflareDnsAsync(currentIp);
                    if (updated)
                    {
                        _lastIp = currentIp;
                        _logger.LogInformation("Updated Cloudflare DNS to {IP}", currentIp);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating DDNS");
            }

            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }

    private async Task<string> GetPublicIpAsync()
    {
        var client = _httpClientFactory.CreateClient();
        return await client.GetStringAsync("https://api.ipify.org");
    }

    private async Task<bool> UpdateCloudflareDnsAsync(string newIp)
    {
        var client = _httpClientFactory.CreateClient();

        var requestContent = new
        {
            type = "A",
            name = "kzlsahin.online",
            content = newIp,
            ttl = 120,
            proxied = true
        };

        var request = new HttpRequestMessage(HttpMethod.Put, $"https://api.cloudflare.com/client/v4/zones/{_settings.ZoneId}/dns_records/{_settings.RecordId}")
        {
            Headers =
            {
                Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer",  _settings.ApiToken)
            },
            Content = new StringContent(JsonSerializer.Serialize(requestContent), Encoding.UTF8, "application/json")
        };

        var response = await client.SendAsync(request);
        var responseBody = await response.Content.ReadAsStringAsync();
        return response.IsSuccessStatusCode && responseBody.Contains("\"success\":true");
    }
}

