public class userDto (String username, String email, String password, String firstName, String lastName)
{
    public String UserName { get; set; } = username;
    public String Email { get; set; } = email;
    public String Password { get; set; } = password;
    public String Role { get; set; } = UserRoles.User;
    public String FirstName { get; set; } = firstName;
    public String LastName { get; set; } = lastName;
}