document.addEventListener('DOMContentLoaded', function () {
  var journals = document.querySelectorAll('#history .journal');
  journals.forEach(function (el, i) {
    if (i % 2 === 1) {
      el.classList.add('journal-alt');
    }
  });
});
