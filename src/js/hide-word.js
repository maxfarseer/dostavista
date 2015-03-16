'use strict';

function load() {

  var paragraphs = document.getElementsByClassName('js-task__p');

  function spanThis(item) {
    var words = item.innerHTML.split(' ');
    words = words.map(function (word) {
      return word = '<span>'+word+'</span>';
    });
    item.innerHTML = words.join(' ');
  }

  function addListener(item) {
    item.addEventListener('click', hideWord, false);
  }

  function hideWord(elem) {
    elem.target.style.display = 'none';
  }

  [].forEach.call(paragraphs, spanThis);

  var spans = document.querySelectorAll('.js-task__p span');
  [].forEach.call(spans, addListener);

}

window.onload = load;



