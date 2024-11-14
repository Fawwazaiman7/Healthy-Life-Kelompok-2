// Inisialisasi users dari localStorage jika tersedia, jika tidak, gunakan array kosong
let users = JSON.parse(localStorage.getItem('users')) || [];

export const addUser = (user) => {
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users)); // Simpan ke localStorage
};

export const getUsers = () => {
  return users;
};

export const updateUser = (email, updatedData) => {
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    localStorage.setItem('users', JSON.stringify(users)); // Perbarui localStorage
  }
};

