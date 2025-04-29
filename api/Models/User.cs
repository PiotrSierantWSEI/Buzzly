using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

[Index("email", Name = "users_email_key", IsUnique = true)]
[Index("username", Name = "users_username_key", IsUnique = true)]
public partial class User
{
    [Key]
    public int id { get; set; }

    [StringLength(35)]
    public string username { get; set; } = null!;

    [StringLength(255)]
    public string email { get; set; } = null!;

    public string password_hash { get; set; } = null!;

    [StringLength(20)]
    public string role { get; set; } = null!;

    public DateTime created_at { get; set; }

    public DateTime? last_login_at { get; set; }

    [InverseProperty("performed_byNavigation")]
    public virtual ICollection<Review_log> review_logs { get; set; } = new List<Review_log>();

    [InverseProperty("edited_byNavigation")]
    public virtual ICollection<Review_version> review_versions { get; set; } = new List<Review_version>();

    [InverseProperty("moderated_byNavigation")]
    public virtual ICollection<Review> reviewmoderated_byNavigations { get; set; } = new List<Review>();

    [InverseProperty("user")]
    public virtual ICollection<Review> reviewusers { get; set; } = new List<Review>();
}
