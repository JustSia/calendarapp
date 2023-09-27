console.log('App is running!');

function saveToLocalStorage() {
    const sections = [...document.querySelectorAll('.section')].map(section => {
        const sectionTitle = section.querySelector('h2').textContent;
        const subsections = [...section.querySelectorAll('.list-group-item')].map(subsection => subsection.querySelector('span').textContent);
        return { sectionTitle, subsections };
    });
    
    localStorage.setItem('sections', JSON.stringify(sections));
}

function loadFromLocalStorage() {
    const sections = JSON.parse(localStorage.getItem('sections')) || [];
    
    sections.forEach(({ sectionTitle, subsections }) => {
        const section = createSection(sectionTitle);
        sectionsContainer.appendChild(section);
        
        subsections.forEach(subsectionTitle => {
            const subsectionList = section.querySelector('.list-group');
            const subsection = createSubsection(subsectionTitle);
            subsectionList.appendChild(subsection);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    const sectionForm = document.getElementById('section-form');
    const sectionsContainer = document.getElementById('sections-container');
    
    sectionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission behavior
        const sectionForm = document.getElementById('section-form');
        const sectionsContainer = document.getElementById('sections-container');
  
        const sectionInput = document.getElementById('section-input');
        const sectionName = sectionInput.value.trim(); // Gets the user input
        
        if (sectionName) {
            const newSection = createSection(sectionName);
            sectionsContainer.appendChild(newSection);
            sectionInput.value = ''; // Clears the input field
            alert('Section added successfully!'); // User feedback
        }
    });
});

function createSection(sectionName) {
    const section = document.createElement('div');
    section.className = 'section';

    const title = document.createElement('h2');
    title.className = 'd-inline-block mr-2';
    title.textContent = sectionName;
    section.appendChild(title);

    title.addEventListener('click', function() {
        subsectionList.style.display = subsectionList.style.display === 'none' ? 'block' : 'none';
    });

    const deleteSectionButton = document.createElement('button');
    deleteSectionButton.textContent = '×';
    deleteSectionButton.className = 'btn btn-link btn-delete';
    deleteSectionButton.addEventListener('click', function() {
        section.remove();
        saveToLocalStorage(); // Save to localStorage when a section is deleted
    });
    section.appendChild(deleteSectionButton);

    const subsectionForm = document.createElement('form');
    const subsectionInput = document.createElement('input');
    subsectionInput.type = 'text';
    subsectionInput.placeholder = 'Add a new subsection';
    subsectionInput.required = true;
    subsectionForm.appendChild(subsectionInput);

    const addSubsectionButton = document.createElement('button');
    addSubsectionButton.type = 'submit';
    addSubsectionButton.textContent = 'Add Subsection';
    subsectionForm.appendChild(addSubsectionButton);

    const subsectionList = document.createElement('ul');
    subsectionList.className = 'list-group';
    section.appendChild(subsectionList);

    subsectionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const subsectionName = subsectionInput.value.trim();
        if (subsectionName) {
            const newSubsection = createSubsection(subsectionName);
            subsectionList.appendChild(newSubsection);
            subsectionInput.value = '';
            saveToLocalStorage(); // Save to localStorage when a new subsection is added
        }
    });

    section.appendChild(subsectionForm);

    saveToLocalStorage(); // Save to localStorage when a new section is created
    return section;
}

function createSubsection(subsectionName) {
    const subsection = document.createElement('li');
    subsection.className = 'list-group-item d-flex justify-content-between align-items-center';

    const title = document.createElement('span');
    title.textContent = subsectionName;
    subsection.appendChild(title);

    const deleteSubsectionButton = document.createElement('button');
    deleteSubsectionButton.textContent = '×';
    deleteSubsectionButton.className = 'btn btn-link btn-delete';
    deleteSubsectionButton.addEventListener('click', function() {
        subsection.remove();
        saveToLocalStorage(); // Save to localStorage when a subsection is deleted
    });
    subsection.appendChild(deleteSubsectionButton);

    return subsection;
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:3000/sections');
        
        if(!response.ok) { // Check if response went through
            throw Error(`HTTP error! Status: ${response.status}`);
        }
        
        const sections = await response.json();
        
        // Assuming sectionsContainer is the container where you want to append your sections
        const sectionsContainer = document.getElementById('sections-container');
        
        sections.forEach(section => {
            const newSection = createSection(section.name);
            sectionsContainer.appendChild(newSection);
            
            // Assuming each section has a subsections array
            section.subsections.forEach(subsectionName => {
                const subsectionList = newSection.querySelector('.list-group');
                const newSubsection = createSubsection(subsectionName);
                subsectionList.appendChild(newSubsection);
            });
        });
    } catch (error) {
        console.error('Fetch error: ', error); // Log error to console if anything goes wrong during the fetch
    }
});

