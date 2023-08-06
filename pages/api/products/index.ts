import { NextApiRequest, NextApiResponse } from "next";
import { getOffsetLimit, getLista } from "lib/request";
import { productsIndex } from "lib/algolia";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getOffsetLimit(req);
    const results = await productsIndex.search(req.query.search as string, {
      hitsPerPage: limit,
      page: offset > 1 ? Math.floor(offset / limit) : 0,
    });

    res.send({
      results: results.hits,
      pagination: {
        offset,
        limit,
        total: results.nbHits,
      },
    });
  },
});