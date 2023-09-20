const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
dotenv.config();
app.use(express.json());
app.use(cors());


const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//collections loaded
const usersCollection = client.db("streamlinedDB").collection("users");
const profilesCollection = client.db("streamlinedDB").collection("profiles");
const pendingCollection = client.db("streamlinedDB").collection("pendingapplications");
const approvedCollection = client.db("streamlinedDB").collection("approvedapplications");
const reviewedCollection = client.db("streamlinedDB").collection("reviewed_applications");

//user get,post,delete methods
app.get('/users', async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});

app.post('/users', async (req, res) => {
  const user = req.body;
  const query = { email: user.email }
  const existingUser = await usersCollection.findOne(query);

  if (existingUser) {
    return res.send({ message: 'user already exists' })
  }

  const result = await usersCollection.insertOne(user);
  res.send(result);
});

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }

  const options = {
    // Include only the `title` and `imdb` fields in the returned document
    projection: {
      email: 1, photoURL: 1, isAdmin: 1, createdAt: 1, updatedAt: 1, __v: 1
    },
  };
  const result = await usersCollection.findOne(query, options);
  res.send(result);
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.deleteOne(query);
  res.send(result);
})
//profiles get, add, delete update
app.get('/profiles', async (req, res) => {
  const result = await profilesCollection.find().toArray();
  res.send(result);
});
app.get('/profiles/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }

  const options = {
    // Include only the `title` and `imdb` fields in the returned document
    projection: {
      userId: 1, userEmail: 1, personal_data: 1, identification_data: 1, address_data: 1, createdAt: 1, updatedAt: 1, __v: 1
    },
  };
  const result = await profilesCollection.findOne(query, options);
  res.send(result);
})
app.post('/profiles', async (req, res) => {
  const user = req.body;
  const query = { userEmail: user.userEmail }
  const existingProfile = await profilesCollection.findOne(query);
 
  if (existingProfile) {
    return res.send({ message: 'profile already exists' })
  }
  
  const result = await profilesCollection.insertOne(user);
  res.send(result);
});


// app.post('/profiles', async (req, res) => {
//   const profile = req.body;

//   try {
//     const result = await profilesCollection.insertOne(profile);
//     res.send(result);
//   } catch (error) {
//     if (error.code === 11000 && error.keyPattern.email === 1) {
//       // Duplicate key error, which means a profile with the same email already exists
//       res.status(400).json({ message: 'Profile with this email already exists' });
//     } else {
//       // Handle other errors
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// });

app.put('/profiles/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedProfile = req.body;
  const result = await profilesCollection.replaceOne(filter,updatedProfile );
  res.send(result);
 
})

app.delete('/profiles/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await profilesCollection.deleteOne(query);
  res.send(result);
})

// pending applications get,add,delete
app.get('/pending_applications', async (req, res) => {
  const result = await pendingCollection.find().toArray();
  res.send(result);
});
app.delete('/pending_applications/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = { _id: new ObjectId(id) };
  const result = await pendingCollection.deleteOne(query);
  res.send(result);
})
app.post('/pending_applications', async (req, res) => {
  const pendingdoc = req.body;
  const query = { userEmail: pendingdoc.userEmail }
  const existingProfile = await pendingCollection.findOne(query);
 
  if (existingProfile) {
    return res.send({ message: 'profile update request already sent' })
  }
  
  const result = await pendingCollection.insertOne(pendingdoc);
  res.send(result);
});

app.get('/pending_applications/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = { _id: new ObjectId(id) }

  const options = {
    // Include only the `title` and `imdb` fields in the returned document
    projection: {
      userId: 1, userEmail: 1, personal_data: 1, identification_data: 1, address_data: 1, isApproved: 1, isRejected: 1

    },
  };
  const result = await pendingCollection.findOne(query, options);
  res.send(result);
});


app.patch('/pending_applications/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedProfile = req.body;
  console.log(updatedProfile);
  const updateDoc = {
    $set: {
      status: updatedProfile.status
    },
  };
  const result = await pendingCollection.updateOne(filter, updateDoc);
  res.send(result);
});
// approved docs get, add,delete
app.get('/approved_applications', async (req, res) => {
  const result = await approvedCollection.find().toArray();
  res.send(result);
});
app.delete('/approved_applications/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await approvedCollection.deleteOne(query);
  res.send(result);
})
app.post('/approved_applications', async (req, res) => {
  const approveddoc = req.body;
  const query = { userEmail: approveddoc.userEmail }
  const existingProfile = await approvedCollection.findOne(query);
 
  if (existingProfile) {
    return res.send({ message: 'profile update request already sent' })
  }
  
  const result = await approvedCollection.insertOne(approveddoc);
  res.send(result);
});
app.get('/approved_applications/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }

  const options = {
    // Include only the `title` and `imdb` fields in the returned document
    projection: {
      userId:1,userEmail:1,personal_data:1,identification_data:1,address_data:1,isApproved:1,isRejected:1

    },
  };
  const result = await approvedCollection.findOne(query, options);
  res.send(result);
})
app.patch('/approved_applications/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedProfile = req.body;
  console.log(updatedProfile);
  const updateDoc = {
    $set: {
      status: updatedProfile.status
    },
  };
  const result = await approvedCollection.updateOne(filter, updateDoc);
  res.send(result);
})
// reviewed docs get, add,delete
app.get('/reviewed_applications', async (req, res) => {
  const result = await reviewedCollection.find().toArray();
  res.send(result);
});
app.delete('/reviewed_applications/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await reviewedCollection.deleteOne(query);
  res.send(result);
})
app.post('/reviewed_applications', async (req, res) => {
  const approveddoc = req.body;
  const query = { userEmail: approveddoc.userEmail }
  const existingProfile = await reviewedCollection.findOne(query);
 
  if (existingProfile) {
    return res.send({ message: 'profile update request already sent' })
  }
  
  const result = await reviewedCollection.insertOne(approveddoc);
  res.send(result);
});
app.get('/reviewed_applications/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }

  const options = {
    // Include only the `title` and `imdb` fields in the returned document
    projection: {
      userId:1,userEmail:1,personal_data:1,identification_data:1,address_data:1,isApproved:1,isRejected:1

    },
  };
  const result = await reviewedCollection.findOne(query, options);
  res.send(result);
})
app.patch('/reviewed_applications/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedProfile = req.body;
  console.log(updatedProfile);
  const updateDoc = {
    $set: {
      status: updatedProfile.status
    },
  };
  const result = await reviewedCollection.updateOne(filter, updateDoc);
  res.send(result);
})


client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

app.get("/", (req, res) => {
  res.json("Hello from streamlined server");
});


app.listen(port, () => {
  console.log("Streamline server is running on port: " + port);
});
