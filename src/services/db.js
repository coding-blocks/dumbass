const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {useUnifiedTopology: true})
let db = null

module.exports.dbConnectionReady = client.connect().then(() => db = client.db(process.env.DATABASE_NAME))

module.exports.createOtp = async (payload) => {
  const r = await db.collection('otps').insertOne({
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date()
  })

 return {
    id: r.insertedId,
   revert: () => db.collection('otps').deleteOne({filter: { id: r.insertOne}})
 }
}

module.exports.getOtpById = (id) => db.collection('otps').findOne({
  _id: new ObjectId(id),
  deletedAt: null
})

module.exports.updateOtpById = (id, payload) => db.collection('otps').updateOne({
  _id: new ObjectId(id)
}, { $set: payload })

module.exports.getClientByToken = async(clientToken) => db.collection('clients').findOne({
      token : clientToken.toString()
    })