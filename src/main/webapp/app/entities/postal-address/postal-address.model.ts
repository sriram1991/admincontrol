export interface IPostalAddress {
  id?: number;
  toName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  landmark?: string | null;
  postalCode?: string | null;
  isIndianAddress?: boolean | null;
  note?: string | null;
}

export class PostalAddress implements IPostalAddress {
  constructor(
    public id?: number,
    public toName?: string | null,
    public address1?: string | null,
    public address2?: string | null,
    public city?: string | null,
    public landmark?: string | null,
    public postalCode?: string | null,
    public isIndianAddress?: boolean | null,
    public note?: string | null
  ) {
    this.isIndianAddress = this.isIndianAddress ?? false;
  }
}

export function getPostalAddressIdentifier(postalAddress: IPostalAddress): number | undefined {
  return postalAddress.id;
}
