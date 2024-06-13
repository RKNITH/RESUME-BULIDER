function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const website = document.getElementById('website').value;
    const linkedin = document.getElementById('linkedin').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value.split(',');
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const image = document.getElementById('image').files[0];

    const resumeOutput = document.getElementById('resume-output');
    resumeOutput.style.display = 'block';

    let imageTag = '';
    if (image) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageTag = `<img src="${e.target.result}" alt="Profile Picture">`;
            renderResume();
        };
        reader.readAsDataURL(image);
    } else {
        renderResume();
    }

    function renderResume() {
        const resumeContent = `
            <div class="resume-header">
                ${imageTag}
                <div>
                    <h2>${name}</h2>
                    <p>${email}</p>
                    <p>${phone}</p>
                    <p>${address}</p>
                    ${website ? `<p><a href="${website}" target="_blank">${website}</a></p>` : ''}
                    ${linkedin ? `<p><a href="${linkedin}" target="_blank">${linkedin}</a></p>` : ''}
                </div>
            </div>
            <div class="resume-section">
                <h3>Summary</h3>
                <p>${summary}</p>
            </div>
            <div class="resume-section">
                <h3>Skills</h3>
                <ul>
                    ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
                </ul>
            </div>
            <div class="resume-section">
                <h3>Experience</h3>
                <p>${experience.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="resume-section">
                <h3>Education</h3>
                <p>${education.replace(/\n/g, '<br>')}</p>
            </div>
        `;

        resumeOutput.innerHTML = resumeContent;

        // Create download button dynamically
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download Resume';
        downloadButton.style.marginTop = '20px';
        downloadButton.onclick = function () {
            downloadResume(resumeContent);
        };

        resumeOutput.appendChild(downloadButton);
    }

    function downloadResume(content) {
        const element = document.createElement('div');
        element.innerHTML = content;
        html2pdf()
            .from(element)
            .save('resume.pdf');
    }
}
