document.addEventListener('DOMContentLoaded', function () {
  // only alternate journals that have actual note content (.journal-note),
  // skipping property-change-only journals which render invisibly thin
  var journals = Array.from(
    document.querySelectorAll('#history [class*="journal"]')
  ).filter(function (el) {
    return el.querySelector('.journal-note') !== null;
  });

  journals.forEach(function (el, i) {
    if (i % 2 === 1) {
      el.classList.add('journal-alt');

      // extend the alt background to a sendmail badge sitting as a sibling after this journal
      // (the badge is rendered outside the journal div via hook, so it needs explicit coloring)
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
