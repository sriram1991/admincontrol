export interface IPartyType {
  id?: number;
  name?: string | null;
  description?: string | null;
}

export class PartyType implements IPartyType {
  constructor(public id?: number, public name?: string | null, public description?: string | null) {}
}

export function getPartyTypeIdentifier(partyType: IPartyType): number | undefined {
  return partyType.id;
}
