export interface IUser {
  id?: number;
  login?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
}

export class User implements IUser {
  constructor(
    public id?: number,
    public login?: string,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date
  ) {}
}

export class IPancard implements IUser {
  constructor(
    public id?: number,
    public email?: string,
    public mobile?: number,
    public panid?: string,
    public aadhaarno?: number,
    public nameasaadhaar?: string,
    public panstatus?: string,
    public dob?: string,
    public address?: string,
    public user?: null
  ) {}
}

export class IUserLogin {
  constructor(public user?: string) {}
}
