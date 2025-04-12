import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TProductBooks } from "./productManagment.type";

type TError = {
  data: {
    message: string;
    status: boolean;
    statusCode: number;
  };
  stack: string;
};

export type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  message: string;
  status: boolean;
  result: string;
};

export type TProductBooksResponse = {
  result: TProductBooks[];
  meta: TMeta;
};

export type TSingleProductResponse = {
  data: TProductBooks;
  meta?: TMeta;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
  category: string;
  value: boolean | React.Key;
};
export type TUpdateProductPayload = {
  id: string;
  data: Partial<TProductBooks>;
};
