document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.querySelector('.file-input');
    const filePreview = document.getElementById('file-preview');
    const selectedFilesText = document.getElementById('selected-files');

    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        filePreview.classList.add('active');
        if (this.files.length === 1) {
          selectedFilesText.textContent = this.files[0].name;
        } else {
          selectedFilesText.textContent = `${this.files.length} files selected`;
        }
      } else {
        filePreview.classList.remove('active');
        selectedFilesText.textContent = 'No files selected';
      }
    });

    // Drag and drop functionality
    const dropArea = document.querySelector('.file-input-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
      dropArea.style.borderColor = 'var(--primary)';
      dropArea.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
    }

    function unhighlight() {
      dropArea.style.borderColor = '#ced4da';
      dropArea.style.backgroundColor = 'transparent';
    }

    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      fileInput.files = files;
      
      // Trigger change event manually
      const event = new Event('change');
      fileInput.dispatchEvent(event);
    }
  });