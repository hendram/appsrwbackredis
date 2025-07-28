import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function updatepenghunidb(oldnama, oldtempatlahir, oldtgllahir, oldnoktp, oldnohp, oldtower, oldunit, 
oldstatus, oldperiodsewa,
oldagen, oldemergencyhp, oldpemilikunit, nama, tempatlahir, tgllahir, noktp, nohp, tower, unit, status, periodsewa,
agen, emergencyhp, pemilikunit) {
try {
    await client.connect()
    const database = client.db('greenbay');
    const penghunidata = database.collection('penghuni');
    // Query for a movie that has the title 'Back to the Future'
    const query = {nama: oldnama, tempatlahir: oldtempatlahir, tgllahir: oldtgllahir, 
noktp: oldnoktp, nohp: oldnohp, tower: oldtower, unit: oldunit, status: oldstatus, 
periodsewa: oldperiodsewa, agen:oldagen, 
emergencyhp: oldemergencyhp, pemilikunit: oldpemilikunit };
    const updated = {$set: { nama: nama, tempatlahir: tempatlahir, tgllahir: tgllahir, 
noktp: noktp, nohp: nohp, tower: tower, unit: unit, status: status, periodsewa: periodsewa, agen:agen, 
emergencyhp: emergencyhp, pemilikunit: pemilikunit }};
    const exist = await penghunidata.updateOne(query, updated);
    if(exist  === null ){
      return "failedupdate";
    }       
    else if(exist !== null) {
            return "1updated";
}
}
finally{
await client.close();
}

}


