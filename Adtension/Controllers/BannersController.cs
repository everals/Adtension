using System.Drawing;
using Adtension.BusinessLogic.Extansions;
using Adtension.BusinessLogic.Managers;
using Adtension.BusinessLogic.Models.Requests.Banners;
using Adtension.BusinessLogic.Models.Responses.Banners;
using Microsoft.AspNetCore.Mvc;

namespace Adtension.Controllers;

[ApiController]
[Route("[controller]")]
public class BannersController : ControllerBase
{
    // private BannerManager bannerManager;
    private SessionsManager sessionManager;

    public BannersController(SessionsManager sessionManager)
    {
        this.sessionManager = sessionManager;
    }

    [HttpGet("{banner-id}")]
    public async Task<BannerResponse> Get([FromRoute(Name = "banner-id")] Guid bannerId, 
        [FromHeader(Name = "session-id")] Guid sessionId)
    {
        var bannerManager = new BannersManager(sessionId, sessionManager);
        return await bannerManager.Get(bannerId);
    }
    
    [HttpPatch("{banner-id}")]
    public async Task<BannerResponse> Update([FromRoute(Name = "banner-id")] Guid bannerId, 
        [FromBody] BannerPatchRequest request)
    {
        request.Id = bannerId;
        return new BannerResponse()
        {
            Id = Guid.NewGuid(),
            Position = new Point(666, 666),
            Size = new Size(100, 100)
        };
    }

    [HttpPost]
    public async Task<BannerResponse> Create(BannerCreateRequest request, 
        [FromHeader(Name = "session-id")] Guid sessionId)
    {
        var bannerManager = new BannersManager(sessionId, sessionManager);
        var banner = await bannerManager.Create(request);
        return banner;
    }
    
    [HttpGet("session/{session-id}")]
    public async Task<BannersResponse> GetBanners([FromRoute(Name = "session-id")] Guid sessionId)
    {
        var bannerManager = new BannersManager(sessionId, sessionManager);
        return new BannersResponse()
        {
            Banners = sessionManager.GetBanners(sessionId).Values.Select(b => b.ToResponse()).ToList()
        };
    }
    
}