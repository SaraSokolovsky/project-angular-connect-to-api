using Microsoft.AspNetCore.Mvc;

namespace server_project_api.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ScheduleController : ControllerBase
{
    private static Schedule mySchedule = new Schedule{idForDay = new int[6]{0,0,0,0,0,0}};

    private readonly ILogger<ScheduleController> _logger;

    public ScheduleController(ILogger<ScheduleController> logger)
    {
        _logger = logger;
    }

    
    [HttpGet]
    public Schedule GetAll() => mySchedule;

    [HttpGet("{id}")]
    public int? Get(int id) {
        if(id > 5){
            return 0;
        }
        return mySchedule.idForDay[id];
    }

    [HttpPut]
    public Schedule Update(Schedule s)
    {
       mySchedule = s;
       return mySchedule;
    }
}