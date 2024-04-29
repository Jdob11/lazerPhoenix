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

  const userId = window.location.pathname.split('/').pop();

  $.ajax({
    method: 'GET',
    url: `/users/${userId}`
  })
  .done((user) => {
    console.log(user);
    if (!user.is_owner) {
    fetchMenuItems(createMenuItemElement); // Generate user menu page
  } else {
    fetchMenuItems(createMenuItemForm); // Generate Owner menu page
    createAddMenuItemForm();
    };
  })
  .fail((error) => {
    console.error('Error fetching user:', error);
  });

  $(document).on('submit', '.editMenuItemButton', editMenuButton);

  $(document).on('submit', '.addToMenuButton', addMenuButton)
});
