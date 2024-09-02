using Microsoft.AspNetCore.Identity;

public class StandardUser : IdentityUser, IUser
{
    public new Guid Id { get; set; } = Guid.NewGuid();
    public new String UserName { get; set; }
    public new String Email { get; set; }
    public String Role { get; set; } = UserRoles.User;
    public String FirstName { get; set; }
    public String LastName { get; set; }

    public StandardUser() { }

    public StandardUser(String userName, String email, String firstName, String lastName)
    {
        UserName = userName;
        Email = email;
        FirstName = firstName;
        LastName = lastName;
    }
}