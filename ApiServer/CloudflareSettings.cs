namespace ApiServer;

public class CloudflareSettings
{
    public string ZoneId { get; set; } = default!;
    public string RecordId { get; set; } = default!;
    public string ApiToken { get; set; } = default!;
    public string RecordName { get; set; } = default!;
}
