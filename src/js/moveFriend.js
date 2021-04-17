function moveFriend() {
  const friendsListLeft = document.querySelector('[data-role="list-left"]');
  const friendsListRight = document.querySelector('[data-role="list-right"]');

  dragDropFunc(friendsListLeft, friendsListRight, 'friend-item');
  dragDropFunc(friendsListRight, friendsListLeft, 'friend-item');

  friendsListLeft.addEventListener('click', (e) => { 
      let element = e.target;

      if (element.classList.contains('friend-item__arrow')) {
          friendsListRight.insertBefore(element.parentNode, friendsListRight.firstChild);
          element.classList.remove('friend-item__arrow');
          element.classList.add('friend-item__del');
      }
  });

  friendsListRight.addEventListener('click', (e) => { 
      var element = e.target;

      if (element.classList.contains('friend-item__del')) {
          friendsListLeft.insertBefore(element.parentNode, friendsListLeft.firstChild);
          element.classList.remove('friend-item__del');
          element.classList.add('friend-item__arrow');
      }
  });
}

function dragDropFunc(startZone, dropZone, className) {
  let currentDrag;

  for (const item of startZone.children) {
      item.draggable = true;
      item.firstElementChild.draggable = false;
  }

  startZone.parentNode.parentNode.addEventListener('dragstart', (e) => {
      let element;

      if (e.target.classList.contains(className)) {
        element = e.target;
      }
      if (e.target.parentNode.classList.contains(className)) {
        element = e.target.parentNode;
      }        

      currentDrag = { source: startZone, node: element };
  });

  startZone.parentNode.parentNode.addEventListener('dragover', (e) => {
      e.preventDefault();
  });

  dropZone.parentNode.parentNode.addEventListener('drop', (e) => {
      if (currentDrag) {
          e.preventDefault();

          currentDrag.node.lastElementChild.classList.toggle('friend-item__add');
          currentDrag.node.lastElementChild.classList.toggle('friend-item__remove');
    
          dropZone.insertBefore(currentDrag.node, dropZone.firstElementChild);

          currentDrag = null;
      }
  });
}

export { moveFriend };