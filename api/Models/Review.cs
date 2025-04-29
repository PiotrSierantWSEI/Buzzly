using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class Review
{
    [Key]
    public int id { get; set; }

    public int product_id { get; set; }

    public int? user_id { get; set; }

    [StringLength(35)]
    public string? author_name { get; set; }

    [StringLength(35)]
    public string? author_surname { get; set; }

    public int rating { get; set; }

    public string content { get; set; } = null!;

    public List<string>? images { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    public int? moderated_by { get; set; }

    public DateTime? moderated_at { get; set; }

    [ForeignKey("moderated_by")]
    [InverseProperty("reviewmoderated_byNavigations")]
    public virtual User? moderated_byNavigation { get; set; }

    [ForeignKey("product_id")]
    [InverseProperty("reviews")]
    public virtual Product product { get; set; } = null!;

    [InverseProperty("review")]
    public virtual ICollection<Review_log> review_logs { get; set; } = new List<Review_log>();

    [InverseProperty("review")]
    public virtual ICollection<Review_version> review_versions { get; set; } = new List<Review_version>();

    [ForeignKey("user_id")]
    [InverseProperty("reviewusers")]
    public virtual User? user { get; set; }
}
