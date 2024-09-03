using Microsoft.AspNetCore.Mvc;

public class Post (String content, string email)
{
    public Guid Id {get; set;} = Guid.NewGuid();
    public String Content {get; set;} = content;
    public DateTime PostTime {get;set;} = DateTime.Now;
    public String Poster {get;set;} = email; //email of person who posted
    public int Likes {get;set;} = 0;
    public List<String> Likers {get;set;} = new List<string>(); //list of emails of users that liked the post

    public void AddLike(String email)
    {
        Likers.Add(email);
        Likes++;
    }

    public IResult RemoveLike(String email)
    {
        var result = Likers.FirstOrDefault(p => p.Equals(email));
        if(result == null)
        {
            return Results.NotFound();
        }
        return Results.Ok();
    }
}