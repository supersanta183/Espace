var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()  // Allow all origins
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

var users = new List<StandardUser>();

var user = new StandardUser("test", "test", "test", "test", "test");
users.Add(user);

app.MapGet("/users", () => 
{
    return Results.Ok(users);
})
.WithName("GetUsers")
.WithOpenApi();

app.MapPost("/register", (userDto user) => 
{
    var newUser = new StandardUser(user.UserName, user.Email, user.Password, user.FirstName, user.LastName);
    users.Add(newUser);
    return Results.Ok(newUser);
}).WithOpenApi();

app.MapPost("/login", (LoginCredentials credentials) => 
{
    //TODO add session tokens
    var foundUser = users.FirstOrDefault(u => u.Email == credentials.Email && u.Password == credentials.Password);
    if (foundUser == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(foundUser);
}).WithOpenApi();

app.Run();