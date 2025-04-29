using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class Review_log
{
    [Key]
    public int id { get; set; }

    public int review_id { get; set; }

    public int performed_by { get; set; }

    public string? comment { get; set; }

    public DateTime? timestamp { get; set; }

    [ForeignKey("performed_by")]
    [InverseProperty("review_logs")]
    public virtual User performed_byNavigation { get; set; } = null!;

    [ForeignKey("review_id")]
    [InverseProperty("review_logs")]
    public virtual Review review { get; set; } = null!;
}
