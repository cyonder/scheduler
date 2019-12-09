const Service = require('../models/service');

exports.findServices = () => {
    return new Promise(async(resolve, reject) => {
        try{
            const services = await Service.find()
                .sort({createdAt: 'desc'})
            resolve(services);   
        }catch(error){
            reject(error);
        }
    });
}

exports.createService = (newService) => {    
    const serviceInstance = new Service(newService);

    return new Promise(async(resolve, reject) => {
        try{
            const createdNewService = await serviceInstance.save();            
            resolve(createdNewService);
        }catch(error){
            reject(error);
        }
    });
}