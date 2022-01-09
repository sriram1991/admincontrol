import { IStatusCategory } from 'app/entities/status-category/status-category.model';

export interface IStatus {
  id?: number;
  name?: string | null;
  sequenceNo?: number | null;
  description?: string | null;
  category?: IStatusCategory | null;
}

export class Status implements IStatus {
  constructor(
    public id?: number,
    public name?: string | null,
    public sequenceNo?: number | null,
    public description?: string | null,
    public category?: IStatusCategory | null
  ) {}
}

export function getStatusIdentifier(status: IStatus): number | undefined {
  return status.id;
}
