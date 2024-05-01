const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.DATABASE;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        // Define global variables
        global.food_items = data;
        global.foodCategory = catData;
        //  console.log(global.foodCategory);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// mongoDB();

module.exports = mongoDB;


// const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://gofood:gofood123@cluster0.tgek2xv.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

// // Define a Mongoose schema for the "food_items" collection
// const foodItemSchema = new mongoose.Schema({
//     // _id: mongoose.Schema.Types.ObjectId,
//     CategoryName: String,
//     name: String,
//     img: String,
//     options: [{}],
//     description: String
// });

// // Create a Mongoose model based on the schema
// const FoodItem = mongoose.model('food_items', foodItemSchema);

// const mongoDB = async () => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB successfully");

//         // Fetch all documents from the "food_items" collection
//         const data = await FoodItem.find({});
//         // console.log("Fetched data:", data);
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

// mongoDB();

// module.exports = mongoDB;

