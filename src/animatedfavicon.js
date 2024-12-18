import { useEffect } from 'react';

const AnimatedFavicon = () => {
  const colors = ['#C10303', '#F70841', '#FF3EA3'];
  let colorIndex = 0;

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    const drawFavicon = () => {
      // Draw the circle with the current color
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colors[colorIndex];
      ctx.beginPath();
      ctx.arc(16, 16, 8, 0, Math.PI * 2);
      ctx.fill();

      // Set the favicon's href to the canvas data URL
      favicon.href = canvas.toDataURL('image/png');

      // Move to the next color
      colorIndex = (colorIndex + 1) % colors.length;
    };

    // Set interval to update the favicon every second
    const interval = setInterval(drawFavicon, 1000);

    // Draw the initial favicon
    drawFavicon();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render any visible elements
};

export default AnimatedFavicon;
