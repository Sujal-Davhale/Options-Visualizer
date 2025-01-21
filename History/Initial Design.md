# Options-Visualizer


Here is the indended design of the website (draft). I have provided labels in Blue, I will describe what each one does. The red plus symbol indicates that the box will have a default value.


![Image of draft design of website](./IMG_0335%20(1).jpeg)


T1 = title bar, this should stay at the top of the page when scrolling (It can be slightly transparent). 
S1 = Scroll bar

C = this will contain information about the type of security to be added to the portfolio.
C'1 = allows you to choose between stock, call option, put option, or bond. This changes the information presented in C'2
C'2 = will contain information needed to graph the selected security. For options, this includes whether you are long/short, the strike price, premium, and time to maturity, as well as the color of the line.
C'3 = I will leave this section blank for now, I may add features later on.

D = dropdown menu.

D1 = will indicate the number of securities to be added to the portfolio (min 1, max 6). Based on this value, more or less 'C' boxes will appear, allowing the adjusting of each securities parameters. 

D6 = changes the type of the graph from a payoff to profit diagram, I may add a chart of the real value of the option later. 

D2 = allows you to select the type of the security (call, put, stock, bond)
D3 = allows you to say whether you are long or short the position
D4 = this is not a drop down, this will allow you to select the strike price
D5 = also not a drop down, allows you to write in a time to maturity
D7 = allows you to select the color of this line on the graph

G1 will contain the graph, provided by D3.js.
