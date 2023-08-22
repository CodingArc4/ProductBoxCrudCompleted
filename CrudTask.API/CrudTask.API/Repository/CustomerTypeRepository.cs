using CrudTask.API.Data;
using CrudTask.API.Interface;
using CrudTask.API.Model;

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

        public void CreateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public void DeleteCustomer(int id)
        {
            throw new NotImplementedException();
        }

        public List<Customer> GetAll()
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomerById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
