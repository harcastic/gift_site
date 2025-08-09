  const searchIcon = document.getElementById('search-icon');
  const searchBar = document.getElementById('search-bar');

  searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('active');
  });
  document.addEventListener('click', (event) => {
  if (!searchBar.contains(event.target) && event.target !== searchIcon) {
    searchBar.classList.remove('active');
  }
});


