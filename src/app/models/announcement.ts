import  {Comment} from './comment';
import  {User} from './user';

export class Announcement {
    annoucementId?: number;
    annoucementName: string = '';
    annoucementDescription: string = '';
    tags?: string;
    comments?: Comment[];
    author?: User;
}