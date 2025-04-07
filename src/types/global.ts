type TError = {
  data: {
    message: string;
    status: number;
    statusCode: boolean;
  }
  stack: string;
}

export type TResponse = {
  data?: any;
  error?: TError;
}