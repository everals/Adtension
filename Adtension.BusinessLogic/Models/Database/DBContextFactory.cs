using Microsoft.EntityFrameworkCore.Design;

namespace Adtension.BusinessLogic.Models.Database;

public class DBContextFactory : IDesignTimeDbContextFactory<DBContext>
{
    public DBContext CreateDbContext(string[] args)
    {
        throw new NotImplementedException();
    }
}