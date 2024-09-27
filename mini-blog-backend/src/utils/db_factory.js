
const getAllRecords = async (Model, associate = null, options = {}) => {
  const { where = {}, order = [['createdAt', 'DESC']], limit = null, offset = 0 } = options;

  return await Model.findAll({
    where,  
    include: associate
      ? [
          {
            model: associate,
            required: false,
          },
        ]
      : [],  
    order,  
    limit,  
    offset, 
  });
};
const getRecordById = async (Model, id, include = []) => {
  try {
    const record = await Model.findOne({
      where: { id },   
      include          
    });

    if (!record) {
      console.error(`Record with ID ${id} not found in ${Model.name}`);
      return null;
    }

    return record;
  } catch (error) {
    console.error(`Error fetching record by ID ${id} from ${Model.name}:`, error);
    throw error;
  }
};

const getPostsByCategory = async(Model, category, include = []) => {
  try {
    return await  Model.findAll({
      where: {category},
      include,
    });
  } catch (error) {
    console.error(`Error fetching posts by category ${category}:`, error);
    throw error;
  }
};
const getRecordsByConditions = async(Model, conditions) => {
  try {
    return await Model.findAll({
      where: conditions,
    })
  } catch (error) {
    console.log(error)
  }
 
};

const createRecord = async (Model, data) => {
  try{
    return await Model.create(data);
  }catch(error){
    throw new Error('Error Creating record :' + error.message)
  }
};

const updateRecord = async (Model, id, data) => {
  const record = await Model.findByPk(id);
  if (!record) throw new Error(`${Model.name} not found`);
  return await record.update(data);
};

const deleteRecord = async (Model, id) => {
  const record = await Model.findByPk(id);
  if (!record) throw new Error(`${Model.name} not found`);
  await record.destroy();
  return { message: `${Model.name} deleted successfully` };
};

module.exports = {
  getAllRecords,
  getRecordById,
  getRecordsByConditions,
  getPostsByCategory,
  createRecord,
  updateRecord,
  deleteRecord,
};
