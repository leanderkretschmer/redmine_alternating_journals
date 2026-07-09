document.addEventListener('DOMContentLoaded', function () {
  // alternating background on issue pages
  document.querySelectorAll('#history .journal').forEach(function (el, i) {
    if (i % 2 === 1) el.classList.add('journal-alt');
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
      if (status) status.textContent = r.ok ? '✓ ' + (window.AJ_I18N && AJ_I18N.saved || 'gespeichert')
                                             : '✗ ' + (window.AJ_I18N && AJ_I18N.error || 'Fehler');
    });
  });
});
