export interface IPancard {
  id?: number;
  email?: string;
  mobile?: number;
  panid?: string;
  aadhaarno?: number;
  nameasaadhaar?: string;
  pancardupload?: string;
  panstatus?: string;
  dob?: Date;
  address?: string;
  createdBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
  user?: null;
}

export class Pancard implements IPancard {
  constructor(
    public id?: number,
    public email?: string,
    public mobile?: number,
    public panid?: string,
    public aadhaarno?: number,
    public nameasaadhaar?: string,
    public pancardupload?: string,
    public panstatus?: string,
    public dob?: Date,
    public address?: string,
    public createdBy?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public user?: null
  ) {}
}

export class IUserLogin {
  constructor(public user?: string) {}
}
