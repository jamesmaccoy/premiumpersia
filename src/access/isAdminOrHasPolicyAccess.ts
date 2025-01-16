import { Access } from 'payload/config'

export const isAdminOrHasPolicyAccess =
  (policyIDFieldName: string = 'policy'): Access =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (user) {
      // If user has role of 'admin'
      if (user.roles.includes('admin')) return true

      // If user has role of 'editor' and has access to a policy,
      // return a query constraint to restrict the documents this user can edit
      // to only those that are assigned to a policy, or have no policy assigned
      if (user.roles.includes('editor') && user.policys?.length > 0) {
        // Otherwise, we can restrict it based on the `policy` field
        return {
          or: [
            {
              [policyIDFieldName]: {
                in: user.policys,
              },
            },
            {
              [policyIDFieldName]: {
                exists: false,
              },
            },
          ],
        }
      }
    }

    // Reject everyone else
    return false
  }
