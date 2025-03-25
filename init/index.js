const mongoose = require("mongoose");
const dotenv = require("dotenv");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

dotenv.config();

const MONGO_URL =
  process.env.MONGO_URL || "mongodb+srv://ferozshaikh2222:feroz2222@wanderlust.927qq.mongodb.net/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: '67e180e607369188e626ab4b',
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
