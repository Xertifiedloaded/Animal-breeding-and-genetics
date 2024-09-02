import React, { useRef, useEffect, useState } from 'react';

const Chart = () => {
  const canvasRef = useRef(null);
  const [locationData, setLocationData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/alumni/info'); // Replace with your actual API endpoint
        const data = await response.json();
        processData(data.data); // Assuming the API response contains an array under `data`
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const processData = (data) => {
      const locationCounts = {};

      data.forEach((item) => {
        const location = item.locationOrCountry.trim().toLowerCase(); 
        if (location) {
          locationCounts[location] = (locationCounts[location] || 0) + 1; 
        }
      });


      const sortedLocations = Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7);

      const labels = sortedLocations.map(([key]) => key); 
      const counts = sortedLocations.map(([, value]) => value); // Counts for each location
      setLocationData({ labels, counts });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (locationData.labels.length && locationData.counts.length) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Resize canvas based on container width and adjust height dynamically
      const resizeCanvas = () => {
        const containerWidth = canvas.parentElement.offsetWidth;
        const containerHeight = Math.max(300, locationData.labels.length * 50); // Dynamic height based on data
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        drawChart();
      };

      // Draw chart with fetched data
      const drawChart = () => {
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40; // Padding for axes
        const xStep = (width - 2 * padding) / (locationData.counts.length - 1);
        const maxValue = Math.max(...locationData.counts);
        const isMobile = window.innerWidth <= 768; // Determine if the screen is mobile

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = '#e5e7eb'; // Light gray grid lines
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 5; i++) {
          const y = height - padding - (i / 5) * (height - 2 * padding);
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
        }
        ctx.stroke();

        // Draw the line
        ctx.strokeStyle = '#4F46E5'; // Line color
        ctx.lineWidth = 2;
        ctx.beginPath();
        locationData.counts.forEach((value, index) => {
          const x = padding + index * xStep;
          const y = height - padding - (value / maxValue) * (height - 2 * padding);
          ctx[index === 0 ? 'moveTo' : 'lineTo'](x, y);
        });
        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#4F46E5'; // Point color
        locationData.counts.forEach((value, index) => {
          const x = padding + index * xStep;
          const y = height - padding - (value / maxValue) * (height - 2 * padding);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2); // Draw points
          ctx.fill();
        });

        // Draw X-axis and Y-axis
        ctx.strokeStyle = '#000'; // Axis color
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Draw X-axis labels
        ctx.fillStyle = '#000'; // Label color
        const fontSize = Math.max(10, Math.min(14, width / locationData.labels.length)); // Dynamic font size
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = isMobile ? 'center' : 'center';
        locationData.labels.forEach((label, index) => {
          const x = padding + index * xStep;
          const y = height - padding + 20; 

          ctx.save();
          if (isMobile) {
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 4); 
            ctx.fillText(label, 0, 0);
            ctx.restore();
          } else {
            ctx.fillText(label, x, y);
          }
        });

        // Draw Y-axis labels
        const yAxisLabels = [0, Math.round(maxValue / 4), Math.round(maxValue / 2), Math.round(3 * maxValue / 4), maxValue];
        yAxisLabels.forEach((label, index) => {
          const y = height - padding - (index / (yAxisLabels.length - 1)) * (height - 2 * padding);
          ctx.textAlign = 'right';
          ctx.fillText(label, padding - 10, y + 5); 
        });
      };

      resizeCanvas();

      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [locationData]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
      <canvas ref={canvasRef} className="w-full h-auto"></canvas>
    </div>
  );
};

export default Chart;
