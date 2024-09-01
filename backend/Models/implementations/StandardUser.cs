public class StandardUser(String userName, String email, String password, String firstName, String lastName) : IUser
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public String UserName { get; set; } = userName;
    public String Email { get; set; } = email;
    public String Password { get; set; } = password;
    public String Role { get; set; } = UserRoles.User;
    public String FirstName { get; set; } = firstName;
    public String LastName { get; set; } = lastName;
}