const jobRoutes = require("./job.route");
const companyRoutes = require('./company.route')
const userRoutes = require('./user.route')
module.exports = (app) =>{
    app.use("/api",jobRoutes);
    app.use("/api",companyRoutes);
    app.use("/api",userRoutes)
}
