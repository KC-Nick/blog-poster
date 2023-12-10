let editButtonClick = document.querySelector('.btn-com-edit');


const editButtonHandler = async () => {
      const id = window.location.pathname.split("/")[2];
      const description = document.querySelector('#com-desc-input').value.trim();
      
      if ( description ) {
        const response = await fetch(`/api/comments/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          alert('Comment updated!')
          window.location.href = `/comments/${id}`;
        } else {
          alert('Failed to edit comment');
        }
    }
  };
  
editButtonClick.addEventListener('click', editButtonHandler);