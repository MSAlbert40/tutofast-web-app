import {CourseClass} from './course-class';
import {UserClass} from './user-class';

export interface TutorshipClass {
  id: number;
  topic: string;
  startAt: string;
  endAt: string;
  status: string;
  student: UserClass;
  teacher: UserClass;
  course: CourseClass;
}
