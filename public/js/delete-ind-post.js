let delButtonClick = document.querySelector('.btn-danger');

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        // Show an alert to confirm the deletion
        const confirmDelete = confirm('Are you sure you want to delete this post?');

        if (confirmDelete) {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Post deleted! Redirecting...')
                document.location.replace(`/`);
            } else  {
                alert('Failed to delete post');
            }
        }
    }
};

delButtonClick.addEventListener('click', delButtonHandler);