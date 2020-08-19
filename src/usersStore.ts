export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

const users: Array<User> = [];
users.push(
  {
    id: 'd71fb699897de',
    login: 'foo',
    password: 'foo',
    age: 22,
    isDeleted: false,
  },
  {
    id: 'cf5d204361ef7',
    login: 'bar',
    password: 'bar',
    age: 33,
    isDeleted: false,
  },
  {
    id: 'd3338596e23eb',
    login: 'baz',
    password: 'baz',
    age: 44,
    isDeleted: false,
  },
  {
    id: '1f2346069bdba',
    login: 'foo_bar',
    password: 'foo_bar',
    age: 55,
    isDeleted: false,
  },
  {
    id: 'd9e4bc63b92a4',
    login: 'bar_baz',
    password: 'bar_baz',
    age: 66,
    isDeleted: false,
  }
);

function getById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

function addNew(login: string, password: string, age: number): User {
  const user: User = {
    id: Math.random().toString(16).slice(2),
    login,
    password,
    age,
    isDeleted: false,
  };
  users.push(user);
  return user;
}

function update(id: string, data: Partial<User>): User | undefined {
  const userIndx = users.findIndex((u) => u.id === id);
  if (userIndx === -1) {
    return undefined;
  }
  users[userIndx] = {
    ...users[userIndx],
    ...data,
  };
  return users[userIndx];
}

function getByLogin(login: string, limit?: number): Array<User> {
  const sortedUsers = users.sort((a, b) => {
    if (a.login > b.login) {
      return 1;
    }
    if (a.login < b.login) {
      return -1;
    }
    return 0;
  });
  const foundByLogin = sortedUsers.filter((u) => u.login.includes(login));
  if (limit && foundByLogin.length > limit) {
    foundByLogin.length = limit;
  }
  return foundByLogin;
}

function remove(id: string): User | undefined {
  const userIndx = users.findIndex((u) => u.id === id);
  if (userIndx === -1) {
    return undefined;
  }
  users[userIndx].isDeleted = true;
  return users[userIndx];
}

export default {
  getById,
  addNew,
  update,
  getByLogin,
  remove,
};
