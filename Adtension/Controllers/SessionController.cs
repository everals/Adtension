using Adtension.BusinessLogic.Managers;
using Microsoft.AspNetCore.Mvc;

namespace Adtension.Controllers;

[ApiController]
[Route("[controller]")]
public class SessionController: ControllerBase
{
    private SessionsManager manager;

    public SessionController(SessionsManager manager)
    {
        this.manager = manager;
    }

    [HttpPost]
    public async Task<Guid> Create()
    {
        return manager.Open();
    }

    [HttpDelete("{session-id}/close")]
    public async Task<ActionResult> Close([FromRoute(Name = "session-id")] Guid sessionId)
    {
        manager.Close(sessionId);
        return Ok();
    }
}