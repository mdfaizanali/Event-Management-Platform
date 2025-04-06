const { events, users } = require('../data/store');

const createEvent = (req, res) => {
  const { title, date, time, description } = req.body;
  const event = {
    id: events.length + 1,
    title,
    date,
    time,
    description,
    organizerId: req.user.id,
    participants: [],
  };
  events.push(event);
  res.status(201).json(event);
};

const updateEvent = (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).json({ msg: "Event not found" });
  if (event.organizerId !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

  Object.assign(event, req.body);
  res.json(event);
};

const deleteEvent = (req, res) => {
  const index = events.findIndex(e => e.id == req.params.id);
  if (index === -1) return res.status(404).json({ msg: "Event not found" });
  if (events[index].organizerId !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

  events.splice(index, 1);
  res.json({ msg: "Event deleted" });
};

const getEvents = (req, res) => {
  res.json(events);
};

const registerForEvent = (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).json({ msg: "Event not found" });

  const user = users.find(u => u.id === req.user.id);
  if (event.participants.includes(user.id)) {
    return res.status(400).json({ msg: "Already registered" });
  }

  event.participants.push(user.id);
  res.json({ msg: "Registered successfully" });
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  registerForEvent,
};
