declare type User = {
  id: number;
  createdAt: Date;
  name: string;
  avatar: string;
  gender: "male" | "female" | "other";
  email: string;
  city: string;
  address: string;
  birthdate: Date;
};

declare type LanguageKey = "en" | "vi" | "fr";

declare type PaginationMetadata = {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

declare type PaginationData<T> = {
  data: T[];
  pagination: PaginationMetadata;
};

declare type UserResponse = PaginationData<User>;
