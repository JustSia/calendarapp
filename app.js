console.log('App is running!');

document.addEventListener('DOMContentLoaded', function() {
    const sectionForm = document.getElementById('section-form');
    const sectionsContainer = document.getElementById('sections-container');
    
    sectionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission behavior
        
        const sectionInput = document.getElementById('section-input');
        const sectionName = sectionInput.value.trim(); // Gets the user input
        
        if (sectionName) {
            const newSection = createSection(sectionName);
            sectionsContainer.appendChild(newSection);
            sectionInput.value = ''; // Clears the input field
        }
    });
});

function createSection(sectionName) {
    const section = document.createElement('div');
    section.className = 'section';
    
    const title = document.createElement('h2');
    title.className = 'd-inline-block mr-2'; // Added Bootstrap class
    title.textContent = sectionName;
    section.appendChild(title);
    
    const deleteSectionButton = document.createElement('button');
    deleteSectionButton.textContent = '×'; // "×" symbol to represent delete
    deleteSectionButton.className = 'btn btn-link btn-delete'; // Added classes
    deleteSectionButton.addEventListener('click', function() {
        section.remove();
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
    
    subsectionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const subsectionName = subsectionInput.value.trim();
        if (subsectionName) {
            const newSubsection = createSubsection(subsectionName);
            section.appendChild(newSubsection);
            subsectionInput.value = '';
        }
    });
    
    section.appendChild(subsectionForm);
    
    return section;
}

function createSubsection(subsectionName) {
    const subsection = document.createElement('div');
    subsection.className = 'subsection';
    
    const title = document.createElement('h3');
    title.className = 'd-inline-block mr-2'; // Added Bootstrap class
    title.textContent = subsectionName;
    subsection.appendChild(title);
    
    const deleteSubsectionButton = document.createElement('button');
    deleteSubsectionButton.textContent = '×'; // "×" symbol to represent delete
    deleteSubsectionButton.className = 'btn btn-link btn-delete'; // Added classes
    deleteSubsectionButton.addEventListener('click', function() {
        subsection.remove();
    });
    subsection.appendChild(deleteSubsectionButton);
    
    return subsection;
}
