const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleBtn = document.getElementById('toggleForm');
const formTitle = document.getElementById('formTitle');
const loginMessage = document.getElementById('message');
const regMessage = document.getElementById('regMessage');

toggleBtn.addEventListener('click', () => {
  const isLoginVisible = loginForm.style.display !== 'none';
  loginForm.style.display = isLoginVisible ? 'none' : 'block';
  registerForm.style.display = isLoginVisible ? 'block' : 'none';
  formTitle.textContent = isLoginVisible ? 'Register' : 'Login';
  toggleBtn.textContent = isLoginVisible
    ? 'Already have an account? Login'
    : "Don't have an account? Register";
  loginMessage.textContent = '';
  regMessage.textContent = '';
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  loginMessage.textContent = data.message;
  loginMessage.style.color = data.success ? 'lightgreen' : 'red';
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  regMessage.textContent = data.message;
  regMessage.style.color = data.success ? 'lightgreen' : 'red';

  if (data.success) {
    // Auto-switch to login form after registration
    toggleBtn.click();
  }
});