document.addEventListener('DOMContentLoaded', function () {
  // select only the outer journal divs (class="journal has-notes" or "journal")
  // filter to those with actual note content — skips property-change-only journals
  var journals = Array.from(
    document.querySelectorAll('#history .journal')
  ).filter(function (el) {
    return el.querySelector('.journal-note') !== null;
  });

  journals.forEach(function (el, i) {
    if (i % 2 === 1) {
      el.classList.add('journal-alt');

      // extend the alt background to a sendmail badge sitting as a sibling after this journal
      var next = el.nextElementSibling;
      if (next && next.hasAttribute('data-sendmail-marker')) {
        var bg = window.getComputedStyle(el).backgroundColor;
        next.style.backgroundColor = bg;
        next.style.margin = '0';
        next.style.paddingTop = '4px';
        next.style.paddingBottom = '8px';
        next.style.paddingLeft = '8px';
        next.style.paddingRight = '8px';
        next.style.borderRadius = '0';
      }
    }
  });

  // color picker on /my/account
  var picker = document.getElementById('aj-color-picker');
  if (!picker) return;

  var status = document.getElementById('aj-save-status');
  var token  = (document.querySelector('meta[name=csrf-token]') || {}).content || '';

  picker.addEventListener('change', function () {
    fetch('/alternating_journals/save_color', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': token
      },
      body: 'color=' + encodeURIComponent(picker.value)
    }).then(function (r) {
      if (status) status.textContent = r.ok ? '✓ gespeichert' : '✗ Fehler';
    });
  });
});
