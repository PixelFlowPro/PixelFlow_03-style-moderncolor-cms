const loadOfferOptions = async () => {
    try {
      const response = await fetch('/data/offers.json');
      if (!response.ok) throw new Error('Failed to fetch offers');
      const offers = await response.json();
      const select = document.getElementById('offer');
      select.innerHTML = '<option value="">-- Sélectionnez un service --</option>';
      const autoGroup = document.createElement('optgroup');
      autoGroup.label = 'Automatisations';
      const webGroup = document.createElement('optgroup');
      webGroup.label = 'Sites Web';
      offers.forEach(offer => {
        const option = document.createElement('option');
        option.value = offer.metadata.title;
        option.textContent = offer.metadata.title;
        if (offer.metadata.category === 'auto') {
          autoGroup.appendChild(option);
        } else {
          webGroup.appendChild(option);
        }
      });
      select.appendChild(autoGroup);
      select.appendChild(webGroup);
      const otherOption = document.createElement('option');
      otherOption.value = 'Autre';
      otherOption.textContent = 'Autre';
      select.appendChild(otherOption);
    } catch (error) {
      console.error('Error loading offer options:', error);
    }
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const loader = form.querySelector('.loader');
    submitButton.disabled = true;
    submitText.textContent = 'Envoi en cours';
    loader.style.display = 'block';
  
    const emoji = document.createElement('span');
    emoji.textContent = '📨';
    emoji.className = 'emoji-fly';
    emoji.style.left = `${submitButton.offsetLeft + submitButton.offsetWidth / 2 - 10}px`;
    emoji.style.top = `${submitButton.offsetTop}px`;
    submitButton.parentNode.appendChild(emoji);
  
    setTimeout(() => {
      emoji.style.opacity = '1';
    }, 10);
  
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      offer: formData.get('offer'),
      message: formData.get('message'),
      date: new Date().toISOString()
    };
  
    try {
      const response = await fetch('/.netlify/functions/save-submission', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        form.reset();
        submitText.textContent = 'Message envoyé !';
        setTimeout(() => {
          emoji.remove();
          submitText.textContent = 'Envoyer';
          loader.style.display = 'none';
          submitButton.disabled = false;
        }, 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      submitText.textContent = 'Erreur';
      emoji.remove();
      loader.style.display = 'none';
      submitButton.disabled = false;
    }
  };
  
  const initForm = () => {
    loadOfferOptions();
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
  };
  
  document.addEventListener('DOMContentLoaded', initForm);