import { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "./jwt";
export const authMiddleware = (callback: any) => {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) res.status(401).send({ message: "no hay token" });
    const decodedToken = decode(token);
    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "token incorrecto" });
    }
  };
};
