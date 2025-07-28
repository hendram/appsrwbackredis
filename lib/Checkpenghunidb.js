import { MongoClient } from 'mongodb';
import _ from 'underscore';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function checkpenghunidb(nama, tempatlahir, tgllahir, noktp, nohp, 
tower, unit, status, periodsewa, agen, emergencyhp, pemilikunit) {
try {
    await client.connect()
    const database = client.db('greenbay');
    const penghunitablename = database.collection('penghuni');
    // Query for a movie that has the title 'Back to the Future'
    const query = {nama: nama, tempatlahir: tempatlahir, tgllahir: tgllahir, noktp: noktp, nohp: nohp, 
tower: tower, unit: unit, status: status, periodsewa: periodsewa, agen: agen, emergencyhp: emergencyhp, 
pemilikunit: pemilikunit };
  
    const exist = await penghunitablename.findOne(query, {nama: 1, tempatlahir: 1, tgllahir: 1,
noktp: 1, nohp: 1, tower: 1, unit: 1, status: 1, periodsewa: 1, agen: 1, emergencyhp: 1, pemilikunit: 1, _id: 0});
    if(exist === null ){
      return "notfind";
    }       
    else {
            return "find";
}
}
finally {
   await client.close();
}

}



