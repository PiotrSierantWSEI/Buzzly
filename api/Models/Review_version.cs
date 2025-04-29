using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class Review_version
{
    [Key]
    public int id { get; set; }

    public int review_id { get; set; }

    public string content { get; set; } = null!;

    public DateTime? edited_at { get; set; }

    public int? edited_by { get; set; }

    [ForeignKey("edited_by")]
    [InverseProperty("review_versions")]
    public virtual User? edited_byNavigation { get; set; }

    [ForeignKey("review_id")]
    [InverseProperty("review_versions")]
    public virtual Review review { get; set; } = null!;
}
