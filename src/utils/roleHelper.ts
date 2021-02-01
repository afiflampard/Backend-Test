import User from "../models/User.model";
import Role from "../models/Role.model";
/**
 * to check user is have that role or not
 * @param employee 
 * @param roles 
 */
export const authRole = async (user: User, roles: string[]): Promise<boolean> => {
  const role: Role[] = await Role.findAll({
    where: {
      name: roles
    },
    raw: true
  });
  const roleIds: number[] = role.map((x: Role) => x.id);
  if (roleIds.includes(user.role.id)) return true;
  return false;
};


