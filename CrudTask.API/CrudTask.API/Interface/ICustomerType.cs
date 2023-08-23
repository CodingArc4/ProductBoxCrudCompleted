using CrudTask.API.Model;

namespace CrudTask.API.Interface
{
    public interface ICustomerType
    {
        List<customerType> GetAll();
        customerType GetCustomerTypeById(int id);
        void CreateCustomerType(customerType customer);

    }
}
