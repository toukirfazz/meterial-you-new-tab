// Material You New Tab Page JavaScript

class MaterialYouNewTab {
    constructor() {
        this.defaultTiles = [
            { name: 'YouTube', url: 'https://youtube.com', color: '#ff0000', icon: '▶️' },
            { name: 'Gmail', url: 'https://gmail.com', color: '#ea4335', icon: '📧' },
            { name: 'GitHub', url: 'https://github.com', color: '#24292e', icon: '🐙' },
            { name: 'Twitter', url: 'https://twitter.com', color: '#1da1f2', icon: '🐦' },
            { name: 'Facebook', url: 'https://facebook.com', color: '#1877f2', icon: '📘' },
            { name: 'Instagram', url: 'https://instagram.com', color: '#e4405f', icon: '📷' },
            { name: 'Netflix', url: 'https://netflix.com', color: '#e50914', icon: '🎬' },
            { name: 'Spotify', url: 'https://spotify.com', color: '#1db954', icon: '🎵' }
        ];
        
        this.tiles = this.loadTiles();
        this.accentColor = this.loadAccentColor();
        
        this.init();
    }
    
    init() {
        this.updateDateTime();
        this.renderTiles();
        this.setupEventListeners();
        this.updateTheme();
        this.setupRippleEffect();
        
        // Update time every minute
        setInterval(() => this.updateDateTime(), 60000);
    }
    
    updateDateTime() {
        const now = new Date();
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
        
        timeElement.textContent = timeString;
        dateElement.textContent = dateString;
    }
    
    renderTiles() {
        const container = document.getElementById('tilesContainer');
        container.innerHTML = '';
        
        this.tiles.forEach((tile, index) => {
            const tileElement = this.createTileElement(tile, index);
            container.appendChild(tileElement);
        });
    }
    
    createTileElement(tile, index) {
        const tileDiv = document.createElement('a');
        tileDiv.className = 'tile';
        tileDiv.href = tile.url;
        tileDiv.target = '_blank';
        tileDiv.style.setProperty('--tile-color', tile.color);
        
        tileDiv.innerHTML = `
            <div class="tile-icon">
                ${tile.favicon ? `<img src="${tile.favicon}" alt="${tile.name}">` : tile.icon}
            </div>
            <div class="tile-name">${tile.name}</div>
            <button class="tile-remove" onclick="event.preventDefault(); newTab.removeTile(${index})">&times;</button>
        `;
        
        return tileDiv;
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch(searchInput.value);
            }
        });
        
        // Settings modal
        const settingsBtn = document.getElementById('settingsBtn');
        const modalOverlay = document.getElementById('modalOverlay');
        const closeModal = document.getElementById('closeModal');
        
        settingsBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });
        
        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
        
        // Add tile functionality
        const addTileBtn = document.getElementById('addTile');
        addTileBtn.addEventListener('click', () => {
            this.addTile();
        });
        
        // Color picker
        const accentColorPicker = document.getElementById('accentColor');
        accentColorPicker.value = this.accentColor;
        accentColorPicker.addEventListener('change', (e) => {
            this.updateAccentColor(e.target.value);
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modalOverlay.classList.remove('active');
            }
        });
    }
    
    setupRippleEffect() {
        const searchBar = document.getElementById('searchBar');
        const ripple = document.getElementById('ripple');
        
        searchBar.addEventListener('click', (e) => {
            const rect = searchBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'scale(0)';
            ripple.style.opacity = '1';
            
            // Trigger animation
            requestAnimationFrame(() => {
                ripple.style.transform = 'scale(4)';
                ripple.style.opacity = '0';
            });
        });
    }
    
    handleSearch(query) {
        if (!query.trim()) return;
        
        // Check if it's a URL
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        
        if (urlPattern.test(query)) {
            // Add protocol if missing
            const url = query.startsWith('http') ? query : 'https://' + query;
            window.open(url, '_blank');
        } else {
            // Search on Google
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    }
    
    addTile() {
        const nameInput = document.getElementById('siteName');
        const urlInput = document.getElementById('siteUrl');
        
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        
        if (!name || !url) {
            alert('Please enter both name and URL');
            return;
        }
        
        // Extract color from favicon (simplified)
        const color = this.generateColorFromString(name);
        const icon = name.charAt(0).toUpperCase();
        
        const newTile = {
            name,
            url: url.startsWith('http') ? url : 'https://' + url,
            color,
            icon
        };
        
        this.tiles.push(newTile);
        this.saveTiles();
        this.renderTiles();
        
        // Clear inputs
        nameInput.value = '';
        urlInput.value = '';
        
        // Close modal
        document.getElementById('modalOverlay').classList.remove('active');
    }
    
    removeTile(index) {
        this.tiles.splice(index, 1);
        this.saveTiles();
        this.renderTiles();
    }
    
    generateColorFromString(str) {
        // Simple hash function to generate consistent colors
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        // Convert to HSL for better color distribution
        const hue = Math.abs(hash) % 360;
        const saturation = 60 + (Math.abs(hash) % 40); // 60-100%
        const lightness = 45 + (Math.abs(hash) % 20); // 45-65%
        
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    updateAccentColor(color) {
        this.accentColor = color;
        this.updateTheme();
        this.saveAccentColor();
    }
    
    updateTheme() {
        const root = document.documentElement;
        
        // Convert hex to HSL for better color manipulation
        const hsl = this.hexToHsl(this.accentColor);
        
        root.style.setProperty('--primary-color', this.accentColor);
        root.style.setProperty('--primary-light', this.adjustLightness(this.accentColor, 20));
        root.style.setProperty('--primary-dark', this.adjustLightness(this.accentColor, -20));
        
        // Update gradient colors based on accent color
        const gradients = this.generateGradientColors(hsl);
        gradients.forEach((color, index) => {
            root.style.setProperty(`--gradient-${index + 1}`, color);
        });
    }
    
    hexToHsl(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return [h * 360, s * 100, l * 100];
    }
    
    adjustLightness(hex, percent) {
        const [h, s, l] = this.hexToHsl(hex);
        const newL = Math.max(0, Math.min(100, l + percent));
        return `hsl(${h}, ${s}%, ${newL}%)`;
    }
    
    generateGradientColors(baseHsl) {
        const [h, s, l] = baseHsl;
        return [
            `hsl(${(h + 30) % 360}, ${Math.max(40, s - 20)}%, ${Math.max(40, l - 10)}%)`,
            `hsl(${(h + 60) % 360}, ${Math.max(40, s - 10)}%, ${Math.max(35, l - 15)}%)`,
            `hsl(${(h + 120) % 360}, ${Math.max(50, s)}%, ${Math.max(45, l - 5)}%)`,
            `hsl(${(h + 180) % 360}, ${Math.max(45, s - 15)}%, ${Math.max(40, l - 10)}%)`,
            `hsl(${(h + 240) % 360}, ${Math.max(50, s - 5)}%, ${Math.max(45, l)}%)`,
            `hsl(${(h + 300) % 360}, ${Math.max(40, s - 20)}%, ${Math.max(50, l + 5)}%)`
        ];
    }
    
    loadTiles() {
        const saved = localStorage.getItem('materialYouTiles');
        return saved ? JSON.parse(saved) : this.defaultTiles;
    }
    
    saveTiles() {
        localStorage.setItem('materialYouTiles', JSON.stringify(this.tiles));
    }
    
    loadAccentColor() {
        return localStorage.getItem('materialYouAccentColor') || '#6750a4';
    }
    
    saveAccentColor() {
        localStorage.setItem('materialYouAccentColor', this.accentColor);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.newTab = new MaterialYouNewTab();
});

// Weather API integration (simplified)
class WeatherWidget {
    constructor() {
        this.updateWeather();
    }
    
    async updateWeather() {
        try {
            // For demo purposes, we'll use a mock weather data
            // In a real implementation, you'd use a weather API like OpenWeatherMap
            const mockWeatherData = {
                temperature: Math.floor(Math.random() * 30) + 60, // 60-90°F
                condition: ['Sunny', 'Partly cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
                icon: this.getWeatherIcon('partly-cloudy')
            };
            
            this.displayWeather(mockWeatherData);
        } catch (error) {
            console.error('Weather update failed:', error);
        }
    }
    
    displayWeather(data) {
        const widget = document.getElementById('weatherWidget');
        const temp = widget.querySelector('.weather-temp');
        const desc = widget.querySelector('.weather-desc');
        
        temp.textContent = `${data.temperature}°`;
        desc.textContent = data.condition;
    }
    
    getWeatherIcon(condition) {
        const icons = {
            'sunny': '☀️',
            'partly-cloudy': '⛅',
            'cloudy': '☁️',
            'rainy': '🌧️',
            'snowy': '❄️'
        };
        return icons[condition] || '⛅';
    }
}

// Initialize weather widget
document.addEventListener('DOMContentLoaded', () => {
    new WeatherWidget();
});

