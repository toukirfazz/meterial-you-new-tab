// Background service worker for Material You New Tab extension

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings on first install
    chrome.storage.sync.set({
      accentColor: '#6750a4',
      tiles: [
        { name: 'YouTube', url: 'https://youtube.com', color: '#ff0000', icon: '▶️' },
        { name: 'Gmail', url: 'https://gmail.com', color: '#ea4335', icon: '📧' },
        { name: 'GitHub', url: 'https://github.com', color: '#24292e', icon: '🐙' },
        { name: 'Twitter', url: 'https://twitter.com', color: '#1da1f2', icon: '🐦' },
        { name: 'Facebook', url: 'https://facebook.com', color: '#1877f2', icon: '📘' },
        { name: 'Instagram', url: 'https://instagram.com', color: '#e4405f', icon: '📷' },
        { name: 'Netflix', url: 'https://netflix.com', color: '#e50914', icon: '🎬' },
        { name: 'Spotify', url: 'https://spotify.com', color: '#1db954', icon: '🎵' }
      ]
    });
  }
});

// Handle extension updates
chrome.runtime.onStartup.addListener(() => {
  console.log('Material You New Tab extension started');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(['accentColor', 'tiles'], (result) => {
      sendResponse(result);
    });
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'saveSettings') {
    chrome.storage.sync.set(request.data, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

