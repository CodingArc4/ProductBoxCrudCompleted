using CrudTask.API.Data;
using CrudTask.API.Interface;
using CrudTask.API.Model;
using Microsoft.EntityFrameworkCore;

namespace CrudTask.API.Repository
{
    //NOT WORKING ON THIS REPOSITORY!
    public class CustomerTypeRepository : ICustomerType
    {
        private readonly CustomerDbContext _dbContext;

        public CustomerTypeRepository(CustomerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateCustomerType(customerType customer)
        {
            _dbContext.CustomerTypes.Add(customer);
            _dbContext.SaveChanges();
        }

        public List<customerType> GetAll()
        {
            return _dbContext.CustomerTypes.ToList();
        }

        public customerType GetCustomerTypeById(int id)
        {
            return _dbContext.CustomerTypes.FirstOrDefault(x => x.TypeId == id);
        }
    }
}
