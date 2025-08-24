import Animal from "../modals/animal.modal.js";
import errorHandler from "../utilities/errorHandler.js";

export const addAnimal = async (req, res, next) => {
    try {

        const { name, species, age, health_status, feeding_schedule, description, quantity } = req.body;

        if (!name || !species || !age || !health_status || !feeding_schedule || !description || !quantity) {
            return next(errorHandler(400, "All fields are required"));
        }

        const animal = await Animal.findOne({ name })

        if (animal) {
            return next(errorHandler(400, "Animal is already exists"));
        }

        const newAnimal = new Animal({
            name,
            species,
            age,
            health_status,
            feeding_schedule,
            description,
            quantity
        });

        await newAnimal.save();

        return res.status(200).json({
            success: true,
            message: "Animal added successfully",
            Animal: newAnimal
        });

    } catch (error) {
        next(errorHandler(error))
    }

};

export const updateAnimal = async (req, res, next) => {

   try {
     const { id } = req.params;
 
     if (!id) {
         return next(errorHandler(400, "Animal ID is required"));
     }
 
     const updatedData = req.body;
 
     const updatedAnimal = await Animal.findByIdAndUpdate(id, {
         
         $set: updatedData
     
     }, { new: true, runValidators: true, timestamps:true });
 
     if (!updatedAnimal) {
         return next(errorHandler(404, "Animal not found"));
     }
     return res.status(200).json({
         success: true,
         message: "Animal updated successfully",
         Animal: updatedAnimal
     });
   } catch (error) {
       next(errorHandler(error))
   }

}

export const removeAnimal = async (req, res,next) => {
    
    const {id} = req.params;

    if(!id){
        return next(errorHandler(400,"Animal ID is required"))
    }

    const animal = await Animal.findByIdAndDelete(id);
    
    if(!animal){
        return next(errorHandler(404,"Animal not found"))
    }

    return res.status(200).json({
        success: true,
        message: "Animal removed successfully",
        removedAnimal: animal
    });

}

export const getAnimalInformation = async(req,res,next)=>{

    try {
        const { id } = req.params;

        if (!id) {
            return next(errorHandler(400, "Animal ID is required"));
        }

        const animal = await Animal.findById(id);

        if (!animal) {
            return next(errorHandler(404, "Animal not found"));
        }

        return res.status(200).json({
            success: true,
            message: "Animal retrieved successfully",
            animalData: animal
        });
    } catch (error) {
        next(errorHandler(error))
    }

}


export const getAllAnimal = async (req, res, next) => {
    try {
        const animals = await Animal.find();

        if(!animals){
            return next(errorHandler(404,"No animals found"))
        }

        return res.status(200).json({
            success: true,
            message: "Animals retrieved successfully",
            animals
        });
    } catch (error) {
        next(errorHandler(error))
    }
}




