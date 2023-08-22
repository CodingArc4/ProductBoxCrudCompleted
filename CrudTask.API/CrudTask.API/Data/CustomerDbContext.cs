using CrudTask.API.Model;
using Microsoft.EntityFrameworkCore;

namespace CrudTask.API.Data
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<customerType> CustomerTypes { get; set; }
    }
}
