document.addEventListener('DOMContentLoaded', function () {
  // extend the alt background to a sendmail badge sitting as a sibling after a journal
  // (the badge is rendered outside the journal div via hook, so it needs explicit coloring)
  document.querySelectorAll('#history .journal').forEach(function (el) {
    var content = el.querySelector('.journal-content.journal-alt');
    if (!content) return;

    var next = el.nextElementSibling;
    if (next && next.hasAttribute('data-sendmail-marker')) {
      var bg = window.getComputedStyle(content).backgroundColor;
      next.style.backgroundColor = bg;
      next.style.margin = '0';
      next.style.paddingTop = '4px';
      next.style.paddingBottom = '8px';
      next.style.paddingLeft = '8px';
      next.style.paddingRight = '8px';
      next.style.borderRadius = '0';
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
