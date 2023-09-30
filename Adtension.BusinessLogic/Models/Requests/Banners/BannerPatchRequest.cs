using System.Drawing;
using System.Text.Json.Serialization;

namespace Adtension.BusinessLogic.Models.Requests.Banners;

public class BannerPatchRequest
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string Text { get; set; }
    public string ImageLink { get; set; }
    public string Color { get; set; }
    public string ContentLink { get; set; }
    public Point Position { get; set; }
    public Size Size { get; set; }
    public Guid EffectId { get; set; }
}