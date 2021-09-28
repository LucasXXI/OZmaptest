import User from "../schemas/userSchema.js";

export const getUsers = async ({ request, response }) => {
  const { page, quantity } = request.query;

  try {
    if (page || quantity) {
      if (page && quantity) {
        if (page > 0 && quantity > 0) {
          const users = await User.findAll({
            limit: quantity,
            offset: page - 1,
          });
          response.status = 200;
          response.body = { users };
        } else {
          throw new Error("Invalid Params: The params cannot be 0!");
        }
      } else {
        throw new Error("Missing one of the params!");
      }
    } else {
      const users = await User.findAll();
      response.status = 200;
      response.body = users;
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};

export const getUser = async ({ request, response }) => {
  const { id } = request.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      response.status = 200;
      response.body = { user };
    } else {
      throw new Error("Inexistent Index!");
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};

export const createUser = async ({ request, response }) => {
  try {
    const user = await User.create(request.body);

    if (user) {
      console.log("working")
      response.status = 200;
      response.body =  user;
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
    const user = await User.destroy({ where: { id } });
    if (user === 1) {
      response.status = 200;
      response.body = "User Deleted sucssesfully!";
    } else {
      throw new Error(
        "The delete request couldn't be completed: unexistent ID!"
      );
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
    if (id) {
      const user = await (await User.findByPk(id)).update(body);
      response.status = 200; 
      response.body = { user };
    } else {
      throw new Error("Couldn't find user in storage");
    }
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
};
