import { NextApiRequest, NextApiResponse } from "next";
import { adminLogin } from "@/components/util/connectDb";
interface user {
  userName: string;
  password: string;
}
const AdminLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userName, password } = req.body.user;
  const response = await adminLogin(userName);
  const result = await response.json();
  console.log(result);
};
export default AdminLogin;
