import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrHasPolicyAccess } from '../access/isAdminOrHasPolicyAccess'

export const Policys: CollectionConfig = {
  slug: 'policys',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    // Only admins can create
    create: isAdmin,
    // Only admins or editors with policy access can read
    read: isAdminOrHasPolicyAccess('id'),
    // Only admins can update
    update: isAdmin,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
