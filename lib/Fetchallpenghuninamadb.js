import { MongoClient } from 'mongodb';
import _ from 'underscore';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function fetchallpenghuninamadb(nama, lowlimit, highlimit) {
try {
    await client.connect()
    const database = client.db('greenbay');
    const penghunitablename = database.collection('penghuni');

    const exists = await penghunitablename.find({nama: nama}).project({nama: 1, 
tempatlahir: 1, tgllahir: 1, noktp: 1, nohp: 1, tower: 1, unit: 1, status: 1, periodsewa: 1,
agen: 1, emergencyhp: 1, pemilikunit: 1}).skip(lowlimit).limit(highlimit).toArray();
 
 if (exists.length > 0) {
      console.log(`Found ${exists.length} documents for nama=${nama}`);
      return exists;
    } else {
      console.log(`No documents found for nama=${nama}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching documents: ${error.message}`);
    throw error;
  }
finally {
   await client.close();
}

}



