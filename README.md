# D3-Challenge

Background

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/), but you are free to investigate a different data set. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

Analysis

In this assignment you will create a D3 based scatter plot comparing two of the factors on the health risk data set. The end result should have axis labeled and scaled accordingly as well as labels within the circles corresponding to each state abbreviation. You will need to create an svg container to contain the chart. The data provided is in the form of a CSV which you will need to read using D3 in order to provide the data to chart. Also include analysis of the findings below the chart on the final webpage. In order to read the CSV file with Javascript you will need to either run through a live server or using a python server to create the connection to read the file. In order to produce the webpage a CSS and HTML file will need to accompany the js file. In this assigment I chose to compare poverty and obesity and their realtionship for every state and DC in the US. 

First you need to create the svg container. Including variables for SVG height, wdith, and margins. Then create seperate var for width and height combining the two variables previously created. 

Create a SVG wrapper and group to hold the chart and shift by left and top margins

Import your CSV data using D3
  - parse the relavent data for obesity and poverty 
  
 Within the same function we will write the rest of the code used
  - create scale functions for the axis 
  - create axis functions
  - append the axis to the chart 
  - create a group for circles
  - initialize and create a tooltip function to display the state, poverty rate, and obesity rate. 
  - create and event listener for the tooltip so upon clicking it displays the above information 
  - create axes labels by appending text to your chartGroup created earlier
  
 Deploy using python or a live server.
 
 Requiremnts:
  - Javascript
  - HTML
  - CSS
  - Scripts from the D3 library 
  
 Data: 
  - CSV file 
