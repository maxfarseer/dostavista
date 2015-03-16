'use strict';

window.onload = load;

function load() {

  var paragraphs = document.getElementsByClassName('js-task__p');

  [].forEach.call(paragraphs, spanThis);

  function spanThis(item, index) {
    var words = item.innerHTML.split(' ');
    words = words.map(function (word) {
      return word = '<span>'+word+'</span>';
    });
    item.innerHTML = words.join(' ');
  }

  var spans = document.querySelectorAll('.js-task__p span');

  [].forEach.call(spans, addListener);

  function addListener(item) {
    item.addEventListener('click', hideWord, false);
  }

  function hideWord(elem) {
    elem.target.style.display = 'none';
  }


}

