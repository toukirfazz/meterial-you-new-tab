// Popup script for Material You New Tab extension

document.addEventListener('DOMContentLoaded', () => {
    const accentColorInput = document.getElementById('accentColor');
    const colorPreview = document.getElementById('colorPreview');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Load current settings
    chrome.storage.sync.get(['accentColor'], (result) => {
        if (result.accentColor) {
            accentColorInput.value = result.accentColor;
            colorPreview.textContent = result.accentColor;
            updatePreviewColor(result.accentColor);
        }
    });
    
    // Update color preview
    accentColorInput.addEventListener('input', (e) => {
        const color = e.target.value;
        colorPreview.textContent = color;
        updatePreviewColor(color);
    });
    
    // Save settings
    saveBtn.addEventListener('click', () => {
        const accentColor = accentColorInput.value;
        
        chrome.storage.sync.set({ accentColor }, () => {
            // Show success feedback
            saveBtn.textContent = 'Saved!';
            setTimeout(() => {
                saveBtn.textContent = 'Save';
                window.close();
            }, 1000);
        });
    });
    
    // Reset to default
    resetBtn.addEventListener('click', () => {
        const defaultColor = '#6750a4';
        accentColorInput.value = defaultColor;
        colorPreview.textContent = defaultColor;
        updatePreviewColor(defaultColor);
    });
    
    function updatePreviewColor(color) {
        document.body.style.background = `linear-gradient(135deg, ${color} 0%, ${adjustLightness(color, -20)} 100%)`;
    }
    
    function adjustLightness(hex, percent) {
        // Convert hex to RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        // Adjust lightness
        const factor = 1 + percent / 100;
        const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
        const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
        const newB = Math.min(255, Math.max(0, Math.round(b * factor)));
        
        // Convert back to hex
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
});

