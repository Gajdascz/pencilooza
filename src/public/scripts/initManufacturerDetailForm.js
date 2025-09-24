document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form#manufacturer-detail-form');
  form.addEventListener('submit', async (e) => {
    const formData = new FormData(form);
    form.setAttribute('action', formData.get('manufacturerDetailCommand'));
  });
});
