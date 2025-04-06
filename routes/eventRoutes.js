const express = require('express');
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  registerForEvent,
} = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getEvents);
router.post('/', authenticate, authorize('organizer'), createEvent);
router.put('/:id', authenticate, authorize('organizer'), updateEvent);
router.delete('/:id', authenticate, authorize('organizer'), deleteEvent);
router.post('/:id/register', authenticate, registerForEvent);

module.exports = router;
