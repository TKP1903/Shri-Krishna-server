const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { videoController } = require('../../controllers');
const { videoValidation } = require('../../validations');

const router = express.Router();

// new entry
router.route('/').post(auth('createVideo'), validate(videoValidation.createVideo), videoController.createVideo);

router.route('/recent-uploads').get(auth('getVideos'), videoController.recentUploads);

router
  .route('/:videoId')
  .get(auth('getVideo'), validate(videoValidation.getVideo), videoController.getVideo)
  .delete(auth('deleteVideo'), validate(videoValidation.deleteVideo), videoController.deleteVideo)
  .patch(auth('updateVideo'), validate(videoValidation.updateVideo), videoController.updateVideo);

module.exports = router;
