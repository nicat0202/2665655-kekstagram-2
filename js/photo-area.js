const FILE__TYPES = ['jpg', 'gif', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload input[type=file]');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const initUploadFile = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE__TYPES.some((it) => fileName.endsWith(it));

    if(matches){
      const url = URL.createObjectURL(file);
      previewImg.src = url;
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${url})`;
      });
    }
  });
};

export{initUploadFile};
