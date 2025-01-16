import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrHasPolicyAccessOrPublished } from '../access/isAdminHasPolicyAccessOrPublished';
import { isAdminOrHasPolicyAccess } from '../access/isAdminOrHasPolicyAccess';
import { isLoggedIn } from '../access/isLoggedIn';

export const Pockets: CollectionConfig = {
  slug: 'pockets',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    // Anyone logged in can create
    create: isLoggedIn,
    // Only admins or editors with Policy access can update
    update: isAdminOrHasPolicyAccess(),
    // Admins or editors with Policy access can read,
    // otherwise users not logged in can only read published
    read: isAdminOrHasPolicyAccessOrPublished,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'policy',
      type: 'relationship',
      relationTo: 'policys',
      required: true,
      // If user is not admin, set the Policy by default
      // to the first Policy that they have access to
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.policys?.[0]) {
          return user.policys[0];
        }
      }
    }
  ],
}