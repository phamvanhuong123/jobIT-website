const jobRoutes = require("./job.route");
const companyRoutes = require('./company.route')
const accountRoutes = require('./account.route')
const candidateRoutes = require('./candidate.route')
const favoriteJobSRoutes = require('./favoriteJob.route');
module.exports = (app) =>{
    app.use("/api",jobRoutes);
    app.use("/api",companyRoutes);
    app.use("/api",accountRoutes)
    app.use("/api",candidateRoutes)
    app.use("/api",favoriteJobSRoutes)

}
