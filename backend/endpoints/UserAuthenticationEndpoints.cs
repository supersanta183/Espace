using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public static class UserAuthenticationEndpoints
{
    public static void MapUserAuthenticationEndpoints(this IEndpointRouteBuilder app, List<StandardUser> users)
    {
        // Add a new user using identity and to the list of users
        app.MapPost("/register_user", async (UserManager<IdentityUser> userManager, userDto model) =>
        {
            var credentials = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await userManager.CreateAsync(credentials, model.Password);

            if (result.Succeeded)
            {
                var user = new StandardUser(model.UserName, model.Email, model.FirstName, model.LastName);
                users.Add(user);
                return Results.Ok("User registered successfully");
            }

            return Results.BadRequest(result.Errors);
        });

        app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager,
            [FromBody] object empty) =>
        {
            if (empty != null)
            {
                await signInManager.SignOutAsync();
                return Results.Ok();
            }
            return Results.Unauthorized();
        })
        .WithOpenApi()
        .RequireAuthorization();

    }
}