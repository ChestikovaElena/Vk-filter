import View from './view.js';
import { moveFriend } from './moveFriend.js';

function getData() {
  VK.init({
      apiId: 7807296
  });

  let friendsLeftColumn = {};
  let friendsRightColumn = {};
  
  if (localStorage.dataLeft || localStorage.dataRight) {
        friendsLeftColumn = JSON.parse(localStorage.dataLeft);
        friendsRightColumn = JSON.parse(localStorage.dataRight);
        createList(friendsLeftColumn, friendsRightColumn);
        filterFriends();
        moveFriend();
  } else {
      (async () => {
          try {
              await auth();
              friendsLeftColumn = await callAPI('friends.get', { fields: 'photo_100' });
              createList(friendsLeftColumn, friendsRightColumn);
              filterFriends();
              moveFriend();
          } catch (e) {
              console.error(e);
          }
      })();
  } 

  function auth() {
      return new Promise((resolve, reject) => {
          VK.Auth.login(data => {
              if (data.session) {
                  resolve();
              } else {
                  reject(new Error('Не удалось авторизоваться'));
              }
          }, 2);
      });
  }

  function callAPI(method, params) {
      params.v = '5.76';

      return new Promise((resolve, reject) => {
          VK.api(method, params, (data) => {
              if (data.error) {
                  reject(data.error);
              } else {
                  resolve(data.response);
              }
          });
      })
  }

  function createList(friendsLeftColumn, friendsRightColumn) {
    const leftColumn = document.querySelector('#left');
    leftColumn.innerHTML = View.render('left', friendsLeftColumn);

    const rightColumn = document.querySelector('#right');
    rightColumn.innerHTML = View.render('right', friendsRightColumn);
  }

  function filterFriends() {
    const filterInputLeft = document.querySelector('[data-role="filter-left"]');
    const filterInputRight = document.querySelector('[data-role="filter-right"]');
    const friendsListLeft = document.querySelector('[data-role="list-left"]');
    const friendsListRight = document.querySelector('[data-role="list-right"]');

    filterInputLeft.addEventListener('input', function() { listener(filterInputLeft, friendsListLeft); }, false);
    filterInputRight.addEventListener('input', function() { listener(filterInputRight, friendsListRight); }, false);

    function listener(filterInput, friendsList) {
        const { value } = filterInput;

        for (const friendNode of friendsList.children) {
            if(friendNode.textContent.toLowerCase().includes(value.toLowerCase())) {
                friendNode.classList.remove('hidden');
            } else {
                friendNode.classList.add('hidden');
            }
        }
    }
  }
}

export { getData };