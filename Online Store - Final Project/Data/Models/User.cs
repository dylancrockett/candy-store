﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Online_Store___Final_Project.Data.Models
{
    [Table("users")]
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
            Useraddresses = new HashSet<Useraddress>();
        }

        [Key]
        [Column("userId")]
        public int UserId { get; set; }
        [Required]
        [Column("userName")]
        [StringLength(45)]
        public string UserName { get; set; }
        [Required]
        [Column("userEmail")]
        [StringLength(45)]
        public string UserEmail { get; set; }
        [Required]
        [Column("userPassword")]
        [StringLength(196)]
        public string UserPassword { get; set; }

        [InverseProperty(nameof(Order.User))]
        public virtual ICollection<Order> Orders { get; set; }
        [InverseProperty(nameof(Useraddress.User))]
        public virtual ICollection<Useraddress> Useraddresses { get; set; }
    }
}