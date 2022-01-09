import * as dayjs from 'dayjs';
import { IPostalAddress } from 'app/entities/postal-address/postal-address.model';
import { IStatus } from 'app/entities/status/status.model';
import { IParty } from 'app/entities/party/party.model';
import { IUser } from 'app/entities/user/user.model';

export interface IPancard {
  id?: number;
  panNumber?: string | null;
  aadhaarNumber?: string | null;
  aadhaarName?: string | null;
  birthDate?: dayjs.Dayjs | null;
  imageUrl?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  postalAddress?: IPostalAddress | null;
  status?: IStatus | null;
  party?: IParty | null;
  modified?: IUser | null;
}

export class Pancard implements IPancard {
  constructor(
    public id?: number,
    public panNumber?: string | null,
    public aadhaarNumber?: string | null,
    public aadhaarName?: string | null,
    public birthDate?: dayjs.Dayjs | null,
    public imageUrl?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public updatedAt?: dayjs.Dayjs | null,
    public postalAddress?: IPostalAddress | null,
    public status?: IStatus | null,
    public party?: IParty | null,
    public modified?: IUser | null
  ) {}
}

export function getPancardIdentifier(pancard: IPancard): number | undefined {
  return pancard.id;
}
