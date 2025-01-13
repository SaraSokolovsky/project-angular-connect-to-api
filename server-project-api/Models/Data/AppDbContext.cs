using Microsoft.EntityFrameworkCore;
using server_project_api.Models;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    public DbSet<server_project_api.Models.System> SystemModels { get; set; }
    public DbSet<Volunteer> Volunteers { get; set; }
}
