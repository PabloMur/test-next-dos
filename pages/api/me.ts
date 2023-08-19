import { authMiddleware } from "lib/middlewares";
import { User } from "lib/models/users";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
  const user = new User(token.userId);
  await user.pull();
  res.send(user.data);
}

export default authMiddleware(handler);
