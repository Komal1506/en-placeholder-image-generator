# en-placeholder-image-generator
The package provides a utility to generate customizable placeholder images with text on a canvas, supporting dynamic dimensions, fonts, and background colors.
<<<<<<< HEAD
=======



Certainly! Here's the complete readme file for PlaceholderImageGenerator with the added section on configuration issues and solutions:


# Placeholder Image Generator

Generate customizable placeholder images easily with PlaceholderImageGenerator.

## Installation

Install the package using npm:

```bash
$ npm install enhanced-placeholder-image-generator
```

## Features

Set dimensions, background color, text color, font, text content, border color, and width.
Save generated images locally in different formats (PNG, JPEG, GIF).
Delete generated images.
Draw various shapes: circles, rectangles, ovals, triangles, and polygons.

## Usage

```javascript
import PlaceholderImageGenerator from 'enhanced-placeholder-image-generator';

// Create an instance of PlaceholderImageGenerator
const generator = new PlaceholderImageGenerator();

// Set properties (optional, adjust as needed)
generator.setDimensions(500, 500)
         .setBackgroundColor('#FFDDC1')
         .setTextColor('#333333')
         .setFont('40px Arial')
         .setText('Hello World')
         .setBorderColor('#000000')
         .setBorderWidth(5)
         .setTextPosition(250, 250)
         .setImageQuality(0.95);

// Save the image
generator.saveImageAsync('jpeg', 'output-image.jpeg')
    .then((message) => {
        console.log(message);
    })
    .catch((err) => {
        console.error('Error saving image:', err.message);
    });

// Delete the image (optional)
generator.deleteImageAsync('output-image.jpeg')
    .then((message) => {
        console.log(message);
    })
    .catch((err) => {
        console.error('Error deleting image:', err.message);
    });

// Draw shapes
generator.drawCircle(250, 250, 50, '#FF0000');
generator.drawRectangle(50, 50, 100, 200, '#00FF00');
generator.drawOval(150, 150, 50, 100, '#0000FF');
generator.drawTriangle(100, 100, 150, 200, 50, 200, '#FFFF00');
generator.drawPolygon([[300, 100], [350, 150], [300, 200], [250, 150]], '#FF00FF');

// Generate the image (needed to save or display the image)
generator.draw();  // Ensure the image is drawn before saving
```

## Commands

Install Package: npm install enhanced-placeholder-image-generator
Set Dimensions: .setDimensions(width, height)
Set Background Color: .setBackgroundColor(color)
Set Text Color: .setTextColor(color)
Set Font: .setFont(font)
Set Text: .setText(text)
Set Border Color: .setBorderColor(color)
Set Border Width: .setBorderWidth(width)
Set Text Position: .setTextPosition(x, y)
Set Image Quality: .setImageQuality(quality)
Save Image: .saveImageAsync(format, filename)
Delete Image: .deleteImageAsync(filename)
Draw Circle: .drawCircle(x, y, radius, color)
Draw Rectangle: .drawRectangle(x, y, width, height, color)
Draw Oval: .drawOval(x, y, radiusX, radiusY, color)
Draw Triangle: .drawTriangle(x1, y1, x2, y2, x3, y3, color)
Draw Polygon: .drawPolygon(points, color)


## Configuration Issues and Solutions

- **Module Not Found Error**: If encountering a "module not found" error, ensure your project's `package.json` includes `"type": "module"` if using ES Modules in Node.js. Add this line to your `package.json`:

```json
{
  "type": "module"
}
```

- **Permission Denied**: If permissions prevent image saving or deletion, ensure the directory has write permissions or run Node.js with appropriate privileges.

- **Unsupported Node.js Version**: Check if your Node.js version meets the minimum requirements specified by the package.

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
```

update in new version

### Summary of Changes:

1. **Updated Method Names**: Changed `saveImage` to `saveImageAsync` and `deleteImage` to `deleteImageAsync`.
2. **Added Shape Drawing**: Included commands and usage examples for drawing shapes.
3. **Added Draw Method**: Added usage of the `draw()` method to generate the image before saving or displaying.


```



>>>>>>> f2e2c8cb688da26a01912b0099c0143f7bb6f99d
