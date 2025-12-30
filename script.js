// AI Portfolio JavaScript
// Handles dynamic content loading and interactivity

document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Portfolio loaded');
    
    // Initialize portfolio
    initializePortfolio();
    
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Load dynamic content
    loadProjects();
    loadLabs();
    loadExperiments();
    loadNotes();
});

/**
 * Initialize portfolio features
 */
function initializePortfolio() {
    // Add active class to current navigation item based on scroll position
    window.addEventListener('scroll', updateActiveNavigation);
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Update active navigation item based on scroll position
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Load projects from the projects directory
 */
async function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    
    try {
        // In a real implementation, this would fetch from a JSON file or API
        // For now, we'll check if there are any projects to display
        const projects = await fetchPortfolioItems('projects');
        
        if (projects && projects.length > 0) {
            projectsList.innerHTML = '';
            projects.forEach(project => {
                projectsList.appendChild(createProjectCard(project));
            });
        }
    } catch (error) {
        console.log('No projects to load yet');
    }
}

/**
 * Load lab artifacts
 */
async function loadLabs() {
    const labsList = document.getElementById('labs-list');
    
    try {
        const labs = await fetchPortfolioItems('labs');
        
        if (labs && labs.length > 0) {
            labsList.innerHTML = '';
            labs.forEach(lab => {
                labsList.appendChild(createLabCard(lab));
            });
        }
    } catch (error) {
        console.log('No labs to load yet');
    }
}

/**
 * Load experiments
 */
async function loadExperiments() {
    const experimentsList = document.getElementById('experiments-list');
    
    try {
        const experiments = await fetchPortfolioItems('experiments');
        
        if (experiments && experiments.length > 0) {
            experimentsList.innerHTML = '';
            experiments.forEach(experiment => {
                experimentsList.appendChild(createExperimentCard(experiment));
            });
        }
    } catch (error) {
        console.log('No experiments to load yet');
    }
}

/**
 * Load notes
 */
async function loadNotes() {
    const notesList = document.getElementById('notes-list');
    
    try {
        const notes = await fetchPortfolioItems('notes');
        
        if (notes && notes.length > 0) {
            notesList.innerHTML = '';
            notes.forEach(note => {
                notesList.appendChild(createNoteCard(note));
            });
        }
    } catch (error) {
        console.log('No notes to load yet');
    }
}

/**
 * Fetch portfolio items from a specific category
 * 
 * TODO: This is a stub implementation. In a real implementation, this would:
 * - Fetch from a manifest.json file in each category directory (e.g., projects/manifest.json)
 * - Parse the JSON and return an array of item objects
 * - Each object should have properties: title, description, date, link, and category-specific fields
 * 
 * Expected return format:
 * [
 *   { title: "Project Name", description: "...", date: "2024-12-30", link: "projects/project-name/", tags: [...] },
 *   ...
 * ]
 * 
 * @param {string} category - The category to fetch items from (projects, labs, experiments, notes)
 * @returns {Promise<Array>} Array of portfolio items (currently returns empty array)
 */
async function fetchPortfolioItems(category) {
    // Placeholder for future implementation
    // This would fetch from a manifest.json file in each directory
    return [];
}

/**
 * Create a project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="card-meta">
            <span class="date">${project.date}</span>
            ${project.tags ? `<span class="tags">${project.tags.join(', ')}</span>` : ''}
        </div>
        ${project.link ? `<a href="${project.link}" class="btn">View Project</a>` : ''}
    `;
    
    return card;
}

/**
 * Create a lab card element
 */
function createLabCard(lab) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <h3>${lab.title}</h3>
        <p>${lab.description}</p>
        <div class="card-meta">
            <span class="course">${lab.course}</span>
            <span class="date">${lab.date}</span>
        </div>
        ${lab.link ? `<a href="${lab.link}" class="btn">View Lab</a>` : ''}
    `;
    
    return card;
}

/**
 * Create an experiment card element
 */
function createExperimentCard(experiment) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <h3>${experiment.title}</h3>
        <p>${experiment.description}</p>
        <div class="card-meta">
            <span class="status">${experiment.status}</span>
            <span class="date">${experiment.date}</span>
        </div>
        ${experiment.link ? `<a href="${experiment.link}" class="btn">View Experiment</a>` : ''}
    `;
    
    return card;
}

/**
 * Create a note card element
 */
function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.summary}</p>
        <div class="card-meta">
            <span class="topic">${note.topic}</span>
            <span class="date">${note.date}</span>
        </div>
        ${note.link ? `<a href="${note.link}" class="btn">Read More</a>` : ''}
    `;
    
    return card;
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
