import { createClient } from 'redis';
import _ from 'underscore';

const client = createClient({
  url: process.env.REDIS_URL
});

export default async function fetchallpenghuniunitdb(tower, unit, lowlimit, highlimit) {
  try {
    if (!client.isOpen) {
      await client.connect();
    }

    const pattern = 'penghuni:*';
    const iterator = client.scanIterator({ MATCH: pattern });
    const results = [];

    for await (const key of iterator) {
      const record = await client.json.get(key, { path: '$' });
      const data = Array.isArray(record) ? record[0] : record;

      if (
        data &&
        data.tower === tower &&
        data.unit?.toLowerCase() === unit.toLowerCase()
      ) {
        results.push(_.pick(data, [
          'nama',
          'tempatlahir',
          'tgllahir',
          'noktp',
          'nohp',
          'tower',
          'unit',
          'status',
          'periodsewa',
          'agen',
          'emergencyhp',
          'pemilikunit'
        ]));
      }
    }

    const sliced = results.slice(lowlimit, lowlimit + highlimit);

    if (sliced.length > 0) {
      console.log(`Found ${sliced.length} documents for unit=${unit}`);
      return sliced;
    } else {
      console.log(`No documents found for unit=${unit}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching penghuni by tower/unit: ${error.message}`);
    throw error;
  } finally {
    if (client.isOpen) {
      await client.quit();
    }
  }
}
