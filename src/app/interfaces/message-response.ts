export interface MessageResponse<T> {
  code: number;
  message: string;
  data: T;
  date: Date;
}

export interface MessageResponsePage<T> {
  code: number;
  message: string;
  data: Data<T>;
  date: Date;
}

export interface Data<T> {
  content: T;
  pageable: Pageable;
  totalElements: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
}
