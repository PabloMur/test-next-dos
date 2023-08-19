import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = generate({ userId: 1234 });
  res.send({ token });
}
