let express = require('express');
let router = express.Router();

// QueryString => query property on the request object
// localhost:9000/plant?name=john
router.get('/plant', (req, res) => {
    if(req.query.name){
        res.send(`You have requested a plant ${req.query.name}`);
    }else {
        res.send('You have requested a plant');
    }
})

// variables with : before them are available to the request object
// in a property called params
// localhost:9000/plant/john
router.get('/plant/:name', (req, res) => {
    res.send(`You have requested a plant ${req.params.name}`);
})

router.get('/error', (req, res) => {
    throw new Error('This is a forced error')
})

module.exports = router;