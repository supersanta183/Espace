using DotNetEnv;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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

Env.Load();
//setup authentication
var connectionString = Environment.GetEnvironmentVariable("CONNECTIONSTRING");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 30))));
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


//temporary values, will be replaced by a database
var utils = new Utils();
var users = new List<StandardUser>();
var posts = new List<Post>();

var user = new StandardUser("test", "test", "test", "test");
users.Add(user);

//map endpoints for user authentication
app.MapUserAuthenticationEndpoints(users);

//maps endpoints that handles actions on the users profile page
app.MapProfilePageEndpoints(users, posts, utils);

app.Run();