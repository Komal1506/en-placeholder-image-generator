
//update version

import { createCanvas, loadImage } from 'canvas';
import fs from 'fs/promises'; // Using fs.promises for asynchronous file handling

export default class PlaceholderImageGenerator {
  constructor() {
    this.width = 300;
    this.height = 300;
    this.bgColor = '#FFFFFF';
    this.textColor = '#000000';
    this.text = '';
    this.font = '30px Arial';
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d');
    this.borderColor = null;
    this.borderWidth = 0;
    this.textPosition = { x: null, y: null };
    this.imageQuality = 0.92; // Default JPEG quality
    this.shapesToDraw = [];   // Store shapes to be drawn later
  }

  // New features in the updated version

  setText(text = ' ', length = text.length) {
    this.text = text.slice(0, length);
    return this;
  }

  setDimensions(width = 300, height = 300) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }

  setFont(font = '30px Arial') {
    this.font = font;
    return this;
  }

  setBackgroundColor(color) {
    this.bgColor = color;
    return this;
  }

  setTextColor(color) {
    this.textColor = color;
    return this;
  }

  setBorderColor(color) {
    this.borderColor = color;
    return this;
  }

  setBorderWidth(width) {
    this.borderWidth = width;
    return this;
  }

  setTextPosition(x, y) {
    this.textPosition.x = x;
    this.textPosition.y = y;
    return this;
  }

  setImageQuality(quality) {
    if (quality >= 0 && quality <= 1) {
      this.imageQuality = quality;
    }
    return this;
  }

  async overlayImage(imagePath, x, y, width, height) {
    const image = await loadImage(imagePath);
    this.ctx.drawImage(image, x, y, width, height);
    return this;
  }

  _drawBackground() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  _drawBorder() {
    if (this.borderWidth > 0 && this.borderColor) {
      this.ctx.strokeStyle = this.borderColor;
      this.ctx.lineWidth = this.borderWidth;
      this.ctx.strokeRect(0, 0, this.width, this.height);
    }
  }

  _drawText() {
    this.ctx.fillStyle = this.textColor;
    this.ctx.font = this.font;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const x = this.textPosition.x !== null ? this.textPosition.x : this.width / 2;
    const y = this.textPosition.y !== null ? this.textPosition.y : this.height / 2;
    this.ctx.fillText(this.text, x, y);
  }

  // Method to draw a circle
  drawCircle(x, y, radius, color = '#000000') {
    this.shapesToDraw.push(() => {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.stroke();
    });
    return this;
  }

  // Method to draw a rectangle
  drawRectangle(x, y, width, height, color = '#000000') {
    this.shapesToDraw.push(() => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
      this.ctx.strokeRect(x, y, width, height);
    });
    return this;
  }

  // Method to draw an oval
  drawOval(x, y, radiusX, radiusY, color = '#000000') {
    this.shapesToDraw.push(() => {
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.stroke();
    });
    return this;
  }

  // Method to draw a triangle
  drawTriangle(x1, y1, x2, y2, x3, y3, color = '#000000') {
    this.shapesToDraw.push(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x3, y3);
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.stroke();
    });
    return this;
  }

  // Method to draw a polygon (hexagon, octagon, etc.)
  drawPolygon(points, color = '#000000') {
    this.shapesToDraw.push(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        this.ctx.lineTo(points[i][0], points[i][1]);
      }
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.stroke();
    });
    return this;
  }

  _drawShapes() {
    this.shapesToDraw.forEach((drawShape) => drawShape());
  }

  draw() {
    if (!this.width || !this.height) throw new Error('Set dimensions first.');
    if (!this.text) throw new Error('Set text first.');
    if (!this.bgColor) throw new Error('Set background color first.');
    this._drawBackground();
    this._drawBorder();
    this._drawText();
    this._drawShapes();  // Draw the shapes after text and background
    return this.canvas.toDataURL('image/png');
  }

  // Asynchronous image saving method
  async saveImageAsync(format = 'png', path = 'placeholder.png') {
    this.draw(); // Ensure the image is drawn before saving
    let buffer;

    switch (format) {
      case 'png':
        buffer = this.canvas.toBuffer('image/png');
        break;
      case 'jpeg':
      case 'jpg':
        buffer = this.canvas.toBuffer('image/jpeg', { quality: this.imageQuality });
        break;
      case 'gif':
        buffer = this.canvas.toBuffer('image/gif');
        break;
      default:
        throw new Error('Unsupported format.');
    }

    try {
      await fs.writeFile(path, buffer);
      return `Image saved at ${path}`;
    } catch (err) {
      throw new Error(`Failed to save image: ${err.message}`);
    }
  }

  // Asynchronous image deletion method
  async deleteImageAsync(path = 'placeholder.png') {
    try {
      await fs.unlink(path);
      return `Image deleted at ${path}`;
    } catch (err) {
      return `Image not found at ${path}`;
    }
  }
}


