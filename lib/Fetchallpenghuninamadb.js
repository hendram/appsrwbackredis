import { createClient } from 'redis';
import _ from 'underscore';

const client = createClient({
  url: process.env.REDIS_URL
});


export default async function fetchallpenghuninamadb(nama, lowlimit = 0, highlimit = 10) {
  try {
    if (!client.isOpen) {
      await client.connect();
    }

    const searchQuery = `@nama:"${nama}"`;

    const result = await client.ft.search('penghuniIdx', searchQuery, {
      RETURN: ['$'],
      DIALECT: 3,             // ✅ required for JSON search
      LIMIT: { from: lowlimit, size: highlimit },
      SORTBY: { BY: 'nama', DIRECTION: 'ASC' },
    });

    if (result.total === 0) {
      return null;
    }

const docs = result.documents.map(doc => {
  const data = doc.value[0]; // Access the actual object
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


  } catch (error) {
    console.error(`Error fetching penghuni by nama: ${error.message}`);
    throw error;
  } finally {
    if (client.isOpen) {
      await client.quit();
    }
  }
}
