using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

public static class ProfilePageEndpoints
{
    public static void MapProfilePageEndpoints(this IEndpointRouteBuilder app, List<StandardUser> users, List<Post> posts, Utils utils)
    {
        app.MapGet("/profile", async (ApplicationDbContext context, HttpContext httpContext) =>
        {
            //find the email of the logged in user
            var user = utils.GetAuthorizedEmail(httpContext);

            if (user == null)
            {
                return Results.NotFound();
            }

            //return the user object
            var selectedUser = users.FirstOrDefault(u => u.Email == user);
            return Results.Ok(selectedUser);
        })
        .WithOpenApi()
        .RequireAuthorization();

        app.MapPost("/new_post", (PostDto content, HttpContext httpContext) =>
        {
            var email = utils.GetAuthorizedEmail(httpContext);
            if (email == null)
            {
                return Results.NotFound("invalid authorizing email");
            }
            var post = new Post(content.Content, email);
            posts.Add(post);
            return Results.Ok(post);
        })
        .WithOpenApi()
        .RequireAuthorization();

        app.MapGet("/my_posts", (HttpContext httpContext) =>
        {
            var email = utils.GetAuthorizedEmail(httpContext);
            if (email == null)
            {
                return Results.NotFound("invalid authorizing email");
            }
            var myPosts = posts.Where(p => p.Poster.Equals(email)).ToList();
            if (myPosts == null)
            {
                return Results.NotFound("No posts associated with user");
            }
            return Results.Ok(myPosts);
        });
    }
}