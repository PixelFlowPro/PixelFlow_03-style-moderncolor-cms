const fetchProjects = async () => {
    try {
      const response = await fetch('/data/projects.json');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };
  
  const createProjectModal = (project) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden relative">
        <div class="modal-content max-h-[90vh] overflow-y-auto p-8 relative">
          <button class="close-btn absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-3xl focus:outline-none" onclick="this.closest('.fixed').remove()">×</button>
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#96b2ff] to-[#aa94fa] bg-opacity-20 mb-4 shadow-inner">
              <i class="${project.metadata.icon || 'fas fa-project-diagram'} text-4xl text-white"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">${project.metadata.title}</h2>
            <p class="text-gray-500 italic max-w-md mx-auto">${project.metadata.desc}</p>
          </div>
          ${buildSection("Contexte", [project.metadata.details.context], "fas fa-info-circle text-blue-500")}
          ${buildSection("Problématique", [project.metadata.details.problematique], "fas fa-bullseye text-orange-500")}
          ${buildSection("Solution", [project.metadata.details.solution], "fas fa-check-circle text-green-500")}
          ${buildSection("Gains", project.metadata.details.gain, "fas fa-trophy text-yellow-500")}
          ${buildSection("Technologies utilisées", project.metadata.details.technologies, "fas fa-code text-purple-500")}
          <div class="mt-10 flex justify-center space-x-4">
            ${project.metadata.type === 'site' ? `
            <a href="${project.metadata.demo}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold shadow-md hover:bg-gray-50 transition flex items-center">
              <i class="fas fa-external-link-alt mr-2"></i> Voir la démo
            </a>
            ` : `
            <a href="${project.metadata.github}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-gray-800 text-white rounded-full font-semibold shadow-md hover:bg-gray-700 transition flex items-center">
              <i class="fab fa-github mr-2"></i> Voir le code
            </a>
            `}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };
  
  const generateProjectCards = (projects) => {
    const projectContainer = document.getElementById('projects-container');
    if (!projectContainer) {
      console.error("Project container not found");
      return;
    }
    projectContainer.innerHTML = '';
  
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card bg-white rounded-xl overflow-hidden shadow-md fade-in cursor-pointer active flex flex-col justify-between';
      card.style.animationDelay = `${index * 0.2}s`;
      card.addEventListener('click', () => createProjectModal(project));
      card.innerHTML = `
        <div class="h-48 relative">
          <div class="absolute inset-0 bg-gradient-to-r from-[#96b2ff] to-[#aa94fa] opacity-80"></div>
          <img src="${project.metadata.miniature || '/img/default-project.png'}" class="absolute inset-0 w-full h-full object-contain object-center opacity-60" alt="${project.metadata.title}">
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${project.metadata.title}</h3>
          <p class="text-gray-600 mb-4">${project.metadata.desc}</p>
          <div class="flex space-x-3">
            ${project.metadata.type === 'site' ? `
            <a href="${project.metadata.demo}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center">
              <i class="fas fa-external-link-alt mr-2"></i> Demo
            </a>
            ` : `
            <a href="${project.metadata.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition flex items-center">
              <i class="fab fa-github mr-2"></i> Code
            </a>
            `}
          </div>
        </div>
      `;
      projectContainer.appendChild(card);
    });
  };
  
  const animateProjectCards = () => {
    const projectsSection = document.getElementById('projects-section');
    if (!projectsSection) {
      console.error("Projects section not found");
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
              card.classList.add('active');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
  
    observer.observe(projectsSection);
  };
  
  const initProjectCards = async () => {
    const projects = await fetchProjects();
    generateProjectCards(projects);
    animateProjectCards();
  };
  
  document.addEventListener('DOMContentLoaded', initProjectCards);