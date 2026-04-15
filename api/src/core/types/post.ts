export interface IPost {
  id?: number;
  title: string;
  content: string;
  idUser: number;
  createdAt?: Date;
  updatedAt?: Date;
}
