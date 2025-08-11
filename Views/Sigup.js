function togglePassword() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
  }

  // Add input validation
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', (e) =>{
      if (e.target.value.trim() !== '') {
        e.target.classList.add('filled');
      } else {
        e.target.classList.remove('filled');
      }
    });
  });