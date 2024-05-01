
const addFoodData = (req, res) => {
    try {
        // console.log(global.food_items);
        res.status(200).send([global.food_items, global.foodCategory])
    } catch (error) {
        console.error('Error :', error.message);
        res.status(500).send({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = {
    addFoodData
}