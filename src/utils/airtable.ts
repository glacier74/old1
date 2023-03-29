import $Airtable from 'airtable'

export class Airtable {
  private readonly airtable: $Airtable

  constructor(apiKey: string) {
    this.airtable = new $Airtable({
      apiKey
    })
  }

  async records<T>(baseId: string, tableId: string, page = 1, limit = 10): Promise<T[]> {
    const result = await this.airtable
      .base(baseId)
      .table(tableId)
      .select({
        pageSize: limit,
        offset: (page - 1) * limit
      })
      .all()

    return result.map(
      r =>
        ({
          id: r.getId(),
          ...r.fields
        } as T)
    )
  }
}
