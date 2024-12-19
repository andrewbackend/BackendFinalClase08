const mongoose = require('mongoose');
const User = require('./models/User');

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/crudDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectado a MongoDB');
});

// Crear un nuevo usuario
const createUser = async (userData) => {
  const user = new User(userData);
  try {
    const savedUser = await user.save();
    console.log('Usuario creado:', savedUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

// Leer todos los usuarios
const readUsers = async () => {
  try {
    const users = await User.find();
    console.log('Usuarios encontrados:', users);
  } catch (error) {
    console.error('Error al leer usuarios:', error);
  }
};

// Actualizar un usuario por su ID
const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    console.log('Usuario actualizado:', updatedUser);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
};

// Eliminar un usuario por su ID
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log('Usuario eliminado:', deletedUser);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};

// Ejemplos de uso
const runCRUDOperations = async () => {
  const userId = 'ID_DEL_USUARIO';  // Reemplaza con un ID real

  // Crear usuario
  await createUser({ name: 'John Doe', age: 30, email: 'john@example.com' });

  // Leer usuarios
  await readUsers();

  // Actualizar usuario
  await updateUser(userId, { age: 31 });

  // Eliminar usuario
  await deleteUser(userId);
};

runCRUDOperations();




