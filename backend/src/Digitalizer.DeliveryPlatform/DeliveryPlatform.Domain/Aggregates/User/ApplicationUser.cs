using Microsoft.AspNetCore.Identity;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
public class ApplicationUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
