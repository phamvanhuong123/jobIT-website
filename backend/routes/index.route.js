const jobRoutes = require("./job.route");
const companyRoutes = require('./company.route')
module.exports = (app) =>{
    app.use("/api",jobRoutes);
    app.use("/api",companyRoutes);
}
