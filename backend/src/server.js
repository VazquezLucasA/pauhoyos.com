const app = require("./app");
const { appConfig } = require("./config/env");

const port = appConfig.port;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API ready on port ${port}`);
});
