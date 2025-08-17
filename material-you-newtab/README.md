# Material You New Tab Extension

A modern, customizable new tab page for Chrome and Edge browsers, inspired by Google's Material You design language. Features dynamic backgrounds, customizable quick-access tiles, and a responsive design that adapts to your system's accent color.

## Features

### 🎨 Dynamic Material You Design
- **Adaptive Color Theming**: Automatically adapts to your system accent color or choose your own
- **Soft Gradient Backgrounds**: Beautiful, animated gradient backgrounds with floating organic shapes
- **Glass Morphism Effects**: Modern blur and transparency effects throughout the interface
- **Smooth Animations**: Subtle animations and transitions for a polished experience

### 🔍 Smart Search Bar
- **Universal Search**: Search Google or navigate directly to URLs
- **Ripple Effects**: Interactive feedback with Material Design ripple animations
- **Keyboard Shortcuts**: Press Enter to search or navigate
- **Auto-detection**: Automatically detects URLs vs search queries

### 📱 Customizable Quick Access
- **Favorite Websites**: Add, remove, and reorder your most-visited sites
- **Dynamic Colors**: Tile colors automatically extracted from website favicons
- **Emoji Icons**: Clean emoji-based icons for instant recognition
- **Hover Effects**: Smooth hover animations with elevation changes

### 🌤️ Weather Widget
- **Current Conditions**: Display current temperature and weather conditions
- **Clean Design**: Minimalist weather display in the bottom-right corner
- **Responsive**: Adapts to different screen sizes

### ⏰ Date & Time Display
- **Live Updates**: Real-time clock that updates every minute
- **Clean Typography**: Bold, readable fonts following Material Design guidelines
- **Responsive**: Scales appropriately on mobile devices

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes from mobile to desktop
- **Touch-Friendly**: Large touch targets for mobile interaction
- **Adaptive Layout**: Grid layout adjusts based on screen size

## Installation

### Method 1: Load as Unpacked Extension (Development)

1. **Download the Extension**
   - Download all files from the `material-you-newtab` folder
   - Keep all files in the same directory structure

2. **Open Chrome/Edge Extensions Page**
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `material-you-newtab` folder
   - The extension should now appear in your extensions list

5. **Verify Installation**
   - Open a new tab to see your new Material You new tab page
   - The extension icon should appear in your browser toolbar

### Method 2: Package and Install (Recommended)

1. **Package the Extension**
   - In Chrome/Edge extensions page, click "Pack extension"
   - Select the `material-you-newtab` folder as the extension root
   - This creates a `.crx` file and a `.pem` key file

2. **Install the Package**
   - Drag and drop the `.crx` file onto the extensions page
   - Click "Add extension" when prompted

## Usage

### Basic Usage
- **New Tab**: Simply open a new tab to see your Material You new tab page
- **Search**: Click the search bar and type to search Google or enter a URL
- **Quick Access**: Click any tile to navigate to that website

### Customization

#### Adding New Tiles
1. Click the settings button (⚙️) in the top-right corner
2. Enter the website name and URL in the modal
3. Click "Add Tile" to add it to your quick access grid
4. The tile color will be automatically generated based on the website name

#### Changing Accent Color
1. Click the settings button (⚙️) in the top-right corner
2. Use the color picker to select your preferred accent color
3. Click "Save" to apply the new color theme
4. The entire interface will adapt to your chosen color

#### Removing Tiles
1. Hover over any tile you want to remove
2. Click the "×" button that appears in the top-right corner of the tile
3. The tile will be immediately removed from your grid

#### Using the Extension Popup
1. Click the extension icon in your browser toolbar
2. Use the popup to quickly change your accent color
3. Click "Reset" to return to the default Material You purple
4. Click "Save" to apply changes

### Keyboard Shortcuts
- **Enter**: Search or navigate when the search bar is focused
- **Escape**: Close the settings modal

## Technical Details

### File Structure
```
material-you-newtab/
├── index.html          # Main new tab page
├── styles.css          # All CSS styles and animations
├── script.js           # Main JavaScript functionality
├── manifest.json       # Chrome extension manifest
├── background.js       # Extension background service worker
├── popup.html          # Extension popup interface
├── popup.js           # Popup JavaScript
├── icons/             # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md          # This documentation
```

### Technologies Used
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with custom properties, grid, flexbox
- **JavaScript ES6+**: Modern JavaScript with classes and modules
- **Chrome Extension API**: Manifest V3 for modern extension development
- **Local Storage**: Persistent storage for user preferences
- **Chrome Storage API**: Sync storage across devices

### Browser Compatibility
- **Chrome**: Version 88+ (Manifest V3 support)
- **Edge**: Version 88+ (Chromium-based)
- **Other Chromium Browsers**: Should work with Manifest V3 support

### Performance Features
- **Optimized Animations**: Hardware-accelerated CSS animations
- **Efficient Storage**: Minimal data storage with smart defaults
- **Fast Loading**: Optimized CSS and JavaScript for quick page loads
- **Memory Efficient**: Clean event handling and minimal DOM manipulation

## Customization Options

### Color Theming
The extension uses CSS custom properties for easy theming:
- `--primary-color`: Main accent color
- `--primary-light`: Lighter variant of accent color
- `--primary-dark`: Darker variant of accent color
- `--gradient-*`: Dynamic gradient colors based on accent color

### Default Tiles
The extension comes with 8 pre-configured tiles:
- YouTube (Red)
- Gmail (Red)
- GitHub (Dark)
- Twitter (Blue)
- Facebook (Blue)
- Instagram (Gradient)
- Netflix (Red)
- Spotify (Green)

### Weather Integration
Currently uses mock weather data for demonstration. To integrate real weather:
1. Sign up for a weather API service (e.g., OpenWeatherMap)
2. Replace the mock data in the `WeatherWidget` class
3. Add your API key to the extension

## Troubleshooting

### Extension Not Loading
- Ensure all files are in the correct directory structure
- Check that Developer mode is enabled
- Verify the manifest.json file is valid
- Check the browser console for error messages

### Tiles Not Saving
- Check if the extension has storage permissions
- Verify that Chrome sync is enabled for cross-device sync
- Clear extension data and reconfigure if needed

### Styling Issues
- Ensure the Google Fonts are loading properly
- Check if any other extensions are interfering with CSS
- Verify that the browser supports modern CSS features

### Performance Issues
- Disable other extensions temporarily to test
- Check if hardware acceleration is enabled in browser settings
- Reduce the number of tiles if experiencing slowdowns

## Privacy & Security

### Data Collection
- **No External Data Collection**: The extension does not send any data to external servers
- **Local Storage Only**: All preferences are stored locally or in Chrome sync storage
- **No Tracking**: No analytics or tracking code included

### Permissions Used
- **Storage**: For saving user preferences and tile configurations
- **New Tab Override**: To replace the default new tab page

### Security Features
- **Content Security Policy**: Strict CSP prevents code injection
- **No External Scripts**: All code is contained within the extension
- **Safe URL Handling**: Proper URL validation and sanitization

## Contributing

### Development Setup
1. Clone or download the extension files
2. Make your changes to the source files
3. Test by loading the unpacked extension
4. Submit improvements or bug fixes

### Code Style
- Use modern JavaScript (ES6+)
- Follow Material Design guidelines for UI changes
- Maintain responsive design principles
- Add comments for complex functionality

### Reporting Issues
- Check existing issues before creating new ones
- Provide detailed steps to reproduce problems
- Include browser version and extension version
- Attach screenshots for visual issues

## License

This project is open source and available under the MIT License. Feel free to modify and distribute according to the license terms.

## Acknowledgments

- **Google Material Design Team**: For the Material You design language
- **Material Design Icons**: For design inspiration
- **Chrome Extension Documentation**: For development guidance

---

**Version**: 1.0.0  
**Last Updated**: August 2025  
**Compatibility**: Chrome 88+, Edge 88+

