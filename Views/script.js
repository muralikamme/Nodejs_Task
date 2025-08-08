const maxFiles = 5;
  document.getElementById("uploadForm").addEventListener("submit", function(e) {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > maxFiles) {
      e.preventDefault(); // stop form from submitting
      alert(`You can only upload up to ${maxFiles} files.`);
    }
  });