using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CrudTask.API.Model
{
    public class customerType
    {
        [Key]
        public int TypeId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }
    }
}
