# Timeline Generator

This project is a tool to generate and display different types of timelines. It is built with HTML, CSS, and JavaScript.

## How to Use

1.  Open the `index.html` file in a web browser.
2.  Select a start date from the date picker.
3.  Choose a timeline type from the dropdown menu.
4.  Click the "Перейти" (Go) button to view the generated timeline.
5.  You can download the timeline as a PNG image by clicking the "Download" button.

## How to Add or Edit Timelines

The timeline data is stored in the `timeline-data.js` file. You can add or edit timelines by modifying the `timelineData` object in this file.

**Important:** Do not use AI to update the content of `timeline-data.js`, unless for minor typo fixes. The content of this file is business-critical and should be managed carefully.

### Adding a New Timeline

To add a new timeline, add a new key-value pair to the `timelineData` object. The key will be the identifier for your timeline, and the value will be an object with the following properties:

*   `title`: The title of the timeline.
*   `events`: An array of event objects.

Each event object has the following properties:

*   `title`: The title of the event.
*   `description`: A description of the event.
*   `badge`: The color of the badge for the event (e.g., `badge-danger`, `badge-warning`, `badge-success`, `badge-primary`).
*   `days` (optional): The number of days from the start date when the event occurs. 

After adding the new timeline data, you also need to add a new `<option>` to the `<select>` element in `index.html` to make it available in the dropdown menu.

### The `days` key

If the `days` key is omitted from an event, no date will be displayed for that event. 

If all events in a timeline are missing the `days` key, the entire timeline will be aligned to the left, and the vertical connecting line will still be displayed.

### Editing an Existing Timeline

To edit an existing timeline, simply modify the corresponding data in the `timeline-data.js` file.
