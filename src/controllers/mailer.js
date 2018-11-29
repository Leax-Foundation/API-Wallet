const mailer = require('../utils/mailer');

class MailerController {
    constructor(){

    }

    sendWallet(req, res){
        if(isNullOrUndefined.isNullOrUndefined(req.body.email))
        {
            let msg = { msg: "Error read parameter <email>"};
            res.status(400).json(msg);
        }	
        else if(isNullOrUndefined.isNullOrUndefined(req.body.wallet))
        {
            let msg =  { msg: "Error read wallet Json"};
            res.status(400).json(msg);
        }						
        else{
            mailer.sendMailWallet(req.body.email, req.body.wallet).then(res => {
                res.status(200).send("sucess");
            }).catch(err => {
                res.status(400).send("err");
            })
        }
    }
}

module.exports = MailerController;