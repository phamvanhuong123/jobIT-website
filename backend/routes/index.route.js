const jobRoutes = require("./job.route");
const companyRoutes = require('./company.route')
const accountRoutes = require('./account.route')
module.exports = (app) =>{
    app.use("/api",jobRoutes);
    app.use("/api",companyRoutes);
    app.use("/api",accountRoutes)
}
