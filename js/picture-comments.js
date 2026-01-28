const COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');

let totalComments = [];
let counts = [0];

// Функция которая создает комментарии

const renderComments = (comments) => {

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);
    const commentAuthor = commentTemplate.querySelector('.social__picture');
    commentAuthor.src = comment.avatar;
    commentAuthor.alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(commentTemplate);
  });
  socialComments.appendChild(fragment);

  commentCount.textContent = counts;

  if (counts >= totalComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const clearComments = () => {
  socialComments.innerHTML = '';
  commentTotalCount.textContent = '';
};

const initComments = (comments) => {
  counts = Math.min(COMMENTS_COUNT, comments.length);
  totalComments = comments;
  commentTotalCount.textContent = comments.length;
  commentCount.textContent = counts;
  renderComments(comments.slice(0,counts));
};

commentsLoader.addEventListener('click', () =>{
  const prevCount = counts;
  counts = Math.min(counts + COMMENTS_COUNT, totalComments.length);
  renderComments(totalComments.slice(prevCount,counts));
});

export {renderComments, clearComments, initComments};
