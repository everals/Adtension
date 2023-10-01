using Adtension.BusinessLogic.Extansions;
using Adtension.BusinessLogic.Managers;
using Adtension.BusinessLogic.Models.Requests.Sessions;
using Adtension.BusinessLogic.Models.Responses.Sessions;
using Microsoft.AspNetCore.Mvc;

namespace Adtension.Controllers;

[ApiController]
[Route("[controller]")]
public class SessionsController: ControllerBase
{
    private SessionsManager manager;

    public SessionsController(SessionsManager manager)
    {
        this.manager = manager;
    }

    [HttpGet("{session-id}/anal")]
    public async Task<AnalResponse> GetAnal([FromRoute(Name = "session-id")] Guid sessionId)
    {
        return manager.GetAnal(sessionId).ToResponse();
    }

    [HttpPost("{session-id}/anal")]
    public async Task<ActionResult> SaveAnal(AnalSaveRequest request, [FromRoute(Name = "session-id")] Guid sessionId)
    {
        manager.SaveAnal(sessionId, request.ToModel());
        return Ok();
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