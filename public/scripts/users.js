// Client facing scripts here
$(() => {

  const userId = window.location.pathname.split('/').pop();

  getUserAndGenerateMenu(userId);

});
