export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}