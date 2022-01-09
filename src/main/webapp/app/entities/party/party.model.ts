import * as dayjs from 'dayjs';
import { IUser } from 'app/entities/user/user.model';
import { IPartyType } from 'app/entities/party-type/party-type.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IParty {
  id?: number;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  gender?: Gender | null;
  birthDate?: dayjs.Dayjs | null;
  mobileNumber?: string | null;
  email?: string | null;
  isTemporaryPassword?: boolean | null;
  profileImageUrl?: string | null;
  notes?: string | null;
  user?: IUser | null;
  partyType?: IPartyType | null;
}

export class Party implements IParty {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public middleName?: string | null,
    public lastName?: string | null,
    public gender?: Gender | null,
    public birthDate?: dayjs.Dayjs | null,
    public mobileNumber?: string | null,
    public email?: string | null,
    public isTemporaryPassword?: boolean | null,
    public profileImageUrl?: string | null,
    public notes?: string | null,
    public user?: IUser | null,
    public partyType?: IPartyType | null
  ) {
    this.isTemporaryPassword = this.isTemporaryPassword ?? false;
  }
}

export function getPartyIdentifier(party: IParty): number | undefined {
  return party.id;
}
