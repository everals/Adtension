using System.Drawing;
using Adtension.Models;
using Adtension.Models.Requests.Banners;
using Microsoft.AspNetCore.Mvc;

namespace Adtension.Controllers;

[ApiController]
[Route("[controller]")]
public class BannerController : ControllerBase
{
    [HttpGet("{banner-id}")]
    public async Task<BannerResponse> Get([FromRoute(Name = "banner-id")] Guid bannerId)
    {
        return new BannerResponse()
        {
            Id = Guid.NewGuid(),
            Position = new Point(666, 666),
            Size = new Size(100, 100)
        };
    }
    
    [HttpPatch("{banner-id}")]
    public async Task<BannerResponse> Get([FromRoute(Name = "banner-id")] Guid bannerId, 
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
    public async Task<BannerResponse> Create(BannerCreateRequest request)
    {
        return new BannerResponse();
    }
    
    [HttpGet("{session-id}")]
    public async Task<BannersResponse> GetBanners([FromRoute(Name = "session-id")] Guid bannerId)
    {
        return new BannersResponse() { Banners = new List<BannerResponse>() };
    }
    
    
}