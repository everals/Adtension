using System.Text.Json.Serialization;

namespace Adtension.Models.Requests.Banners;

public class BannerPatchRequest
{
    [JsonIgnore]
    public Guid Id { get; set; }
}