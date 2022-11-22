const allRoles = {
  user: ['getOwnUser', 'getOwnClasses'],
  admin: ['*', 'getUsers', 'manageUsers'], // admin can do anything '*'
  employee: ['getUsers', 'manageUsers'],
};

// give emplyee role access to all user routes
allRoles.employee = allRoles.employee.concat(allRoles.user);

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
