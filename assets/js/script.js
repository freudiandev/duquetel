const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Rutas
const imageDir = path.join(__dirname, 'assets', 'images');
const optimizedDir = path.join(__dirname, 'assets', 'images-optimized');

// Crear directorio para imágenes optimizadas si no existe
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
}

// Optimizar imágenes
async function optimizeImages() {
    try {
        const files = fs.readdirSync(imageDir);
        
        for (const file of files) {
            const inputPath = path.join(imageDir, file);
            if (!fs.statSync(inputPath).isFile()) continue;
            
            const ext = path.extname(file).toLowerCase();
            const baseName = path.basename(file, ext);
            
            // Optimizar según el tipo de archivo
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                // Crear versión WebP
                const webpOutput = path.join(optimizedDir, `${baseName}.webp`);
                await sharp(inputPath)
                    .webp({ quality: 85 })
                    .toFile(webpOutput);
                
                // Optimizar original
                const optimizedOutput = path.join(optimizedDir, file);
                await sharp(inputPath)
                    .jpeg({ quality: 85, progressive: true })
                    .toFile(optimizedOutput);
                
                console.log(`✓ Optimizado: ${file} → Tamaño WebP: ${(fs.statSync(webpOutput).size / 1024).toFixed(2)} KB`);
            }
        }
        
        console.log('¡Optimización completa! Las imágenes optimizadas están en /assets/images-optimized/');
        
    } catch (error) {
        console.error('Error al optimizar imágenes:', error);
    }
}

optimizeImages();
