function saveInLocalStorage() {
  const friendsListLeft = document.querySelector('[data-role="list-left"]');
  const friendsListRight = document.querySelector('[data-role="list-right"]');
  const saveButton = document.querySelector('[data-role="save"]');

  let storage = localStorage;

  saveButton.addEventListener('click', function() {
      let friendsItemsLeft = friendsListLeft.querySelectorAll('.friend-item');
      let friendsItemsRight = friendsListRight.querySelectorAll('.friend-item');

      storage.dataLeft = JSON.stringify({
          items : createList(friendsItemsLeft),
      });
      storage.dataRight = JSON.stringify({
          items : createList(friendsItemsRight),
      });
      console.log(storage);

      function createList(friendsItems) {
          let friendsList = [];

          for (const item of friendsItems) {
              let element = {};
  
              element.first_name = item.children[1].textContent;
              element.photo_100 = item.children[0].getAttribute('src');
  
              friendsList.push(element);
          }
          return friendsList;
      }
  });
}

export { saveInLocalStorage };