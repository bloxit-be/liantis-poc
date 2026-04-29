/* Liantis PoC — NACEBEL form
 * Submits to n8n webhook + random-use-case generator
 */
(function () {
  'use strict';

  const N8N_BASE = 'https://n8n.srv923316.hstgr.cloud';
  const SUBMIT_URL = N8N_BASE + '/webhook/nacebel-form';
  const RANDOM_URL = N8N_BASE + '/webhook/random-eenmanszaak-use-case';

  const form = document.getElementById('nace-form');
  const formCard = document.getElementById('form-card');
  const successCard = document.getElementById('success-card');
  const errorBox = document.getElementById('form-error');
  const btnSubmit = document.getElementById('btn-submit');
  const btnRandom = document.getElementById('btn-random');
  const btnAgain = document.getElementById('btn-again');
  const fldHoofd = document.getElementById('hoofdactiviteit');
  const fldNeven = document.getElementById('nevenactiviteiten');

  const ORIG_RANDOM_LABEL = btnRandom.querySelector('.lp-btn-label').textContent;
  const ORIG_SUBMIT_LABEL = btnSubmit.querySelector('.lp-btn-label').textContent;

  function setLoading(btn, on, loadingLabel) {
    const labelEl = btn.querySelector('.lp-btn-label');
    if (on) {
      btn.classList.add('is-loading');
      btn.disabled = true;
      if (loadingLabel) labelEl.textContent = loadingLabel;
    } else {
      btn.classList.remove('is-loading');
      btn.disabled = false;
    }
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }
  function clearError() {
    errorBox.textContent = '';
    errorBox.hidden = true;
  }

  /* ─── Random use case ─── */
  btnRandom.addEventListener('click', async () => {
    clearError();
    setLoading(btnRandom, true, 'Even denken…');

    try {
      const res = await fetch(RANDOM_URL, { method: 'GET' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const hoofd = data && (data.hoofdactiviteit || '').trim();
      const neven = data && (data.nevenactiviteiten || data.nevenactiviteit || '').trim();
      if (!hoofd) throw new Error('Geen hoofdactiviteit terug');

      fldHoofd.value = hoofd;
      fldNeven.value = neven;
      [fldHoofd, fldNeven].forEach((f) => {
        f.classList.add('flash');
        f.dispatchEvent(new Event('input', { bubbles: true }));
        setTimeout(() => f.classList.remove('flash'), 600);
      });
      fldHoofd.focus();
      fldHoofd.setSelectionRange(hoofd.length, hoofd.length);
    } catch (err) {
      console.error('random use-case failed', err);
      showError('Kon geen use case verzinnen — probeer opnieuw.');
    } finally {
      setLoading(btnRandom, false);
      btnRandom.querySelector('.lp-btn-label').textContent = ORIG_RANDOM_LABEL;
    }
  });

  /* ─── Submit ─── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      Email: form.elements['Email'].value.trim(),
      Hoofdactiviteit: form.elements['Hoofdactiviteit'].value.trim(),
      Nevenactiviteiten: form.elements['Nevenactiviteiten'].value.trim(),
    };

    setLoading(btnSubmit, true, 'Versturen…');
    btnRandom.disabled = true;

    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      // Show success
      formCard.hidden = true;
      successCard.hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('submit failed', err);
      showError('Verzenden mislukte. Probeer opnieuw, of mail ons direct via kevin@bloxit.be.');
      setLoading(btnSubmit, false);
      btnRandom.disabled = false;
      btnSubmit.querySelector('.lp-btn-label').textContent = ORIG_SUBMIT_LABEL;
    }
  });

  /* ─── Reset to form ─── */
  btnAgain.addEventListener('click', () => {
    form.reset();
    successCard.hidden = true;
    formCard.hidden = false;
    setLoading(btnSubmit, false);
    btnRandom.disabled = false;
    btnSubmit.querySelector('.lp-btn-label').textContent = ORIG_SUBMIT_LABEL;
    document.getElementById('email').focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
