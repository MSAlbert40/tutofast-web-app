export interface MessageResponse<T> {
  code: number;
  message: string;
  data: T;
  date: Date;
}
