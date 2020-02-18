const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.MONGODB_URI, {useUnifiedTopology: true})
let db = null

module.exports.dbConnectionReady = client.connect().then(() => db = client.db(process.env.DATABASE_NAME))

module.exports.createOtp = async (payload) => {
  const r = await db.collection('otps').insertOne({
    ...payload,
    updatedAt: new Date()
  })

 return {
    id: r.insertedId,
   revert: () => db.collection('otps').deleteOne({filter: { id: r.insertOne}})
 }
}