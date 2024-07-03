namespace server_project_api;

public class Volunteer
{
    public int id { get; set; }

    public string firstName { get; set; }

    public string lastName { get; set; }
    
    public string email { get; set; }

    public string phone { get; set; }
    
    public bool[] days { get; set; }
}