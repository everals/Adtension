using Adtension.BusinessLogic.Entities;
using Adtension.BusinessLogic.Extansions;
using Adtension.BusinessLogic.Models;
using Adtension.BusinessLogic.Models.Requests.Banners;
using Adtension.BusinessLogic.Models.Responses.Banners;

namespace Adtension.BusinessLogic.Managers;

public class BannersManager
{
    private readonly Session session;
    //private readonly SessionsManager sessionsManager;

    public BannersManager(Guid sessionId, SessionsManager sessionsManager)
    {
        session = sessionsManager.Get(sessionId);
        //this.sessionsManager = sessionsManager;
    }

    public async Task<BannerResponse> Get(Guid bannerId)
    {
        return session.Banners[bannerId].ToResponse();
    }

    public async Task<IReadOnlyCollection<Banner>> GetAll() => session.Banners.Values;

    public async Task<BannerResponse> Create(BannerCreateRequest request)
    {
        var banner = request.ToModel();
        session.Banners.TryAdd(banner.Id, banner);
        return banner.ToResponse();
    }

}