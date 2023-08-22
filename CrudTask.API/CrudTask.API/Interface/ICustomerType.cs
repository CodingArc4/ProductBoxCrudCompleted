using CrudTask.API.Model;

namespace CrudTask.API.Interface
{
    public interface ICustomerType
    {
        List<Customer> GetAll();
        Customer GetCustomerById(int id);
        void CreateCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomer(int id);
    }
}
