

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

    public class RoleAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var allowedRoles = new List<string>{Constants.Constants.STUDENT, Constants.Constants.ADMIN, Constants.Constants.SUB_ADMIN, Constants.Constants.DISMISSED};

            if (value != null && !allowedRoles.Contains(value.ToString()))
            {
                return new ValidationResult($"The {validationContext.DisplayName} field is not a valid Role.");
            }

            return ValidationResult.Success;
        }
    }

}