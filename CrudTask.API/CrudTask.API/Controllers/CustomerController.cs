using CrudTask.API.Interface;
using CrudTask.API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CrudTask.API.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomer _customerService;

        public CustomerController(ICustomer customerService)
        {
            _customerService = customerService;
        }

        //api endpoint to get all customers
        [HttpGet("GetAllCustomers")]
        public IActionResult GetAllCustomers()
        {
            var customers = _customerService.GetAll();
            return Ok(customers);
        }

        // api endpoint to get customer by id
        [HttpGet("GetCustomerById/{id}")]
        public IActionResult GetCustomersById(int id)
        {
            var customer = _customerService.GetCustomerById(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // api end point to create a new customer
        [HttpPost("CreateCustomer")]
        public IActionResult CreateCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest();
            }

            _customerService.CreateCustomer(customer);
            return CreatedAtAction(nameof(GetCustomersById), new { id = customer.Id }, customer);
        }

        // api end point to update a customer
        [HttpPut("UpdateCustomer/{id}")]
        public IActionResult UpdateCustomer(int id, [FromBody] Customer customer)
        {
            //try
            //{
                if (customer == null || id != customer.Id)
                {
                    return BadRequest();
                }

                var existingCustomer = _customerService.GetCustomerById(id);
                if (existingCustomer == null)
                {
                    return NotFound();
                }

                _customerService.UpdateCustomer(customer);
                return Ok();
            //}
            //catch(Exception ex) 
            //{
               // return StatusCode(500, "An error occured while processing your request");
          //  }
        }

        // api end point to delete a customer
        [HttpDelete("DeleteCustomer/{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            var customer = _customerService.GetCustomerById(id);
            if (customer == null)
            {
                return NotFound();
            }

            _customerService.DeleteCustomer(id);
            return Ok();
        }

    }

}
