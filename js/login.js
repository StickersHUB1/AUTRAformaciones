// js/login.js
// Lista de usuarios permitidos (código de alumno y contraseña)
// Añade, modifica o elimina usuarios aquí
const users = {
  ADMINISTRADOR: { password: "admin123", studentCode: "administrador" },
  ESTUDIANTE1: { password: "estudiante123", studentCode: "ESTUDIANTE1" },
  ESTUDIANTE2: { password: "estudiante456", studentCode: "ESTUDIANTE2" },
  ALUMNO3: { password: "alumno789", studentCode: "ALUMNO3" },
  ALUMNO4: { password: "alumno101", studentCode: "ALUMNO4" }
};

function handleLogin(event) {
  event.preventDefault();
  const studentCode = document.getElementById('student-code').value.trim().toUpperCase();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (users[studentCode] && users[studentCode].password === password) {
    localStorage.setItem('studentCode', studentCode);
    window.location.href = 'index.html';
  } else {
    errorMessage.textContent = 'Código de alumno o contraseña incorrectos';
    errorMessage.style.display = 'block';
  }
}