using CrudTask.API.Data;
using CrudTask.API.Interface;
using CrudTask.API.Model;
using Microsoft.EntityFrameworkCore;

namespace CrudTask.API.Repository
{
    public class CustomerRepository : ICustomer
    {
        private readonly CustomerDbContext _dbContext;

        public CustomerRepository(CustomerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //creating a new customer in the db
        public void CreateCustomer(Customer customer)
        {
            _dbContext.Customers.Add(customer);
            _dbContext.SaveChanges();
        }

        //deleting customer
        public void DeleteCustomer(int id)
        {
            var customer = _dbContext.Customers.Find(id);
            if (customer != null)
            {
                if(customer.CustomerType != null)
                {
                    _dbContext.CustomerTypes.Remove(customer.CustomerType);
                }

                _dbContext.Customers.Remove(customer);
                _dbContext.SaveChanges();
            }
        }

        //Fetching All Customers
        public List<Customer> GetAll()
        {
            return _dbContext.Customers.Include(c => c.CustomerType).ToList();
        }

        //Get customer by their Id
        public Customer GetCustomerById(int id)
        {
            return _dbContext.Customers.Include(c => c.CustomerType).FirstOrDefault(x => x.Id == id);
        }

        //Update Customer Record
        public void UpdateCustomer(Customer customer)
        { 
           var existingCustomer = _dbContext.Customers.Include(c => c.CustomerType).FirstOrDefault(x => x.Id == customer.Id);
           
            if (existingCustomer != null)
            {
                existingCustomer.Name = customer.Name;
                existingCustomer.Description = customer.Description;
                existingCustomer.Address = customer.Address;
                existingCustomer.City = customer.City;
                existingCustomer.State = customer.State;
                existingCustomer.Zip = customer.Zip;

                existingCustomer.CustomerType.Name = customer.CustomerType.Name;

                _dbContext.SaveChanges();
            }
        }

    }
}
