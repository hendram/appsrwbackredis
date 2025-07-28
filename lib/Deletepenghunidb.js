import { MongoClient } from 'mongodb';
 const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function deletepenghunidb(nama, tempatlahir, tgllahir, noktp, nohp, tower, unit, status, periodsewa,
agen, emergencyhp, pemilikunit) {
  
try{
    await client.connect();
       const dbo = client.db("greenbay");
      const penghunitablename = {nama: nama, tempatlahir: tempatlahir, tgllahir: tgllahir, 
noktp: noktp, nohp: nohp, tower: tower, unit: unit, status: status, periodsewa: periodsewa, agen:agen, 
emergencyhp: emergencyhp, pemilikunit: pemilikunit};
      const delpenghunitable = await dbo.collection("penghuni").deleteOne(penghunitablename);
                if(delpenghunitable === null) {
             return "failed to delete penghuni";
             }
           else if(delpenghunitable) {
             return "1deleted";
            }
}
finally{
   await client.close();
}

}

