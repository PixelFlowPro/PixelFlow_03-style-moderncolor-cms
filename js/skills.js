const generateSkills = (skillCategories) => {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
  
    skillCategories.forEach((cat, index) => {
      const sortedSkills = cat.skills.sort((a, b) => parseInt(b.percent) - parseInt(a.percent));
      const section = document.createElement('div');
      section.className = 'bg-white p-6 rounded-xl shadow-md animate-fade-in';
      section.style.animationDelay = `${index * 0.2}s`;
      section.innerHTML = `
        <div class="flex items-center mb-6">
          <div class="p-3 rounded-lg ${cat.color}-icon-bg mr-4">
            <i class="${cat.icon} text-2xl"></i>
          </div>
          <h3 class="text-2xl font-semibold text-gray-800">${cat.category}</h3>
        </div>
        <div class="space-y-6">
          ${sortedSkills.map(skill => `
            <div>
              <div class="flex justify-between mb-1">
                <div class="flex items-center">
                  <i class="${skill.icon || 'fas fa-code'} text-xl ${skill.iconColor} mr-2"></i>
                  <span class="font-medium text-gray-700">${skill.name}</span>
                </div>
                <span class="text-sm font-medium text-gray-500">${skill.percent}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="skill-bar ${cat.color}-bar rounded-full h-2.5" style="width: ${parseInt(skill.percent)}%" data-width="${parseInt(skill.percent)}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(section);
    });
  };
  
  const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    const competencesSection = document.getElementById('competences');
    if (competencesSection) {
      observer.observe(competencesSection);
    }
  };
  
  const initSkills = async () => {
    try {
      const response = await fetch('/data/skills.json');
      if (!response.ok) throw new Error('Failed to fetch skills');
      const { skillCategories } = await response.json();
      generateSkills(skillCategories);
      animateSkills();
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };
  
  document.addEventListener('DOMContentLoaded', initSkills);