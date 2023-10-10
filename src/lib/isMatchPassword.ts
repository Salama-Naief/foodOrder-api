import bcrypt from "bcryptjs";
export const isMatchPassword = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, userPassword);
};
