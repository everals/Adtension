using Adtension.BusinessLogic.Entities;
using Adtension.BusinessLogic.Models.Requests.Banners;

namespace Adtension.BusinessLogic.Extansions;

public static class RequestExtensions
{
    public static Banner ToModel(this BannerCreateRequest request) => new Banner()
    {
        Id = Guid.NewGuid(),
        Color = request.Color,
        Height = request.Size.Height,
        Text = request.Text,
        Width = request.Size.Width,
        X = request.Position.X,
        Y = request.Position.Y,
        ContentLink = request.ContentLink,
        EffectId = request.EffectId,
        ImageLink = request.ImageLink
    };
    
    public static Banner ToModel(this BannerPatchRequest request) => new Banner()
    {
        Id = request.Id,
        Color = request.Color,
        Height = request.Size.Height,
        Text = request.Text,
        Width = request.Size.Width,
        X = request.Position.X,
        Y = request.Position.Y,
        ContentLink = request.ContentLink,
        EffectId = request.EffectId,
        ImageLink = request.ImageLink
    };
}