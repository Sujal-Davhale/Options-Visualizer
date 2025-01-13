import React, { useState, useEffect } from "react";
import SecurityComponent from "./SecurityComponent";
import "./App.css";
import { Dropdown } from "./BasicComponents";

const App = () => {
  const [securities, setSecurities] = useState([{ type: "Call", position: "Long", strikePrice: null, timeToMaturity: null, color: "Red"}]);
  const [numSecurities, setNumSecurities] = useState("1");
  const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Black", "Orange"];


  const handleUpdate = (index, updatedSecurity) => {
    setSecurities((prevSecurities) => {
      const newSecurities = [...prevSecurities];
      newSecurities[index] = updatedSecurity;
      return newSecurities;
    });
  };

  const handleNumSecuritiesChange = (value) => {
    const selectedNum = parseInt(value, 10);
    setNumSecurities(value);

    // Adjust the number of securities based on the selected value
    setSecurities((prevSecurities) => {
      const newSecurities = [...prevSecurities];

      if (newSecurities.length < selectedNum) {
        // Add more securities if the current count is less
        for (let i = newSecurities.length; i < selectedNum; i++) {
          const color = colors[(i + 1) % colors.length]; // Cycle through colors for a new default value every time
          newSecurities.push({
            type: "Call",
            position: "Long",
            strikePrice: null,
            timeToMaturity: null,
            color,
          });
        }
      } else if (newSecurities.length > selectedNum) {
        // Remove securities if the current count is more -- this preserves the securities at the top
        newSecurities.length = selectedNum;
      }

      return newSecurities;
    });
  };

  return (
    <div className="main">
      <div>
        <header className="title-bar">
          <h1>Options Visualizer</h1>
        </header>
      </div>
      <div className="content-container">
        <div className="controls">
          <div className="control-item">
            <Dropdown
              label="Number of Securities in Portfolio"
              options={["1", "2", "3", "4", "5", "6"]}
              defaultValue="1"
              onChange={handleNumSecuritiesChange}
            />
          </div>

          <div className="control-item">
            <Dropdown
              label="Type of Graph"
              options={["Payoff", "Profit", "Real Value"]}
              defaultValue="Payoff"
              /* TO BE DONE: Set onchange to change the graph type, this will be done later. */
            />
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="securities-container">
        {securities.map((security, index) => (
          <SecurityComponent
            key={index}
            index={index}
            onUpdate={handleUpdate}
            initialValues={security}
          />
        ))}
      </div>
      <div className="bottom-container">
        <div className="assumptions-and-graph">
          <div className="assumptions">
            <h3>Assumptions</h3>
            <div className="list">
              <ul>
                <li>No dividends</li>
                <li>European-style options</li>
                <li>Risk-free rate is constant</li>
                {/* Will add more assumptions here */}
              </ul>
            </div>
          </div>
          <div className="graph">
            <h3>Graph</h3>
            {/* Placeholder for the graph */}
            <div className="graph-placeholder">[Graph will be displayed here]</div>
          </div>
        </div>
      </div>

      <pre>{JSON.stringify(securities, null, 2)}</pre> {/* For Debugging */}
    </div>
  );
};

export default App;
