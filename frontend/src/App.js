import React, { useState } from "react";
import SecurityComponent from "./SecurityComponent";
import OptionsGraph from "./OptionsGraph";
import "./App.css";
import { Dropdown, FillMenu } from "./BasicComponents";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  //this will get worse in the future with more features -- should find a way to make it more concise?
  const [securities, setSecurities] = useState([{ type: "Call", position: "Long", strikePrice: 0, premium: 0, color: "", fvBond: 0 }]);
  const [numSecurities, setNumSecurities] = useState("1");
  const [timeToMaturity, setTimeToMaturity] = useState("");
  const [typeOfGraph, setTypeOfGraph] = useState("Payoff")
  const colors = ["Green", "Orange", "Saffron", "Dark Blue", "Purple", "Light Blue"];


  const handleUpdate = (index, updatedSecurity) => { //managing add/remove number of securities correctly
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
          newSecurities.push({ //default values
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
              options={["Payoff", "Profit"]}
              defaultValue={typeOfGraph}
              onChange={(value) => {
                setTypeOfGraph(value);
              }}
            />
          </div>

          <div className="control-item">
            <FillMenu
              label="Time to Maturity"
              placeholder="Enter T in # of Months"
              value={timeToMaturity}
              onChange={(value) => {
                setTimeToMaturity(value);
                handleUpdate();
              }}
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
          <div className="assumptions-and-notes">
            <div className="notes-section">
              <h3>Notes</h3>
              <div className="list">
                <ul>
                  <li>Dotted red line is Payoff/Profit of the portfolio</li>
                  <li>Premium is only used when "Profit" is chosen</li>
                  <li>Time to maturity is used for all assets</li>
                </ul>
              </div>
            </div>
            <div className="assumptions">
              <h3>Assumptions</h3>
              <div className="list">
                <ul>
                  <li>No dividends</li>
                  <li>European-style options</li>
                  <li>0 Coupon Bond</li>
                  {/* <li>Risk-free rate is constant</li> */}
                </ul>
              </div>
            </div>            
          </div>
          <div className="graph">
            <h3 className="graph-title">{typeOfGraph} for Securities {timeToMaturity || 0} Months From Now</h3>
            <OptionsGraph securities={securities} graphType={typeOfGraph} />
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <a href="https://github.com/Sujal-Davhale/Options-Visualizer">Source</a>
        <Analytics />
      </div>
      {/* For Debugging */}
      {/* <pre>{JSON.stringify(securities, null, 2)}</pre>  */}
    </div>
  );
};

export default App;
