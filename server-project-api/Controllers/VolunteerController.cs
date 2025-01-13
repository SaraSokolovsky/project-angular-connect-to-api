using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server_project_api.Data;
using server_project_api.Models;
using System.Linq;
using System.Threading.Tasks;

namespace server_project_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VolunteerController : ControllerBase
    {
        private readonly ILogger<VolunteerController> _logger;
        private readonly ApplicationDbContext _context;

        public VolunteerController(ILogger<VolunteerController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // Get all volunteers
        [HttpGet]
        public async Task<ActionResult<Volunteer[]>> GetAll()
        {
            var volunteers = await _context.Volunteers.ToArrayAsync();
            return Ok(volunteers);
        }

        // Get a specific volunteer by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Volunteer>> Get(int id)
        {
            var volunteer = await _context.Volunteers.FindAsync(id);

            if (volunteer == null)
            {
                return NotFound();
            }

            return Ok(volunteer);
        }

        // Add a new volunteer
        [HttpPost]
        public async Task<ActionResult<Volunteer>> Create(Volunteer volunteer)
        {
            _context.Volunteers.Add(volunteer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = volunteer.Id }, volunteer);
        }

        // Update an existing volunteer
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Volunteer volunteer)
        {
            if (id != volunteer.Id)
            {
                return BadRequest();
            }

            _context.Entry(volunteer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Volunteers.Any(v => v.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Delete a volunteer
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var volunteer = await _context.Volunteers.FindAsync(id);

            if (volunteer == null)
            {
                return NotFound();
            }

            _context.Volunteers.Remove(volunteer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
