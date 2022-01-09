export interface IStatusCategory {
  id?: number;
  name?: string | null;
  description?: string | null;
}

export class StatusCategory implements IStatusCategory {
  constructor(public id?: number, public name?: string | null, public description?: string | null) {}
}

export function getStatusCategoryIdentifier(statusCategory: IStatusCategory): number | undefined {
  return statusCategory.id;
}
