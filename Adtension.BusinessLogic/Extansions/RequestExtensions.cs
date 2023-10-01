using Adtension.BusinessLogic.Entities;
using Adtension.BusinessLogic.Models.Requests.Banners;
using Adtension.BusinessLogic.Models.Requests.Sessions;

namespace Adtension.BusinessLogic.Extansions;

public static class RequestExtensions
{
    public static Banner ToModel(this BannerCreateRequest request) => new Banner()
    {
        Id = Guid.NewGuid(),
        IsAd = request.IsAd,
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
        IsAd = request.IsAd,
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

    public static Anal ToModel(this AnalSaveRequest request) => new Anal()
    {
        Balance = request.Balance,
        Domain = request.Domain,
        MaxUsers = request.MaxUsers
    };
}