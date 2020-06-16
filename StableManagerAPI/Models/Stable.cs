using System;
using System.ComponentModel.DataAnnotations;

namespace StableManagerAPI.Models
{
    public class Stable
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        [MinLength(5, ErrorMessage = "Name must be minimum 5 characters long.")]
        [MaxLength(16, ErrorMessage = "Name must be maximum 16 characters long")]
        public string Name { get; set; }
        public string Url { get; set; }
        [Required(ErrorMessage = "Width is required")]
        [Range(1, 9, ErrorMessage = "Width must be between 1 and 9.")]
        public int Width { get; set; }
        [Required(ErrorMessage = "Length is required")]
        [Range(1, 9, ErrorMessage = "Length must be between 1 and 9.")]
        public int Length { get; set; }
        public string Type { get; set; }
        public string Bedding { get; set; }
        public DateTime ConstructionDate { get; set; }
        public double Cost { get; set; }
        public double Price { get; set; }
    }
}