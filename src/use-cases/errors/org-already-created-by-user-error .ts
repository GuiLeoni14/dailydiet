export class OrgAlreadyCreatedByUserError extends Error {
  constructor() {
    super('Org already created by user.')
  }
}
