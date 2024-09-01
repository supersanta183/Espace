public interface IUser
{
    Guid Id { get; set; }
    String UserName { get; set; }
    String Email { get; set; }
    String Password { get; set; }
    String Role { get; set; }
    String FirstName { get; set; }
    String LastName { get; set; }
}

public static class UserRoles
{
    public const string Admin = "Admin";
    public const string User = "User";
}