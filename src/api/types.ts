interface ILoginData {
  token: string;
  organizations: {
    id: string;
    name: string;
    users: {
      id: string;
      name: string;
      surname: string;
      email: string;
    }[];
  }[];
}

export interface LoginResponse {
  login: ILoginData;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface GetTreeResponse {
  modelTreeClasses: {
    searched: string;
    tree: ITree[];
  };
}

interface IClass {
  id: string;
  name: string;
  description: string;
  sort: number;
  standard: boolean;
  code: boolean;
}

export interface IChildren {
  id: string;
  name: string;
  description: string;
  children: IChildren[];
}

export interface ITree extends IChildren {
  sort: number;
  classTypes: IClass[];
}
