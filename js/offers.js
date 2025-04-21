console.log('offers.js loaded');

const selectOffer = (offerName) => {
  console.log('selectOffer called with:', offerName);
  const offerInput = document.getElementById('offer');
  if (offerInput) {
    offerInput.value = offerName;
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error('Offer input not found');
  }
};

const getButtonColorClass = (twTextColor) => {
  return {
    "text-yellow-500": "btn-offer-yellow",
    "text-green-500": "btn-offer-green",
    "text-blue-500": "btn-offer-blue",
    "text-red-500": "btn-offer-red"
  }[twTextColor] || "btn-primary";
};

const fetchOffers = async () => {
  console.log('Fetching offers...');
  try {
    const response = await fetch('/data/offers.json');
    if (!response.ok) throw new Error(`Failed to fetch offers: ${response.status}`);
    const offers = await response.json();
    console.log('Fetched offers:', offers);

    const automationOffers = offers.filter(offer => offer.metadata.category === 'auto');
    const webOffers = offers.filter(offer => offer.metadata.category === 'web');

    console.log('Automation offers:', automationOffers);
    console.log('Web offers:', webOffers);

    const uncategorized = offers.filter(offer => !['auto', 'web'].includes(offer.metadata.category));
    if (uncategorized.length > 0) {
      console.warn('Offers with invalid or missing category:', uncategorized);
    }

    return { automationOffers, webOffers };
  } catch (error) {
    console.error('Error fetching offers:', error);
    return { automationOffers: [], webOffers: [] };
  }
};

const createModal = (offer) => {
  console.log('Creating modal for:', offer.metadata.title);
  if (!offer || !offer.metadata.title) {
    console.error('Invalid offer data for modal:', offer);
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden relative">
      <div class="modal-content max-h-[90vh] overflow-y-auto p-8 relative">
        <button class="close-btn absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-3xl focus:outline-none" onclick="this.closest('.fixed').remove()">×</button>
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full ${offer.metadata.color || 'text-gray-500'} bg-opacity-20 mb-4 shadow-inner">
            <i class="${offer.metadata.icon || 'fas fa-question'} text-4xl ${offer.metadata.color || 'text-gray-500'}"></i>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-2">${offer.metadata.title}</h2>
          <p class="text-gray-500 italic max-w-md mx-auto">${offer.metadata.quote || ''}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-6 text-center text-sm">
          <div class="bg-gray-50 p-4 rounded-xl shadow-inner">
            <div class="text-gray-500">Durée estimée</div>
            <div class="text-lg font-bold text-gray-800">${offer.metadata.duration || 'N/A'}</div>
          </div>
          <div class="bg-gray-100 p-4 rounded-xl shadow-inner border ${offer.metadata.color ? offer.metadata.color.replace('text-', 'border-') : 'border-gray-500'}">
            <div class="text-gray-500">Tarif</div>
            <div class="text-xl font-extrabold ${offer.metadata.color || 'text-gray-500'}">${offer.metadata.price || 'N/A'}</div>
          </div>
        </div>
        ${buildSection("Inclus dans ce service", offer.metadata.included, "fas fa-check-circle text-green-500")}
        ${buildSection("Exemples concrets", offer.metadata.examples, "fas fa-lightbulb text-yellow-500")}
        ${buildSection("Bénéfices pour vous", offer.metadata.benefits, "fas fa-heart text-red-500")}
        ${buildSection("Options supplémentaires", offer.metadata.options, "fas fa-plus-circle text-purple-500")}
        <div class="mt-10 text-center">
          <button onclick="selectOffer('${offer.metadata.title}'); this.closest('.fixed').remove();" class="${getButtonColorClass(offer.metadata.color)} px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            <i class="fas fa-check-circle mr-2"></i> Je veux ce service
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

const generateCards = (tabId, offers, exampleColor) => {
  console.log(`generateCards called for ${tabId} with ${offers.length} offers`);
  const tab = document.getElementById(tabId);
  if (!tab) {
    console.error(`Tab ${tabId} not found in DOM`);
    return;
  }

  tab.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>';
  const grid = tab.firstChild;

  if (!offers || !offers.length) {
    console.warn(`No offers for ${tabId}`);
    tab.innerHTML = '<p class="text-center text-gray-500">Aucune offre disponible pour cette catégorie.</p>';
    return;
  }

  offers.forEach((offer, i) => {
    console.log(`Processing offer: ${offer.metadata.title}`);
    // Normaliser examples pour gérer les objets
    const examples = offer.metadata.examples
      ? offer.metadata.examples.map(ex => {
          if (typeof ex === 'object' && ex !== null) {
            return Object.entries(ex).map(([key, value]) => `${key} : ${value}`).join(', ');
          }
          return String(ex);
        })
      : [];
    // Validation
    if (
      !offer ||
      !offer.metadata ||
      !offer.metadata.title ||
      !Array.isArray(examples) ||
      !examples.every(ex => typeof ex === 'string')
    ) {
      console.warn(`Skipping invalid offer:`, offer);
      return;
    }

    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md overflow-hidden p-6 card-hover fade-in active cursor-pointer flex flex-col justify-between';
    card.style.transitionDelay = `${(i % 3) * 0.2}s`;
    card.addEventListener('click', () => createModal(offer));
    card.innerHTML = `
      <div class="card">
        <div class="text-center mb-4">
          <i class="${offer.metadata.icon || 'fas fa-question'} text-5xl ${offer.metadata.color || 'text-gray-500'} mb-3"></i>
          <h3 class="text-2xl font-bold mb-2">${offer.metadata.title}</h3>
          <p class="text-gray-500 italic">${offer.metadata.quote || ''}</p>
        </div>
        <div class="mb-6">
          <h4 class="font-semibold mb-2 ${exampleColor}">Exemples d'utilisation :</h4>
          <ul class="space-y-2">
            ${examples.map(ex => `
              <li class="flex items-start">
                <i class="fas fa-check-circle ${exampleColor} mt-1 mr-2"></i>
                <span>${ex}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      <div class="text-center">
        <button onclick="selectOffer('${offer.metadata.title}')" class="${getButtonColorClass(offer.metadata.color)} text-white px-6 py-2 rounded-full font-medium w-full">Ça m'intéresse</button>
      </div>
    `;
    console.log(`Appending card for ${offer.metadata.title} to ${tabId}`);
    grid.appendChild(card);
  });
};

const initOfferCards = async () => {
  console.log('Initializing offer cards');
  const { automationOffers, webOffers } = await fetchOffers();
  generateCards('auto-tab', automationOffers, 'text-green-400');
  generateCards('web-tab', webOffers, 'text-[#f0c06f]');
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded: Loading offers');
  initOfferCards();
});