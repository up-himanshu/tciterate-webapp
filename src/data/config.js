module.exports = {
  url: "localurl", // modify this setting only if explicit pointing is required.
  baseurl: "http://tcms.arkasoftwares.co",
  localurl: "http://localhost:3001",
  ngrokurl: "https://3da17821.ngrok.io",
  contentType: "application/json",
  accept: "application/json",
  endpoints: {
    login: "/api/v1/users/login",
    users: "/api/v1/users/",
    projects: "/api/v1/projects/",
    testCases: "/api/v1/testcases/",
    executions: "/api/v1/executions/",
    executionResults: "/api/v1/executionresults/",
    stats: "/api/v1/stats",
  },
};
