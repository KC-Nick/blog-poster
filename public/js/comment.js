const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#comment-desc').value.trim();
    const post_id = window.location.pathname.split("/")[2];
    if (description && post_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ description, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  const delCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      
      // Show an alert to confirm the deletion
      const confirmDelete = confirm('Are you sure you want to delete this comment?');
      
      if (confirmDelete) {
        const response = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to delete comment');
        }
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);
  
  document
    .querySelector('.comment-list')
    .addEventListener('click', delCommentHandler);