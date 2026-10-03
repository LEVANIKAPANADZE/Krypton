export type AuthFieldName = "name" | "email" | "password";
export type AuthInputType = "text" | "email" | "password";

export type AuthInputConfig<T extends AuthFieldName = AuthFieldName> = {
  placeholder: string;
  inputName: T;
  type: AuthInputType;
  icon: string;
};

export type AuthFormErrors<T extends AuthFieldName = AuthFieldName> = Partial<
  Record<T, string>
>;

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};
