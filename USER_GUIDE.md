# Resume Builder User Guide

Resume Builder works best on a desktop.

## Building a Resume

1. Visit https://e-resume.vercel.app/
1. Select "Editor" in the top pane
1. Select "TEMPLATES" in the top pane and select your desired template
1. Select "COLOURS" in the top pane and select your desired color scheme
1. Update the sections in the right pane with your experience
1. When you're done, 
    - Export your data by selecting "Export" in the top pane. This will generate a JSON file that gets downloaded to your local device. Save this file for later use.
    - Download the resume as a PDF by selecting "DOWNLOAD AS PDF" in the top pane

## Editing a Resume
1. Visit https://e-resume.vercel.app/
1. Select "Editor" in the top pane
1. Select "Import" in the top pane. Import the JSON that was generated in the [Building a Resume](#building-a-resume) section.


## Using a LinkedIn Profile Image
1. Open your LinkedIn profile page.
1. Right-click your profile photo and choose **Copy Image Address**.
1. In Resume Builder, open **Basic → Contacts**.
1. Paste the copied link into the **Image URL** field.
1. The app displays the photo from the provided URL.

## Using Gemini AI Suggestions
1. Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
1. In the navigation bar, select **Gemini Key** and paste your key into the dialog. Save it to store the key locally.
1. Click **Generate with AI** buttons in the editor to have Gemini suggest content using your key.

## Running the environment locally or in Docker

Run the environment locally or in Docker by following the instructions at [Running the environment](RUN_ENVIRONMENT.MD).
