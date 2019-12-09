const {
    findServices,
    createService 
} = require('../services/service');

exports.index = async(req, res) => {
    try{
        const services = await findServices();
        res.status(200).send({ services: services });
    }catch(err){
        res.status(500).send({ message: err.message, error: err })
    }
}

exports.create = async(req, res) => {    
    const newService = req.body;
    
    try{
        const createdNewService = await createService(newService);
        res.status(200).send({ service: createdNewService })
    }catch(err){
        res.status(500).send({ message: err.message, error: err })
    }
}