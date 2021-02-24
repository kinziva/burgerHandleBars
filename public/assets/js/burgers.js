// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const letsEatButton = document.querySelectorAll('.devour');

  // Set up the event listener
  if (letsEatButton) {
    letsEatButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const devoured = e.target.getAttribute('data-devoured');

        const burgerEaten = {
          devoured: devoured,
        };

        fetch(`/api/burger/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // make sure to serialize the JSON body
          body: JSON.stringify(burgerEaten),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the updated burger
          if (response.ok) {
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

  // CREATE
  const addYourOwnBurger = document.getElementById('create-form');
  // Set up the event listener for the create button
  if (addYourOwnBurger) {
    addYourOwnBurger.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea
      const newBurger = {
        burger_name: document.getElementById('burger').value.trim(),
      };

      // Send POST request to create a new burger
      fetch('/api/burger', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('burger').value = '';

        // Reload the page so the user can see the new burger
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgerButton = document.querySelectorAll('.delete-burger');

  // Set up the event listeners for each delete button
  deleteBurgerButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');

      // Send the delete request
      fetch(`/api/burger/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });

});