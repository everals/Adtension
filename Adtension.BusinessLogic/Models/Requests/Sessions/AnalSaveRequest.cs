namespace Adtension.BusinessLogic.Models.Requests.Sessions;

public class AnalSaveRequest
{
    public long Balance { get; set; }
    public int MaxUsers { get; set; }
    public string Domain { get; set; }
}