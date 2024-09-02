using Microsoft.AspNetCore.Identity;

public class userDto (String username, String email, String password, String firstName, String lastName) : IdentityUser
{
    public new String UserName { get; set; } = username;
    public new String Email { get; set; } = email;
    public String Password { get; set; } = password;
    public String Role { get; set; } = UserRoles.User;
    public String FirstName { get; set; } = firstName;
    public String LastName { get; set; } = lastName;
}