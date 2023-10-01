using Adtension.BusinessLogic.Entities;

namespace Adtension.BusinessLogic.Managers;

public class SessionsManager
{
    public SessionsManager()
    {
        this.sessions = new Dictionary<Guid, Session>();
    }

    private Dictionary<Guid, Session> sessions { get; set; }

    public Guid Open()
    {
        var id = Guid.NewGuid();
        sessions.Add(id, new Session());
        return id;
    }

    public Session Get(Guid id) => sessions[id];

    public void Close(Guid id) => sessions.Remove(id);
    
    public Dictionary<Guid, Banner> GetBanners(Guid sessionId)
    {
        return sessions[sessionId].Banners;
    }
}