export const showContentPerRole = (user, permission) => {
  if (user?.is_admin) return true;
  else if (!user?.is_admin && permission) return true;
  else return false;
};

export const isAppAccess = (user) => {
  return user?.is_appAccess;
};
