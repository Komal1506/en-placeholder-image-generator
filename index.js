import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

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
  }

  setText(text = ' ', length = text.length) {
    this.text = text.slice(0, length).toUpperCase();
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

  draw() {
    if (!this.width || !this.height) throw new Error('Set dimensions first.');
    if (!this.text) throw new Error('Set text first.');
    if (!this.bgColor) throw new Error('Set background color first.');
    this._drawBackground();
    this._drawBorder();
    this._drawText();
    return this.canvas.toDataURL('image/png');
  }

  saveImage(format = 'png', path = 'placeholder.png') {
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

    fs.writeFileSync(path, buffer);
    console.log(`Image saved at ${path}`);
  }

  deleteImage(path = 'placeholder.png') {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log(`Image deleted at ${path}`);
    } else {
      console.log(`Image not found at ${path}`);
    }
  }
}
