using Adtension.BusinessLogic.Entities;
using Microsoft.EntityFrameworkCore;

namespace Adtension.BusinessLogic.Models.Database;

public class DBContext : DbContext
{
    public DbSet<Banner> Banners { get; set; }
    
}