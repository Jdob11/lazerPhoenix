// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      const $usersList = $('#users');
      $usersList.empty();

      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });

  // Function to fetch menu items via AJAX and prepend them to the menu container
  function fetchMenuItems() {
    $.get('/users/menuItems', function(data) {
      // Loop through menu items data and create elements
      data.forEach(function(menuItem) {
        const $menuItem = createMenuItemElement(menuItem); // Assuming createMenuItemElement function is available
        $('#menuContainer').prepend($menuItem); // Prepend menuItem to the container div with id menuContainer
      });
    }).fail(function() {
      console.error('Error fetching menu items');
    });
  }

  // Call fetchMenuItems function when the page is ready
  fetchMenuItems();

  // Function to handle form submission
  $(document).on('submit', '.menuItem', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = $(this).serialize(); // Serialize form data
    $.post('/users/addMenuItem', formData, function(response) {
      console.log(response); // Log response from server
      // Optionally, you can handle success here (e.g., show a success message)
    }).fail(function() {
      console.error('Error adding menu item');
      // Optionally, you can handle error here (e.g., show an error message)
    });
  });
});
