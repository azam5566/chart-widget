import logo from './logo.svg';
import './App.css';
import { Responsive, WidthProvider } from "react-grid-layout";
import _ from "lodash";
import { useEffect, useState } from 'react';
import ResizableHandles from './ResizeableHandles';
import DynamicMinMaxLayout from './ResizeableHandles';
import { Box, Button, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, SwipeableDrawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall } from './apiCall';
import { findProp } from './util';


function App() {

  const dispatch = useDispatch()

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedChart, setSelectedChart] = useState();
  const chartDataSet = useSelector(state => state.chartDataSet);
  const chartData = useSelector(state => state.chartData)

  const [chartOnePath, setChartOnePath] = useState([]);
  const [chartTwoPath, setChartTwoPath] = useState([]);

  // console.log('====================================');
  // console.log({ chartData });
  // console.log('====================================');

  const [selectedDataSet, setSelectedDataSet] = useState();
  // console.log('====================================');
  // console.log({ selectedDataSet });
  // console.log('====================================');

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  function handleChange(e) {
    console.log('====================================');
    console.log(e.target.value);
    console.log('====================================');
    setSelectedDataSet(e.target.value);
  }

  function handleSaveClick() {
    let temp = [...chartDataSet]

    let tempArr
    if (selectedDataSet?.length > 1) {
      tempArr = selectedDataSet.split(".")
    } else {
      tempArr = "/"
    }

    temp[selectedChart] = tempArr

    console.log({ temp });
    dispatch({
      type: 'UPDATE_CHART_DATA_SET',
      payload: temp
    })
    setOpenDrawer(false);
  }

  useEffect(() => {
    let chartOnePath
    let chartTwoPath
    chartData.forEach((item, index) => {
      if (index === 0) {
        let tme = findProp(item, 'timeseries')
        let paths = []
        tme.map(item => {
          paths.push(item.path)
        })

        chartOnePath = paths
      } else {
        let tme = findProp(item, 'timeseries')
        let paths = []
        tme.map(item => {
          paths.push(item.path)
        })
        chartTwoPath = paths
      }
    })

    console.log('====================================');
    console.log({ chartOnePath });
    console.log('====================================');

    setChartOnePath(chartOnePath)
    setChartTwoPath(chartTwoPath)

    // const timer = setInterval(function () {
    //   dispatch(apiCall())
    // }, 2000,)

    // return () => {
    //   clearInterval(timer);
    // }
  }, [])

  return (
    <div className="App">
      {/* <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        containerPadding={[0, 0]}
      >
        {generateDOM()}
      </ResponsiveGridLayout> */}
      <Button onClick={() => {
        console.log('chartData onClick', chartData);
        dispatch(apiCall(chartData))
      }}>
        UPDATE
      </Button>
      <DynamicMinMaxLayout openDrawer={(index) => {
        console.log('====================================');
        console.log({ index });
        console.log('====================================');
        setSelectedChart(index)
        setSelectedDataSet(typeof chartDataSet[index] === 'object' ? chartDataSet[index].join("") : chartDataSet[index])
        setOpenDrawer(true);
      }} />
      <SwipeableDrawer
        anchor={'right'}
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 350 }}
          role='presentation'
        >
          <List>
            <ListItem key={4} >
              <ListItemText primary={"Select Data Set for Chart " + (selectedChart + 1)} />
            </ListItem>

            <ListItem disablePadding>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }} style={{ marginLeft: 16 }}>
                <InputLabel id="demo-simple-select-filled-label">Data Set</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selectedDataSet}
                  onChange={handleChange}
                >
                  {
                    selectedChart === 0 ? chartOnePath.map((item, index) =>
                      <MenuItem value={index == 0 ? "/" : item.slice(0, index).join(".")}>{index === 0 ? "/" : "/" + chartOnePath[index].slice(0, index).join("/")}</MenuItem>
                    ) :

                      chartTwoPath.map((item, index) =>
                        <MenuItem value={index == 0 ? "/" : item.slice(0, index).join(".")}>{index === 0 ? "/" : "/" + chartTwoPath[index].slice(0, index).join("/")}</MenuItem>
                      )
                  }
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button variant='contained' onClick={() => handleSaveClick()}>
                SAVE
              </Button>
            </ListItem>
          </List>

        </Box>
      </SwipeableDrawer>
    </div>
  );
}

export default App;
