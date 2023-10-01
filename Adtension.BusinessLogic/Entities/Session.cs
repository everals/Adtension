namespace Adtension.BusinessLogic.Entities;

public class Session
{
    public Guid Id { get; set; }
    public Dictionary<Guid, Banner> Banners { get; set; } = new Dictionary<Guid, Banner>();
}