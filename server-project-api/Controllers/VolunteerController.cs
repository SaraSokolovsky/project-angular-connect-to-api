using Microsoft.AspNetCore.Mvc;

namespace server_project_api.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class VolunteerController : ControllerBase
{
    private static Volunteer[] volunteers = new[]
    {
        new Volunteer{id = 1 ,firstName = "Yehuda", lastName = "Choen",email="yc0523@gmail.com",phone="0527521551", days = new bool[6]{true,true,false,true,false,true}},
        new Volunteer{id = 1 ,firstName = "Shimon", lastName = "Levin",email="yc0523@gmail.com",phone="0527521551", days = new bool[6]{true,true,true,true,false,true}},
        new Volunteer{id = 2 ,firstName = "Shalom", lastName  = "Shmueleviz",email="cbj520@gmail.com",phone="0548402516", days = new bool[6]{false,true,true,true,false,true}},
        new Volunteer{id = 3 ,firstName = "Chaim", lastName = "Bloch",email="zxcv5631@gmail.com",phone="0504100258", days = new bool[6]{false,true,false,true,true,true}},
        new Volunteer{id = 4 ,firstName = "Gadi", lastName = "Levi",email="uh7893@gmail.com",phone="0527652014", days = new bool[6]{false,true,false,true,false,true}},
        new Volunteer{id = 5 ,firstName = "Shaul", lastName = "Shulman",email="bos630585@gmail.com",phone="0527174102", days = new bool[6]{false,true,false,false,false,true}},
        new Volunteer{id = 6 ,firstName = "Aharon", lastName = "Zalmenoviz",email="cvbn7410@gmail.com",phone="0583251025", days = new bool[6]{false,true,false,true,true,true}},
        new Volunteer{id = 7 ,firstName = "Avraham", lastName = "Fridman",email="yghj84@gmail.com",phone="0548484452", days = new bool[6]{false,true,false,true,true,true}},
        new Volunteer{id = 8 ,firstName = "Roni", lastName = "Lev",email="dfv95620@gmail.com",phone="0527652025", days = new bool[6]{false,true,true,true,false,true}},
        new Volunteer{id = 9 ,firstName = "Shmuel", lastName = "Zalaznik",email="dr5000@gmail.com",phone="0583235102", days = new bool[6]{true,true,false,true,true,false}},
        new Volunteer{id = 10 ,firstName = "Beni", lastName = "Goldman",email="zxcv987@gmail.com",phone="0533184520", days = new bool[6]{false,true,true,true,true,false}},
    };

    private readonly ILogger<VolunteerController> _logger;

    public VolunteerController(ILogger<VolunteerController> logger)
    {
        _logger = logger;
    }

    
    [HttpGet]
    public Volunteer[] GetAll() => volunteers;

    [HttpGet("{id}")]
    public Volunteer? Get(int id) => volunteers.FirstOrDefault(v => v.id == id);

    [HttpPut("{id}")]
    public ActionResult<Volunteer[]> Update(int id, Volunteer volu)
    {
        if(id < 1 || id > volunteers.Length) {
            return NotFound();
        }
    
        volunteers[id - 1] = volu;
        return Ok(volunteers);
    }

}
