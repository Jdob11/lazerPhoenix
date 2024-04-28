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

  fetchMenuItems(createMenuItemElement); // Generate user menu page
  // fetchMenuItems(createMenuItemForm); // Generate Owner menu page

  $(document).on('submit', '.menuItem', editMenuButton);
});
