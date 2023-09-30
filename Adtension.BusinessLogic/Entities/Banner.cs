namespace Adtension.BusinessLogic.Entities;

public class Banner
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public string ImageLink { get; set; }
    public string Color { get; set; }
    public string ContentLink { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public Guid EffectId { get; set; }
}