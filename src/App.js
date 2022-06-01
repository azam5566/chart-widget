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


function App() {

  const dispatch = useDispatch()

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedChart, setSelectedChart] = useState();
  const chartDataSet = useSelector(state => state.chartDataSet);
  const chartData = useSelector(state => state.chartData)

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
    temp[selectedChart] = selectedDataSet

    console.log({ temp });
    dispatch({
      type: 'UPDATE_CHART_DATA_SET',
      payload: temp
    })
    setOpenDrawer(false);
  }



  useEffect(() => {
    // let newChart = [...chartData]
    const timer = setInterval(function () {
      dispatch(apiCall())
    }, 2000,)

    return () => {
      clearInterval(timer);
    }
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
        setSelectedDataSet(chartDataSet[index])
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
                  <MenuItem value={0}>Data Set 1</MenuItem>
                  <MenuItem value={1}>Data Set 2</MenuItem>
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
