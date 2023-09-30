using System.Drawing;
using Adtension.Models;
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
}