// src/utils/permissionHelpers.js
export function hasPermission(user, menu, action) {
    if (!user || !user.permissions) return false;
    const permObj = user.permissions.find((p) => p.menu === menu);
    return permObj ? permObj[action] === 1 : false;
  }