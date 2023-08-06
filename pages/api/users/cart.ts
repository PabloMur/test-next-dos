import { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const user = {
    email: "",
    id: "",
    cart: ["1234"],
  };

  const cart = user.cart;
  cart.push(req.body.id);
  res.send(user);
}
