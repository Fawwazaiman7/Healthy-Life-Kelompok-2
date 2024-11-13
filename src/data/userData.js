// src/data/userData.js
let users = [];

export const addUser = (user) => {
  users.push(user);
};

export const getUsers = () => {
  return users;
};

export const updateUser = (email, updatedData) => {
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
  }
};
