import React, { useState, useEffect } from "react";
import { Dropdown, FillMenu } from "./BasicComponents";
import "./SecurityComponent.css";

const SecurityComponent = ({ index, onUpdate, initialValues }) => {
  //should fix this later
  const [type, setType] = useState(initialValues.type || "Call");
  const [position, setPosition] = useState(initialValues.position || "Long");
  const [strikePrice, setStrikePrice] = useState(initialValues.strikePrice || "");
  const [premium, setPremium] = useState(initialValues.premium || "");
  const [color, setColor] = useState(initialValues.color || "Green");
  const [fvBond, setFvBond] = useState(initialValues.fvBond || ""); // New field for bond future value

  useEffect(() => {
    onUpdate(index, { type, position, strikePrice, premium, color, fvBond });
  }, [type, position, strikePrice, premium, color, fvBond]);

  const handleUpdate = () => {
    onUpdate(index, { type, position, strikePrice, premium, color, fvBond });
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
                  //setTimeToMaturity(null);
                } else {
                  setStrikePrice(0);
                  //setTimeToMaturity(0);
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
              options={["Green", "Orange", "Saffron", "Dark Blue", "Purple", "Light Blue"]}
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
              <>
                <FillMenu
                  label="Strike Price"
                  placeholder="Enter in $"
                  value={strikePrice}
                  onChange={(value) => {
                    setStrikePrice(value);
                    handleUpdate();
                  }}
                />
                <FillMenu
                  label="Premium"
                  placeholder="Enter in $"
                  value={premium}
                  onChange={(value) => {
                    setPremium(value);
                    handleUpdate();
                  }}
                />
              </>
            ) : null}

            {/* FV of Bond for bonds */}
            {type === "Bond" && (
              <>
                <FillMenu
                  label="FV of Bond"
                  placeholder="Enter Future Value in $"
                  value={fvBond}
                  onChange={(value) => {
                    setFvBond(value);
                    handleUpdate();
                  }}
                />

                <div className="hidden">
                  <FillMenu label="Placeholder" placeholder="" />
                </div>
              </>
            )}

            {type === "Stock" && (
              <>
                <div className="hidden">
                  <FillMenu label="Placeholder" placeholder="" />
                </div>

                <div className="hidden">
                  <FillMenu label="Placeholder" placeholder="" />
                </div>
              </>
            )}
          </div>
          <div className="separator"></div>
          {/* This is the third subsection that is blank for now -- will add future features here */}
          <div className="subsection">
            {/* <FillMenu
              label="Premium"
              placeholder="Default is Black Scholes Value"
              value={}
              onChange={(value) => {
                
              }}
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityComponent;
