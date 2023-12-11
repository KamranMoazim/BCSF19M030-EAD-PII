

using System.ComponentModel.DataAnnotations;

namespace Backend.Utils
{

    public class DepartmentAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var allowedDepartments = Constants.Constants.AllDepartements;

            if (value != null && !allowedDepartments.Contains(value.ToString()))
            {
                return new ValidationResult($"The {validationContext.DisplayName} field is not a valid department.");
            }

            return ValidationResult.Success;
        }
    }

    public class DegreeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var allowedInterests = Constants.Constants.AllDegrees;

            if (value != null && !allowedInterests.Contains(value.ToString()))
            {
                return new ValidationResult($"The {validationContext.DisplayName} field is not a valid degree.");
            }

            return ValidationResult.Success;
        }
    }

}