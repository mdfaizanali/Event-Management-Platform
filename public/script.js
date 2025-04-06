const apiUrl = 'https://event-management-platform-7s6u.onrender.com'; // update this!

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('loginForm');
  const createEventForm = document.getElementById('createEventForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
      } else {
        alert('Login failed');
      }
    });
  }

  if (createEventForm) {
    document.getElementById('createEventForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');

      const res = await fetch(`${apiUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          title: document.getElementById('title').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value,
          description: document.getElementById('description').value,
        })
      });

      const data = await res.json();
      alert(data.msg || 'Event created');
    });

    fetchEvents();
  }

  async function fetchEvents() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${apiUrl}/events`, {
      headers: { 'Authorization': token }
    });
    const events = await res.json();

    const container = document.getElementById('eventsContainer');
    events.forEach(ev => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${ev.title}</strong> on ${ev.date} at ${ev.time}</p>
        <button onclick="registerForEvent('${ev.id}')">Register</button>
        <hr/>
      `;
      container.appendChild(div);
    });
  }
});

async function registerForEvent(eventId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiUrl}/events/${eventId}/register`, {
    method: 'POST',
    headers: { 'Authorization': token }
  });
  const data = await res.json();
  alert(data.msg || 'Registered!');
}
