document.addEventListener('DOMContentLoaded', function() {
  const uploadInput = document.getElementById('upload');
  const downloadButton = document.getElementById('download');
  const drawButton = document.getElementById('draw');
  const imageContainer = document.querySelector('.image-container');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let img = new Image();
  let isDrawing = false;

  uploadInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              img.onload = function() {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);
                  canvas.style.display = 'block';
                  img.style.display = 'none';
                  downloadButton.disabled = false;
                  drawButton.disabled = false;
              };
              img.src = e.target.result;
          };
          reader.readAsDataURL(file);
      }
  });

  drawButton.addEventListener('click', function() {
      canvas.style.cursor = 'crosshair';
      isDrawing = true;
  });

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mouseup', finishDrawing);
  canvas.addEventListener('mousemove', draw);

  function startDrawing(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
  }

  function draw(e) {
      if (!isDrawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
  }

  function finishDrawing() {
      isDrawing = false;
      canvas.style.cursor = 'default';
  }

  downloadButton.addEventListener('click', function() {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'drawn-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });
});
