using System.Drawing;

namespace Adtension.BusinessLogic.Models.Responses.Banners;

public class BannerResponse
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public string ImageLink { get; set; }
    public string Color { get; set; }
    public string ContentLink { get; set; }
    public Point Position { get; set; }
    public Size Size { get; set; }
    public Guid EffectId { get; set; }
}