var bcrypt = require("bcryptjs");
interface IComparePassword {
  (password: string, hash: string): Promise<boolean>;
}
export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt) as string;
  return hash;
};

export const comparePassword: IComparePassword = async (password, hash) => {
  const similar = (await bcrypt.compare(password, hash)) as boolean;
  return similar;
};
