using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public required String FirstName { get; set; }
    public required String LastName { get; set; }
}