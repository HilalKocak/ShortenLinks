class BaseService{
    constructor(model) {
        this.model = model;
    }


    save(objects) {
      return this.model.insertMany(objects)
    }

    async load() {
      return await this.model.find()
    }

    async insert(object) {
      return await this.model.create(object)
   
     }
   
     async removeBy(property, value) {
      return this.model.deleteOne({ [property]: value })
  
    }

    async find(id) {
      return this.model.findById(id)
    }
  
    
      async findBy(property, value) {
        return this.model.find({ [property]: value })
      }


      async update(id, object) {
        return this.model.findByIdAndUpdate(id, object)
       
      }


}
module.exports = BaseService
 