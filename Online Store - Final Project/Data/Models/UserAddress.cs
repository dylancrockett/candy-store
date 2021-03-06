// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Online_Store___Final_Project.Data.Models
{
    [Table("useraddresses")]
    [Index(nameof(StateId), Name = "fk_userAddresses_states1_idx")]
    [Index(nameof(UserId), Name = "fk_userAddressses_users1_idx")]
    public partial class Useraddress
    {
        public Useraddress()
        {
            Orders = new HashSet<Order>();
        }

        [Key]
        [Column("userAddressId")]
        public int UserAddressId { get; set; }
        [Column("userId")]
        public int UserId { get; set; }
        [Required]
        [Column("address")]
        [StringLength(100)]
        public string Address { get; set; }
        [Required]
        [Column("city")]
        [StringLength(100)]
        public string City { get; set; }
        [Column("stateId")]
        public int StateId { get; set; }

        [ForeignKey(nameof(StateId))]
        [InverseProperty("Useraddresses")]
        public virtual State State { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("Useraddresses")]
        public virtual User User { get; set; }
        [InverseProperty(nameof(Order.UserAddress))]
        public virtual ICollection<Order> Orders { get; set; }
    }
}