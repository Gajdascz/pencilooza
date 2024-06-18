document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form#application-review-form');
  if (!form) return;
  const rejectRadio = document.querySelector('input#rejectApplication');
  const rejectionReason = document.querySelector('input#rejection-reason');
  rejectRadio.addEventListener('click', (e) => {
    const reason = prompt(`Please provide a reason for rejection:`);
    if (reason && reason.trim().length > 0) rejectionReason.value = reason;
    else {
      e.preventDefault();
      alert('Invalid input: Please provide a valid reason.');
    }
  });
});
