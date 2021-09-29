const errorSchema = {
  type: "object",
  required: ["error"],
  properties: {
    error: {
      type: "string",
    },
  },
};

export default errorSchema;
