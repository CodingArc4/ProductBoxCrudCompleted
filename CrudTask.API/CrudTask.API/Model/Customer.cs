using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrudTask.API.Model
{
    public class Customer
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Description { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Address { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string City { get; set; }

        [Column(TypeName = "varchar(2)")]
        public string State { get; set; }

        [Column(TypeName = "varchar(10)")]
        public string Zip { get; set; }

        [Precision(7)]
        public DateTime LastUpdated { get; set; }

        public int CustomerTypeId { get; set; }

        [ForeignKey("CustomerTypeId")]
        public virtual customerType CustomerType { get; set; }
    }
}
