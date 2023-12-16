let editButtonClick = document.querySelector('.btn-edit');


const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      
      const name = document.querySelector('#title-input').value.trim();
      const description = document.querySelector('#desc-input').value.trim();
      
      if ( name && description ) {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          document.location.replace(`/posts/${id}`);
        } else {
          alert('Failed to edit post');
        }
      }
    }
  };
  
editButtonClick.addEventListener('click', editButtonHandler);