//import { Auth } from "lib/models/auth";
import { findOrCreateAuth, sendCode } from "lib/controllers/auth";
import type { NextApiRequest, NextApiResponse } from "next";
//import { User } from "lib/models/users";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  //const marce = new Auth("imIOIZh67CiYsKworNNG");
  //await marce.pull();
  //res.send(marce.data);
  const { email } = req.body;
  //const auth = await findOrCreateAuth(email);
  //auth.data.test = "cambio desde el endpoint";
  //await auth.push();
  //res.send(auth.data);
  //const newUser = await User.createNewUser({
  //email,
  //});
  //newUser.data.test = "cambio desde el endpoint";
  //await newUser.push();
  const auth = await sendCode(email);
  res.send(auth);
}
