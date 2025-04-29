namespace api.Models
{
    public class ErrorDetails
    {
        public bool Error { get; set; } = true;
        public int Status { get; set; }
        public string Message { get; set; } = null!;
    }
}