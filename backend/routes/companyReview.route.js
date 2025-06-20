const express = require ('express');
const route = express.Router();
const companyReviewController = require('../controller/companyReview.controller')

// [get] /api/comany-reviews
route.get('/comany-reviews/:companyId',companyReviewController.gellAllByIdcompany)

// [Post] /api/company-reviews/add
route.post('/comany-reviews/add',companyReviewController.addReviewCompany)
// [patch] /api/company-reviews/update/:id
route.patch('/comany-reviews/update/:id',companyReviewController.updateReviewCompany)
// [delete] /api/company-reviews/delete/:id
route.delete('/comany-reviews/delete/:id',companyReviewController.deleteReviewCompany)


module.exports = route