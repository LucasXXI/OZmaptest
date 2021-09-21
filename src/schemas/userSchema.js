const userSchema = {
    type: "object",
    required: ["name", "age", "email"],
    properties: {
      name: {
        type: "string",
      },
      age: {
        type: "string",
      },
      email: {
        type: "string",
      },
    },
  };
  
  export default userSchema;
  