const { setup } = require("./src/util/setupTest");

module.exports = async () => {
  // ...
  if (!process.env.TEST_HOST) {
    await setup();
  }
  return null;
};
