export default interface IPostDto {
    Content: String
}

export interface IPost {
    id: string,
    content: string,
    likers: string[],
    likes: number,
    postTime: string,
    poster: string,
}