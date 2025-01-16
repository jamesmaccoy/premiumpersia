import { CollectionConfig } from 'payload/types'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Policys: CollectionConfig = {
  slug: 'policys',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    // Only admins can create
    create: authenticated,
    // Only admins or editors with policy access can read
    read: anyone,
    // Only admins can update
    update: authenticated,
    // Only admins can delete
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
