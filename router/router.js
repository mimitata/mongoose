const express = require("express");
const router = express.Router();
const PERSON = require("../Model/Person ");


router.get("/", async (req, res) => {
  try {
    const users = await Person.find();
    res.status(200).json({ msg: "Obtenir tout", users: users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
const newPERSON = new PERSON({
  name: "John Doe",
  age: 30,
  favoriteFoods: ["Pizza", "Burger", "Sushi"],
});
newPERSON.save();



router.post("/createPerson", async (req, res) => {
  try {
    const newpost = await PERSON.create(req.body);
    console.log(req.body);
    res.status(200).json({ msg: "Nouvelle personne créée", newpost: newpost });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/person", async (req, res) => {
  try {
    const scher = await PERSON.find({ name: "basma" });
    res.status(200).json({ msg: "get person:", person: scher });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/person1", async (req, res) => {
  try {
    const scher = await PERSON.findOne({ name: "John Doe" });
    res.status(200).json({ msg: "The first person:", person: scher });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/personid", async (req, res) => {
  try {
    const cher = await PERSON.findById("6526a6b631ec45ddad5df50d");
    res.status(200).json({ msg: "the person by ID which contains id:", person: cher });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/pers", async (req, res) => {
  try {
    const cher = await PERSON.findById("6526a6b631ec45ddad5df50d");
    res.status(200).json({ msg: "get person:", person: cher });
console.log(cher.favoriteFoods)
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/updateid", async (req, res) => {
  try {
    const person = await PERSON.findById("6526a6b631ec45ddad5df50d");
    if (!person) {
      return res.status(404).json({ msg: "Person not found" });
    }

    person.favoriteFoods.push("hamburger");
    await person.save();

    res.status(200).json({ msg: "Updated person:", person });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/updatename", async (req, res) => {
  try {
    const person = await PERSON.findOneAndUpdate(
      { name: "basma" },
      { age: 20 },
      { new: true }
    );

    if (!person) {
      res.status(404).json({ msg: "Person does not exist" });
    } else {
      res.status(200).json({ msg: "Updated person:", person });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/remove", async (req, res) => {
  try {
    const person = await PERSON.findOneAndDelete('6526a5f45d35855b3902a8d9' );


    if (!person) {
      res.status(404).json({ msg: "Person does not exist" });
    } else {
      res.status(200).json({ msg: "remove person:", person });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});



router.get("/removemany", async (req, res) => {
  try {
    const person = await PERSON.deleteMany({name:"John Doe"} );

    if (!person) {
      res.status(404).json({ msg: "Person does not exist" });
    } else {
      res.status(200).json({ msg: "remove person:", person });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/find", async (req, res) => {
  try {
    const person = await PERSON.find();
      res.status(200).json({ msg: "all person", person });
    }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
});



router.get("/sort", async (req, res) => {
  try {
    const person = await PERSON.find().sort({name: 1})
      res.status(200).json({ msg: "all person", person });
    }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/select", async (req, res) => {
  try {
    const person = await PERSON.find().select({name:true})
      res.status(200).json({ msg: "all person", person });
    }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get("/limit", async (req, res) => {
  try {
    const person = await PERSON.find().limit(3)
      res.status(200).json({ msg: "all person", person });
    }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/exec", async (req, res) => {
  try {
    const person = await PERSON.find({ name: 'ali' }).exec()
    .then(results => {
      console.log(results);
    })  
      res.status(200).json({ msg: "all person", person });
    }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;