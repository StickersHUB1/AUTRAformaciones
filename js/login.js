// js/login.js
async function handleLogin(event) {
  event.preventDefault();
  const studentCode = document.getElementById('student-code').value.trim().toUpperCase();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (!/^[A-Z0-9]+$/.test(studentCode)) {
    errorMessage.textContent = 'Código inválido';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentCode, password })
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('studentCode', studentCode);
      window.location.href = 'index.html';
    } else {
      errorMessage.textContent = data.message;
      errorMessage.style.display = 'block';
    }
  } catch {
    errorMessage.textContent = 'Error de conexión';
    errorMessage.style.display = 'block';
  }
}