# Con Tour Rugby Program

A professional rugby tour program designed for PDF generation with proper A4 page formatting.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm

## Installation

```bash
npm install
```

This will install all required dependencies including Playwright for PDF generation.

## Generate PDF

To generate the tour program PDF, run:

```bash
node export-pdf.js
```

This will create a `tour-program.pdf` file in the project root directory.

### Alternative: Using pagedjs-cli

You can also use the pagedjs-cli package:

```bash
npm run pdf
```

## View in Browser

To preview the program in a browser, you can:

1. Open `index.html` directly in a browser, or
2. Start a local server:

```bash
# Using Python
python3 -m http.server 8080

# Then open http://localhost:8080 in your browser
```

## Project Structure

```
├── index.html          # Main HTML file with all pages
├── export-pdf.js       # Playwright script for PDF generation
├── package.json        # Node.js dependencies
├── images/             # Image assets
│   ├── image.png       # Cover background
│   ├── crest.png       # Team crest
│   └── kearys_sponsor.png  # Sponsor image
└── README.md           # This file
```

## PDF Output

The generated PDF contains 7 A4 pages:

1. **Cover** - Tour title and key information
2. **Welcome** - Message from the coach
3. **Match Schedule** - Upcoming matches
4. **Squad** - Team roster
5. **Itinerary** - Day-by-day tour schedule
6. **Destinations** - Cities to visit
7. **Sponsor** - Sponsor acknowledgment

## Customization

Edit `index.html` to customize:
- Team information
- Match schedules
- Player details
- Itinerary
- Sponsor content
- Images (replace files in `/images` folder)
