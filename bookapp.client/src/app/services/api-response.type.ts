export type ApiResponse<T> = {
  isSucceeded: boolean;
  message: string;
  data?: T;
}
