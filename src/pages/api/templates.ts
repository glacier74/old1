import { NextApiRequest, NextApiResponse } from 'next'

import { TemplateService } from '~/service/template'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await TemplateService.records())
}
