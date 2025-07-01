const jobRoutes = require("./job.route");
const companyRoutes = require('./company.route')
const accountRoutes = require('./account.route')
const candidateRoutes = require('./candidate.route')
const favoriteJobSRoutes = require('./favoriteJob.route');
const companyReviewsRoute = require('./companyReview.route')
const cvRoute = require("./cv.route");
const authMiddiware = require('../middleware/authMiddleware')

module.exports = (app) =>{
    app.use("/api",jobRoutes);
    app.use("/api",companyRoutes);
    app.use("/api",accountRoutes)
    app.use("/api",candidateRoutes)
    app.use("/api",favoriteJobSRoutes)
    app.use("/api",companyReviewsRoute)
    app.use('/api',cvRoute)
}
