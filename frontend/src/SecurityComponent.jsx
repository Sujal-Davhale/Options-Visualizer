import React, { useState, useEffect } from "react";
import { Dropdown, FillMenu } from "./BasicComponents";
import "./SecurityComponent.css";

const SecurityComponent = ({ index, onUpdate, initialValues }) => {
  const [type, setType] = useState(initialValues.type || "Call");
  const [position, setPosition] = useState(initialValues.position || "Long");
  const [strikePrice, setStrikePrice] = useState(initialValues.strikePrice || "");
  const [timeToMaturity, setTimeToMaturity] = useState(initialValues.timeToMaturity || "");
  const [color, setColor] = useState(initialValues.color || "Red"); // Use initialValues.color

  useEffect(() => {
    onUpdate(index, { type, position, strikePrice, timeToMaturity, color });
  }, [type, position, strikePrice, timeToMaturity, color]);

  const handleUpdate = () => {
    onUpdate(index, { type, position, strikePrice, timeToMaturity, color });
  };

  return (
    <div className="security-container">
      <h3 className="security-number">Security {index + 1}</h3>
      <div className="security-box">
        <div className="security-section">
          {/* Type and Position */}
          <div className="subsection">
            <Dropdown
              label="Type"
              options={["Call", "Put", "Stock", "Bond"]}
              defaultVal={type}
              onChange={(value) => {
                setType(value);
                if (value === "Stock" || value === "Bond") {
                  setStrikePrice(null);
                  setTimeToMaturity(null);
                } else {
                  setStrikePrice(0);
                  setTimeToMaturity(0);
                }
                handleUpdate();
              }}
            />
            <Dropdown
              label="Position"
              options={["Long", "Short"]}
              defaultVal={position}
              onChange={(value) => {
                setPosition(value);
                handleUpdate();
              }}
            />
            <Dropdown
              label="Color"
              options={["Red", "Blue", "Green", "Yellow", "Purple", "Black"]}
              defaultVal={color} // Use the passed color as default
              onChange={(value) => {
                setColor(value);
                handleUpdate();
              }}
            />
          </div>
          {/* Separator */}
          <div className="separator"></div>
          <div className="subsection">
            {type !== "Stock" && type !== "Bond" ? (
              <FillMenu
                label="Strike Price"
                placeholder="Enter K in dollars"
                value={strikePrice}
                onChange={(value) => {
                  setStrikePrice(value);
                  handleUpdate();
                }}
              />
            ) : (
              <div className="hidden">
                <FillMenu label="" placeholder="" />
              </div>
            )}

            {type !== "Stock" && type !== "Bond" ? (
              <FillMenu
                label="Time to Maturity"
                placeholder="Enter T in # of Months"
                value={timeToMaturity}
                onChange={(value) => {
                  setTimeToMaturity(value);
                  handleUpdate();
                }}
              />
            ) : (
              <div className="hidden">
                <FillMenu label="" placeholder="" />
              </div>
            )}
          </div>
          <div className="separator"></div>
          <div className="subsection">
            <p>Future additions will go here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityComponent;
