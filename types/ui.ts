export type NavItem = {
  label: string;
  path: string;
};

export type HeaderNavProps = {
  navItems: NavItem[];
};

export type HeaderMobileMenuProps = {
  navItems: NavItem[];
  isAuthenticated: boolean;
};

export type FilterItem = {
  id?: string;
  _id?: string;
  type?: string;
  language?: string;
  grade?: string;
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
};

export type FilterProps = {
  data: FilterItem[];
  type: string;
  savedIds?: string[];
  showSaveButton?: boolean;
};

export type FilterControlsProps = {
  language: string;
  setLanguage: (lang: string) => void;
  grade: string;
  setGrade: (g: string) => void;
};

export type SearchBarProps = {
  search: string;
  setSearch: (search: string) => void;
};

export type ResourceCardItem = {
  id?: string;
  _id?: string;
  type?: string;
  language?: string;
  grade?: string;
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
};

export type ResourceCardProps = {
  item: ResourceCardItem;
  initialSaved?: boolean;
};

export type SaveButtonProps = {
  resourceId: string;
  initialSaved: boolean;
};

export type ResetPasswordPageProps = {
  searchParams?: Promise<{
    token?: string | string[];
    error?: string | string[];
  }>;
};

export type ResetPasswordFormProps = {
  token: string;
  initialError: string;
};

export type ChangePasswordModalProps = {
  open: boolean;
  onClose: () => void;
};

export type DeleteAccountModalProps = {
  open: boolean;
  onClose: () => void;
};
