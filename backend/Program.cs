using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000")  // Allow specific origin
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());  // Allow credentials
});

//setup authentication
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseInMemoryDatabase("AppDb"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>(options =>
{
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// mapping identity endpoints (for authentication)
app.MapIdentityApi<IdentityUser>();

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

var utils = new Utils();
var users = new List<StandardUser>();
var posts = new List<Post>();

var user = new StandardUser("test", "test", "test", "test");
users.Add(user);

//get user profile associated with the credentials
app.MapGet("/profile", async (ApplicationDbContext context, HttpContext httpContext) =>
{
    //find the email of the logged in user
    var user = utils.GetAuthorizedEmail(httpContext);
    
     if(user == null)
    {
        return Results.NotFound();
    }

    //return the user object
    var selectedUser = users.FirstOrDefault(u => u.Email == user);
    return Results.Ok(selectedUser);
})
.WithOpenApi()
.RequireAuthorization();

// Add a new user using identity and to the list of users
app.MapPost("/add_user", async (UserManager<IdentityUser> userManager, userDto model) =>
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


//logout
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


//add a new post on own profile
app.MapPost("/new_post", (PostDto content, HttpContext httpContext) => 
{
    var email = utils.GetAuthorizedEmail(httpContext);
    if(email == null)
    {
        return Results.NotFound("invalid authorizing email");
    }
    var post = new Post(content.Content, email);
    posts.Add(post);
    return Results.Ok(post);
})
.WithOpenApi()
.RequireAuthorization();

//get all posts on own profile
app.MapGet("/my_posts", (HttpContext httpContext) => 
{
    var email = utils.GetAuthorizedEmail(httpContext);
    Console.WriteLine("email" + email);
    if(email == null)
    {
        return Results.NotFound("invalid authorizing email");
    }
    var myPosts = posts.Where(p => p.Poster.Equals(email)).ToList();
    if(myPosts == null) 
    {
        return Results.NotFound("No posts associated with user");
    }
    return Results.Ok(myPosts);
});

app.Run();