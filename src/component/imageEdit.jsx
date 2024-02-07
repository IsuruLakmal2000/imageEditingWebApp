import React, { useRef, useState, useEffect } from "react";


function ImageEditor() {
    const [fontFamily, setFontFamily] = useState("Arial");
  const canvasRef = useRef(null);
  const [text1, setText1] = useState({ content: "Editable Text 1", color: "#000000" });
  const [text2, setText2] = useState({ content: "Editable Text 2", color: "#000000" });
  const [backgroundType, setBackgroundType] = useState("color");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundGradient, setBackgroundGradient] = useState({
    startColor: "#ffffff",
    endColor: "#000000",
  });
  const [template, setTemplate] = useState("template1"); // Add template state
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

    // Draw editable text on the canvas based on the selected template
    if (template === "template1") {
      ctx.font = "20px Arial";
      ctx.fillStyle = text1.color; // Use the selected color for text1
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text1.content, canvasCenterX, canvasCenterY - 50);

      ctx.font = "20px Arial";
      ctx.fillStyle = text2.color; // Use the selected color for text2
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text2.content, canvasCenterX, canvasCenterY + 50);
    } else if (template === "template2") {
      ctx.font = "30px Arial";
      ctx.fillStyle = text1.color; // Use the selected color for text1
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(text1.content, 10, 10);

      ctx.font = "30px Arial";
      ctx.fillStyle = text2.color; // Use the selected color for text2
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(text2.content, 10, 50);
    } // Add more template conditions as needed

    // Update the preview image URL
    setPreviewImageUrl(canvas.toDataURL());
  };

  // Update text1 state when user modifies the first text input
  const handleText1Change = (event) => {
    setText1({ ...text1, content: event.target.value });
  };

  // Update text2 state when user modifies the second text input
  const handleText2Change = (event) => {
    setText2({ ...text2, content: event.target.value });
  };

  // Update text1 color when user modifies the first text color input
  const handleText1ColorChange = (event) => {
    setText1({ ...text1, color: event.target.value });
  };

  // Update text2 color when user modifies the second text color input
  const handleText2ColorChange = (event) => {
    setText2({ ...text2, color: event.target.value });
  };

  // Update backgroundType state when user selects a background type
  const handleBackgroundTypeChange = (event) => {
    setBackgroundType(event.target.value);
  };

  // Update backgroundColor state when user selects a background color
  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
   };

  // Update backgroundGradient state when user modifies the start and end colors of the gradient
  const handleBackgroundGradientChange = (event) => {
    setBackgroundGradient({
      ...backgroundGradient,
      [event.target.name]: event.target.value,
    });
  };

  // Update template state when user selects a template
  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
  };

  // Redraw the image on the canvas whenever there is a change in the inputs or settings
  useEffect(() => {
    drawImageOnCanvas();
  }, [text1, text2, backgroundType, backgroundColor, backgroundGradient, template]);

  return (
    <div>
      <div>
        <label>
          Template:
          <select value={template} onChange={handleTemplateChange}>
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
            {/* Add more template options as needed */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Text 1:
          <input type="text" value={text1.content} onChange={handleText1Change} />
        </label>
        <label>
          Text 1 Color:
          <input type="color" value={text1.color} onChange={handleText1ColorChange} />
        </label>
      </div>
      <div>
        <label>
          Text 2:
          <input type="text" value={text2.content} onChange={handleText2Change} />
        </label>
        <label>
          Text 2 Color:
          <input type="color" value={text2.color} onChange={handleText2ColorChange} />
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
        {backgroundType === "color" && (
          <label>
            Background Color:
            <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
          </label>
        )}
        {backgroundType === "gradient" && (
          <div>
            <label>
              Gradient Start Color:
              <input
                type="color"
                name="startColor"
                value={backgroundGradient.startColor}
                onChange={handleBackgroundGradientChange}
              />
            </label>
            <label>
              Gradient End Color:
              <input
                type="color"
                name="endColor"
                value={backgroundGradient.endColor}
                onChange={handleBackgroundGradientChange}
              />
            </label>
          </div>
        )}
      </div>
     
      <div>
        <button onClick={handleSaveImage}>Save Image</button>
      </div>
      <div>
        <canvas ref={canvasRef} width={400} height={400} />
       
      </div>
    </div>
  );
}

export default ImageEditor;