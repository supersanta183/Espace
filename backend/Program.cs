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

var users = new List<StandardUser>();

var user = new StandardUser("test", "test", "test", "test");
users.Add(user);

app.MapGet("/profile", async (ApplicationDbContext context, HttpContext httpContext) =>
{
    //find the email of the logged in user
    var user = httpContext.User.Identity?.Name;
    
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

app.Run();