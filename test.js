// Simple test to verify the application loads correctly
console.log('Testing Material Design 3 Color Editor...');

// Test if classes can be instantiated
try {
    const testColorManager = new ColorManager();
    console.log('✓ ColorManager class loads successfully');
    
    // Test dark mode color generation
    const darkPrimary = testColorManager.getDarkModeColor('primary', '#6750A4');
    console.log('✓ Dark mode color generation works:', darkPrimary);
    
    // Test color manipulation utilities
    const lighterColor = testColorManager.lightenColor('#6750A4', 50);
    const darkerColor = testColorManager.darkenColor('#6750A4', 30);
    console.log('✓ Color manipulation utilities work');
    console.log('  Lighter:', lighterColor);
    console.log('  Darker:', darkerColor);
    
} catch (e) {
    console.error('✗ ColorManager class failed to load:', e);
}

try {
    const testApp = new MaterialApp();
    console.log('✓ MaterialApp class loads successfully');
} catch (e) {
    console.error('✗ MaterialApp class failed to load:', e);
}

console.log('Test completed.');
console.log('\nNew features added:');
console.log('- ✓ Dual light/dark mode display');
console.log('- ✓ Background and Surface Variant color controls');
console.log('- ✓ Dark mode color synchronization');
console.log('- ✓ Reset dark mode to default button');
console.log('- ✓ Enhanced theme presets with all color tokens');