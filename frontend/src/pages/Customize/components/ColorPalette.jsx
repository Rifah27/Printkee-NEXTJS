import React from "react";
import "../styles/ColorPalette.css";

const ColorPalette = ({
  canvasRef,
  updateThumbnail,
  labels = {},
  globalPartColors = {},
  setGlobalPartColors = () => {},
}) => {
  const colorSet = [
    "#ffc5d6", "#ffa1bd", "#ccf11e", "#3472c1", "#ffb52c", "#8a141b",
    "#ff7331", "#fdfdfc", "#257137", "#ffd500", "#e21215",
    "#2430b9", "#d4b5cc", "#99b4d0", "#209866", "#212322", "#eca134",
    "#585757", "#989595", "#92435e", "#ebff00", "#ec4e74", "#5c3c31",
    "#aaaaa8", "#2f4340", "#dad1bc", "#663698", "#5ca5f7", "#e06d8c",
  ];

  const applyColorToCanvas = (canvas, part, color) => {
    if (!canvas) return;
    const applyColor = (obj) => {
      if (obj.customPart === part) {
        obj.set("fill", color);
        obj.dirty = true;
        obj.setCoords();
      }
      if (obj._objects) obj._objects.forEach(applyColor);
    };
    if (canvas.mainGroup) applyColor(canvas.mainGroup);
    canvas.getObjects().forEach((obj) => {
      if (obj !== canvas.mainGroup) applyColor(obj);
    });
    canvas.requestRenderAll();
  };

  const changePartColor = (part, color) => {
    const newColors = { ...globalPartColors, [part]: color };
    setGlobalPartColors(newColors);

    const canvas = canvasRef.current;
    applyColorToCanvas(canvas, part, color);

    updateThumbnail();
  };

  return (
    <div className="color-palette-container">
      {Object.entries(labels).map(([part, label]) => (
        <div className="color-palette-row" key={part}>
          <label className="color-palette-label">{label}</label>
          <div className="color-swatches">
            {colorSet.map((c) => (
              <div
                key={c}
                className={`color-swatch ${globalPartColors[part] === c ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => changePartColor(part, c)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
