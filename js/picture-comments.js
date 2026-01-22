const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');

const COMMENTS_COUNT = 5;

let totalComments = [];
let count = [0];

// Функция которая создает комментарии

const renderComments = (comments) => {

  // commentsLoader.classList.add('hidden');

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

  commentCount.textContent = count;

  if (count >= totalComments.length) {
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
  count = Math.min(COMMENTS_COUNT, comments.length);
  totalComments = comments;
  commentTotalCount.textContent = comments.length;
  commentCount.textContent = count;
  renderComments(comments.slice(0,count));
};

commentsLoader.addEventListener('click', () =>{
  const prevCount = count;
  count = Math.min(count + COMMENTS_COUNT, totalComments.length);
  renderComments(totalComments.slice(prevCount,count));
});

export {renderComments, clearComments, initComments};
