import { User } from "./user";

export class Comment {
    commentId? : number;
    description: string = '';
    rate?: number;
    author!: User;
    announcementId!: number;
}