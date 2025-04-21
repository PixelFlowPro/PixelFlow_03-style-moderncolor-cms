const buildSection = (title, items, icon) => {
    if (!items || !items.length) return '';
    return `
        <div class="bg-gray-50 p-5 rounded-xl mb-5">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <i class="${icon} mr-2"></i> ${title}
            </h3>
            <ul class="space-y-2 text-gray-600 text-sm">
                ${items.map(item => `<li class="flex items-start"><span class="mr-2">•</span> ${item}</li>`).join('')}
            </ul>
        </div>
    `;
};