using System.Drawing;
using Adtension.BusinessLogic.Entities;
using Adtension.BusinessLogic.Models.Responses.Banners;
using Adtension.BusinessLogic.Models.Responses.Sessions;

namespace Adtension.BusinessLogic.Extansions;

public static class ResponseExtensions
{
    public static BannerResponse ToResponse(this Banner banner) =>
        new BannerResponse()
        {
            Id = banner.Id,
            Position = new Point(banner.X, banner.Y),
            Size = new Size(banner.Width, banner.Height),
            Color = banner.Color,
            Text = banner.Text,
            ContentLink = banner.ContentLink,
            EffectId = banner.EffectId,
            ImageLink = banner.ImageLink
        };

    public static AnalResponse ToResponse(this Anal anal) =>
        new AnalResponse()
        {
            Balance = anal.Balance,
            Domain = anal.Domain,
            MaxUsers = anal.MaxUsers
        };
}