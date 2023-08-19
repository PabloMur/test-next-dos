import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "lib/models/auth";
import { generate } from "lib/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;
  const auth = await Auth.findByEmailAndCode(email, code);
  if (!auth) {
    res.status(401).send({
      message: " Email or auth invalid",
    });
  }
  const expires = auth?.isCodeExpired();
  if (expires) {
    res.status(401).send({
      message: "The code is expired",
    });
  }
  const token = generate({ userId: auth?.data.userId });
  res.send({ token });
}
