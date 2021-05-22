let express = require("express");
const bodyParser = require("body-parser");
let app = express();
app.use(bodyParser());
const mongoose = require("mongoose");

const url = "mongodb+srv://karthik:karthik@cluster0.grsew.mongodb.net/Edyoda?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;
db.once("open", _ => {
  console.log("Database connected:", url);
});
db.on("error", err => {
  console.error("connection error:", err);
});

/////CORS
const cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "*"
};
app.use(cors(corsOptions));
const userCollection = db.collection("User");
const UserModel = require("./models/users");

app.listen(3000, function() {
  console.log("listening on 3000");
});

//INSERT
app.post("/addUser", (req, res) => {
  userCollection
    .insertOne(
      new UserModel({
        _id: req.body["_id"],
        fullName: req.body["firstname"],
        userName: req.body["lastname"],
        phNum: req.body["phNum"],
        password: req.body["password"],
        videos_watched: req.body["videos_watched"],
        subscribed: req.body["subscribed"]
      })
    )
    .then(result => {
      res.send("Inserted User with id: " + req.body["_id"]);
      return result;
    })
    .catch(err => {
      res.send("Error in User Insertion id: " + req.body["_id"] + "\n" + err);
    });
});

//UPDATE USER
app.put("/updateUser/:_id", (req, res) => {
  userCollection
    .findOneAndUpdate(
      {
        _id: req.params._id // search query
      },
      {
        $set: {
          fullName: req.body["firstname"], // field:values to update
          userName: req.body["lastname"],
          phNum: req.body["phNum"],
          password: req.body["password"],
          videos_watched: req.body["videos_watched"],
          subscribed: req.body["subscribed"]
        }
      },
      {
        new: true,
        runValidators: true
      }
    )
    .then(doc => {
      res.send("Updated User with id: " + req.params._id);
      return doc;
    })
    .catch(err => {
      res.send("Error in User Updating id: " + req.params._id + "\n" + err);
    });
});

//DELETE A USER
app.delete("/deleteUser/:_id", (req, res) => {
  userCollection
    .findOneAndDelete({
      _id: req.params._id
    })
    .then(response => {
      res.send("Deleted User with id: " + req.params._id);
    })
    .catch(err => {
      res.send("Error in User Deletion id: " + req.params._id + "\n" + err);
    });
});

//FIND ALL USERS
app.get("/findAllUsers", (req, res) => {
  const docs = userCollection.find().toArray(function(err, data) {
    res.send(data);
  });
});

//FIND USER BY ID
app.get("/findAllUsers/:_id", (req, res) => {
  userCollection
    .findOne({ _id: req.params._id })
    .then(data => res.send(data), err => res.send(err));
});

///////////////////Videos\\\\\\\\\\\\\\\\\\\\\\\\\
const VideoModel = require("./models/videos");
const VideoCollection = db.collection("Videos");

//INSERT VIDEO
app.post("/addVideo", (req, res) => {
  VideoCollection.insertOne(
    new VideoModel({
      _id: req.body["_id"],
      title: req.body["title"],
      description: req.body["description"],
      duration: req.body["duration"],
      video_url: req.body["video_url"],
      thumbnail_url: req.body["thumbnail_url"],
      likes: req.body["likes"],
      views: req.body["views"]
    })
  )
    .then(result => {
      res.send("Inserted Video with id: " + req.body["_id"]);
      return result;
    })
    .catch(err => {
      res.send("Error in Video Insertion id: " + req.body["_id"] + "\n" + err);
    });
});

//UPDATE VIDEO
app.put("/updateVideo/:_id", (req, res) => {
  VideoCollection.findOneAndUpdate(
    {
      _id: req.params._id // search query
    },
    {
      $set: {
        title: req.body["title"],
        description: req.body["description"],
        duration: req.body["duration"],
        video_url: req.body["video_url"],
        thumbnail_url: req.body["thumbnail_url"],
        likes: req.body["likes"],
        views: req.body["views"]
      }
    },
    {
      new: true,
      runValidators: true
    }
  )
    .then(doc => {
      res.send("Updated Video with id: " + req.params._id);
      return doc;
    })
    .catch(err => {
      res.send("Error in Video Updating id: " + req.params._id + "\n" + err);
    });
});

//DELETE A VIDEO
app.delete("/deleteVideo/:_id", (req, res) => {
  VideoCollection.findOneAndDelete({
    _id: req.params._id
  })
    .then(response => {
      res.send("Deleted Video with id: " + req.params._id);
    })
    .catch(err => {
      res.send("Error in Video Deletion id: " + req.params._id + "\n" + err);
    });
});

//FIND ALL VIDEOS
app.get("/findAllVideos", (req, res) => {
  const docs = VideoCollection.find().toArray(function(err, data) {
    res.send(data);
  });
});

//FIND VIDEO BY ID
app.get("/findAllVideos/:_id", (req, res) => {
  VideoCollection.findOne({ _id: req.params._id }).then(
    data => res.send(data),
    err => res.send(err)
  );
});

///////////////////Educator\\\\\\\\\\\\\\\\\\\\\\\\
const EducatorCollection = db.collection("Educator");
const EducatorModel = require("./models/educator");

//INSERT EDUCATOR
app.post("/addEducator", (req, res) => {
  EducatorCollection.insertOne(
    new EducatorModel({
      _id: req.body["_id"],
      userName: req.body["userName"],
      fullName: req.body["fullName"],
      contact: req.body["contact"],
      password: req.body["password"],
      video: req.body["video"]
    })
  )
    .then(result => {
      res.send("Inserted Educator with id: " + req.body["_id"]);
      return result;
    })
    .catch(err => {
      res.send(
        "Error in Educator Insertion id: " + req.body["_id"] + "\n" + err
      );
    });
});

//UPDATE EDUCATOR
app.put("/updateEducator/:_id", (req, res) => {
  EducatorCollection.findOneAndUpdate(
    {
      _id: req.params._id // search query
    },
    {
      $set: {
        userName: req.body["userName"],
        fullName: req.body["fullName"],
        contact: req.body["contact"],
        password: req.body["password"],
        video: req.body["video"]
      }
    },
    {
      new: true,
      runValidators: true
    }
  )
    .then(doc => {
      res.send("Updated Educator with id: " + req.params._id);
      return doc;
    })
    .catch(err => {
      res.send("Error in Educator Updating id: " + req.params._id + "\n" + err);
    });
});

//DELETE A EDUCATOR
app.delete("/deleteEducator/:_id", (req, res) => {
  EducatorCollection.findOneAndDelete({
    _id: req.params._id
  })
    .then(response => {
      res.send("Deleted Educator with id: " + req.params._id);
    })
    .catch(err => {
      res.send("Error in Educator Deletion id: " + req.params._id + "\n" + err);
    });
});

//FIND ALL EDUCATORS
app.get("/findAllEducators", (req, res) => {
  const docs = EducatorCollection.find().toArray(function(err, data) {
    res.send(data);
  });
});

//FIND EDUCATOR BY ID
app.get("/findAllEducators/:_id", (req, res) => {
  EducatorCollection.findOne({ _id: req.params._id }).then(
    data => res.send(data),
    err => res.send(err)
  );
});
