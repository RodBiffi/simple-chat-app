const { v4: uuidv4 } = require('uuid');
const messagesMap = new Map();

module.exports.add = (message) => {
    const id = uuidv4();
    const data = {
        id,
        message,
        createdAt: new Date().toISOString(),
        editedAt: null,
        deletedAt: null,
    }
    messagesMap.set(id, data);
    return data;
};

module.exports.edit = (id, message) => {
    const data = {
        message,
        editedAt: new Date().toISOString(),
    }
    const prevData = messagesMap.get(id);
    const mergedData = { ...prevData, ...data }
    messagesMap.set(id, mergedData);
    return mergedData;
};

module.exports.del = (id) => {
    const data = {
        message: '',
        deletedAt: new Date().toISOString(),
    }
    const prevData = messagesMap.get(id);
    const mergedData = { ...prevData, ...data }
    messagesMap.set(id, mergedData);
    return mergedData;
};
