import { sendCode } from "lib/controllers/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const result = await sendCode(email);
  res.send(result);
}
