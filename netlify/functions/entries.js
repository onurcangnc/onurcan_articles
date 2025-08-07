exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      entries: [
        {
          title: "Sample Post",
          body: "This is a test blog post.",
          id: 1,
        },
      ],
    }),
  };
};
