using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

[Index("name", Name = "product_name_key", IsUnique = true)]
public partial class Product
{
    [Key]
    public int id { get; set; }

    [StringLength(35)]
    public string name { get; set; } = null!;

    public string title { get; set; } = null!;

    [StringLength(35)]
    public string author { get; set; } = null!;

    public string? description { get; set; }

    [Precision(10, 2)]
    public decimal price { get; set; }

    public string? cover_image_url { get; set; }

    public DateTime? created_at { get; set; }

    [InverseProperty("product")]
    public virtual ICollection<Review> reviews { get; set; } = new List<Review>();
}
