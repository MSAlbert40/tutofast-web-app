import {TutorshipClass} from './tutorship-class';
import {UserClass} from './user-class';

export interface TutorshipDetailClass {
  id: number;
  tutorship: TutorshipClass;
  teacher: UserClass;
}

export interface TutorshipDetailRequest {}
