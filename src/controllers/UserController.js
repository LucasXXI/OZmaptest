let users = [
  {
    name: "Lucas",
    age: "19",
    email: "lucas@gmail.com",
  },
  {
    name: "Rodrigo",
    age: "19",
    email: "rodrigo@gmail.com",
  },
  {
    name: "Pedro",
    age: "19",
    email: "pedro@gmail.com",
  },
  {
    name: "Gabriel",
    age: "19",
    email: "gabriel@gmail.com",
  },
  {
    name: "Matheus",
    age: "20",
    email: "matheus@gmail.com",
  }
];

export const getUsers = async ({ request, response }) => {
  const { page, quantity } = request.query;

  try {
    if (page || quantity) {
      if (page && quantity) {
        if (page > 0 && quantity > 0 && quantity <= users.length) {
          const usersArray = users.reduce((result, item, index) => {
            const quantityIndex = Math.floor(index / quantity);
            if (!result[quantityIndex]) {
              result[quantityIndex] = []; // start a new page
            }
            result[quantityIndex].push(item);

            return result;
          }, []);

          response.status = 200;
          response.body = { users: usersArray[page - 1] };
        } else {
          response.status = 200;
          response.body = { users };
        }
      } else {
        throw new Error("Missing one of the params!");
      }
    } else {
        response.status = 200;
        response.body = { users };
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};

export const getUser = async ({ request, response }) => {
  const { id } = request.params;

  try {
    if (id < users.length) {
      response.body = { user: users[id] };
    } else {
      throw new Error("Non existent user in index.");
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};

export const createUser = async ({ request, response }) => {
  try {
    if (Object.values(request.body).length !== 0) {
      users.push(request.body);
      response.body = { users };
    } else {
      throw new Error("The request body is empty");
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};

export const deleteUser = async ({ request, response }) => {
  const { id } = request.params;

  try {
    if (id < users.length) {
      users.splice(id, 1);
      response.body = { users };
    } else {
      throw new Error("Couldn't delete inexistent user in storage");
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};

export const updateUser = async ({ request, response }) => {
  const { id } = request.params;
  const { body } = request;

  try {
    if (id < users.length) {
      for (let [key, value] of Object.entries(body)) {
        if (Object.keys(users[id]).includes(key)) {
          users[id][key] = value;
        }
      }
      response.body = { user: users[id] };
    } else {
      throw new Error("Couldn't find user in storage");
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};


