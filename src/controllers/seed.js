const Lightwallet = require('eth-lightwallet');
const isNullOrUndefined = require('util');

class SeedController {
    constructor(){

    }

    generate(req, res){
        if(isNullOrUndefined.isNullOrUndefined(req.params.point)){
            let error = { 
                isError: true,
                msg: "Error read parameter <point>"
            };
            res.status(400).json(error);
        }
        
        let seedPoint = req.params.point.toString();	
        let data = { 
            isError: false,
            seed: Lightwallet.keystore.generateRandomSeed(seedPoint) 
        };
        res.status(200).json(data);
    }
}

module.exports = SeedController;