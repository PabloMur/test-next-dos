import { NextApiRequest } from "next";

export function getOffsetLimit(
  req: NextApiRequest,
  maxLimit = 100,
  maxOffeset = 10000
) {
  const queryLimit = parseInt((req.query.limit as string) || "0");
  const queryOffset = parseInt((req.query.offset as string) || "0");

  let limit = 10;
  if (queryLimit > 0 && queryLimit < maxLimit) {
    limit = queryLimit;
  } else if (queryLimit > maxLimit) {
    limit = maxLimit;
  }

  const offset = queryOffset < maxOffeset ? queryOffset : 0;
  return { limit, offset };
}

export function getLista() {
  const lista = Array.from(Array(100).keys());
  return lista.map((valor) => {
    return { nombre: valor };
  });
}
