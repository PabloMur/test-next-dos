import { NextApiRequest, NextApiResponse } from "next";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.send({ ok: TRACE_OUTPUT_VERSION });
}
