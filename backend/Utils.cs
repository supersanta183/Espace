public class Utils()
{
    public String GetAuthorizedEmail(HttpContext httpContext)
    {
        //find the email of the logged in user
        var user = httpContext.User.Identity?.Name;
        return user;
    }
}