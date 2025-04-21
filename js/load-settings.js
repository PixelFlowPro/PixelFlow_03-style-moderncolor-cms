const loadSettings = async () => {
    try {
      const response = await fetch('/data/settings.json');
      const settings = await response.json();
      document.getElementById('hero-title').innerHTML = settings.hero_title;
      document.getElementById('hero-subtitle').innerHTML = settings.hero_subtitle;
      document.getElementById('services-title').innerHTML = settings.services_title;
      document.getElementById('services-description').innerHTML = settings.services_description;
      document.getElementById('contact-title').innerHTML = settings.contact_title;
      document.getElementById('contact-description').innerHTML = settings.contact_description;
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };
  
  document.addEventListener('DOMContentLoaded', loadSettings);