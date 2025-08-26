document.addEventListener("DOMContentLoaded", function () {

    // Function to download timeline section as an image
    document.getElementById("download-btn").addEventListener("click", function () {
        html2canvas(document.getElementById("timeline-card")).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "timeline.png";
            link.click();
        });
    });

    // Function to get URL query parameters
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(function (param) {
            const pair = param.split("=");
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        });
        return params;
    }

    // Get the query parameters
    const params = getQueryParams();
    const timelineType = params.type || 'asylum'; // Default to 'asylum' if no type is specified
    const timeline = timelineData[timelineType];

    if (timeline) {
        // Set timeline title
        document.getElementById('timeline-title').textContent = timeline.title;

        // Generate timeline events
        const timelineSection = document.getElementById('timeline-section');
        timeline.events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'vertical-timeline-item vertical-timeline-element';
            eventElement.innerHTML = `
                <div>
                    <span class="vertical-timeline-element-icon bounce-in">
                        <i class="badge badge-dot badge-dot-xl ${event.badge}"> </i>
                    </span>
                    <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">${event.title}</h4>
                        <p>${event.description}</p>
                        <span class="vertical-timeline-element-date" data-days="${event.days}"></span>
                    </div>
                </div>
            `;
            timelineSection.appendChild(eventElement);
        });
    }

    if (params.date) {
        // Parse the passed date parameter as UTC
        const [year, month, day] = params.date.split('-');
        const startDate = new Date(Date.UTC(year, month - 1, day)); // Create the date using UTC

        // Select all elements with class 'vertical-timeline-element-date'
        const dateElements = document.querySelectorAll('.vertical-timeline-element-date');

        // Loop through each element and update its content
        dateElements.forEach(function (element) {
            // Get the number of days from the data attribute
            const daysToAdd = parseInt(element.getAttribute('data-days'), 10);

            // Add the days to the start date (JS handles month overflow automatically)
            const updatedDate = new Date(startDate);
            updatedDate.setUTCDate(startDate.getUTCDate() + daysToAdd); // Correctly adds days in UTC

            // Format the updated date as dd/mm/yyyy
            const formattedDay = String(updatedDate.getUTCDate()).padStart(2, '0');
            const formattedMonth = String(updatedDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const formattedYear = updatedDate.getUTCFullYear();

            const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;

            // Update the content of the span
            element.textContent = formattedDate;
        });
    }
});