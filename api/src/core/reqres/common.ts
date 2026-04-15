export interface ICommon<T> {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data: T;
  support: {
    url: string;
    text: string;
  };
  _meta: {};
}
