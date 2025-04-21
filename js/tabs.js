const switchTab = (activeBtn, inactiveBtn, activeTab, inactiveTab) => {
    console.log('Switching to tab:', activeBtn.id);
    console.log('Active tab:', activeTab.id, 'Inactive tab:', inactiveTab.id);
    
    activeBtn.classList.add('tab-active');
    activeBtn.classList.remove('tab-inactive');
    inactiveBtn.classList.add('tab-inactive');
    inactiveBtn.classList.remove('tab-active');
    
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
};

const switchToAuto = () => {
    switchTab(
        document.getElementById('auto-tab-btn'),
        document.getElementById('web-tab-btn'),
        document.getElementById('auto-tab'),
        document.getElementById('web-tab')
    );
};

const switchToWeb = () => {
    switchTab(
        document.getElementById('web-tab-btn'),
        document.getElementById('auto-tab-btn'),
        document.getElementById('web-tab'),
        document.getElementById('auto-tab')
    );
    const servicesSection = document.getElementById('services');
    if (window.scrollY < servicesSection.offsetTop || window.scrollY > servicesSection.offsetTop + servicesSection.offsetHeight) {
        window.scrollTo({
            top: servicesSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
};

const initTabs = () => {
    const autoBtn = document.getElementById('auto-tab-btn');
    const webBtn = document.getElementById('web-tab-btn');
    if (!autoBtn || !webBtn) {
        console.error('Tab buttons not found');
        return;
    }
    autoBtn.addEventListener('click', switchToAuto);
    webBtn.addEventListener('click', switchToWeb);
    switchToAuto(); // Activer l'onglet Automatisations par défaut
};

// Exposer switchToWeb globalement pour le bouton "Créer un site web"
window.switchToWeb = switchToWeb;

document.addEventListener('DOMContentLoaded', initTabs);