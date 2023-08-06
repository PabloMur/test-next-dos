import { NextApiRequest, NextApiResponse } from "next";
import { getOffsetLimit, getLista } from "lib/request";
import { airtableBase } from "lib/airtable";
import { productsIndex } from "lib/algolia";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed"); // Método no permitido
  }

  const lista = getLista();
  const { limit, offset } = getOffsetLimit(req, 100, lista.length);
  const slicedList = lista.slice(offset, offset + limit);

  airtableBase("Furniture")
    .select({
      pageSize: 5,
      view: "All furniture",
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        const objects = records.map((r) => {
          return {
            objectID: r.id,
            ...r.fields,
          };
        });

        await productsIndex.saveObjects(objects);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        res.send({ ok: true });
      }
    );
}
