import React, { useRef, useState, useEffect } from "react";

function ImageEditor() {
  const canvasRef = useRef(null);
  const [text1, setText1] = useState("Editable Text 1");
  const [text2, setText2] = useState("Editable Text 2");
  const [backgroundType, setBackgroundType] = useState("color");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundGradient, setBackgroundGradient] = useState({
    startColor: "#ffffff",
    endColor: "#000000",
  });
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  // Function to handle saving the image
  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png"); // Use "image/jpeg" for JPEG format
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified_image.png"; // Set the desired filename
    link.click();
  };

  // Function to draw the modified image on the canvas
  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the background
    if (backgroundType === "color") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (backgroundType === "gradient") {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, backgroundGradient.startColor);
      gradient.addColorStop(1, backgroundGradient.endColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Calculate center position of the canvas
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    // Draw editable text on the canvas
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center"; // Set text alignment to center
    ctx.textBaseline = "middle"; // Set text baseline to middle
    ctx.fillText(text1, canvasCenterX, canvasCenterY - 50); // Adjust the Y position as needed
    ctx.fillText(text2, canvasCenterX, canvasCenterY + 50); // Adjust the Y position as needed

    // Update the preview image URL
    setPreviewImageUrl(canvas.toDataURL());
  };

  // Update text1 state when user modifies the first text input
  const handleText1Change = (event) => {
    setText1(event.target.value);
  };

  // Update text2 state when user modifies the second text input
  const handleText2Change = (event) => {
    setText2(event.target.value);
  };

  // Update backgroundType state when user selects a background type
  const handleBackgroundTypeChange = (event) => {
    setBackgroundType(event.target.value);
  };

  // Update backgroundColor state when user selects a background color
  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  // Update backgroundGradient state when user selects a background gradient
  const handleBackgroundGradientChange = (event) => {
    const gradientValue = event.target.value;
    const gradientParts = gradientValue.match(/#[0-9a-f]{6}/gi);
    if (gradientParts.length === 2) {
      setBackgroundGradient({
        startColor: gradientParts[0],
        endColor: gradientParts[1],
      });
    }
  };

  // Call the drawImageOnCanvas function when the component mounts and whenever text1, text2, backgroundType, backgroundColor, or backgroundGradient changes
  useEffect(() => {
    drawImageOnCanvas();
  }, [text1, text2, backgroundType, backgroundColor, backgroundGradient]);

  // Predefined gradients options
  const gradientOptions = [
    { label: "Gradient 1", value: "linear-gradient(to right, #ffffff, #000000)" },
    { label: "Gradient 2", value: "linear-gradient(to right, #00ff00, #ff0000)" },
    { label: "Gradient 3", value: "linear-gradient(to right, #0000ff, #ffff00)" },
  ];

  return (
    <div>
      <canvas ref={canvasRef} width={750} height={250} />
      <div>
        <label>
          Text 1:
          <input type="text" value={text1} onChange={handleText1Change} />
        </label>
      </div>
      <div>
        <label>
          Text 2:
          <input type="text" value={text2} onChange={handleText2Change} />
        </label>
      </div>
      <div>
        <label>
          Background Type:
          <select value={backgroundType} onChange={handleBackgroundTypeChange}>
            <option value="color">Color</option>
            <option value="gradient">Gradient</option>
          </select>
        </label>
      </div>
      {backgroundType === "color" && (
        <div>
          <label>
            Background Color:
            <input
              type="color"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
            />
          </label>
        </div>
      )}
      {backgroundType === "gradient" && (
        <div>
          <label>
            Background Gradient:
            <select
              value={backgroundGradient}
              onChange={handleBackgroundGradientChange}
            >
              {gradientOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <button onClick={handleSaveImage}>Save Image</button>
      
    </div>
  );
}

export default ImageEditor;