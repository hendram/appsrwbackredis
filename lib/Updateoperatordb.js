import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function updateoperatordb(operatorname, password, invitecode) {
try {
    await client.connect()
    const database = client.db('greenbay');
    const operatordata = database.collection('operator');
    // Query for a movie that has the title 'Back to the Future'
    const query = {operatorname: operatorname, invitecode: invitecode };
    const updated = {$set: { operatorname: operatorname, password: password, invitecode: invitecode }};
    const exist = await operatordata.updateOne(query, updated);
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


