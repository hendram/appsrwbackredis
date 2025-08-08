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

    const escapedUnit = unit.replace(/-/g, '\\-');
    const query = `@tower:{${tower}} @unit:{${escapedUnit}}`;

    const result = await client.ft.search('penghuniIdx', query, {
      SORTBY: {
        BY: 'tower',
        DIRECTION: 'ASC'
      },
      LIMIT: {
        from: lowlimit,
        size: highlimit
      }
    });


    if (result.total > 0) {
      const docs = result.documents.map(doc => {
   const data = doc.value; // Access the actual object
  return _.pick(data, [
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
  ]);
      });

      return docs;
    } else {
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
