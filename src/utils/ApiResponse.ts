class ApiResponse<T> {
  statusCode: number;
  data: T;
  success: boolean;
  message: string;

  constructor(statusCode: number, data: T, message = `\n 👍 Success`) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
