import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css"
import UplotReact from "uplot-react";
import 'uplot/dist/uPlot.min.css';
import Chart from "./components/Chart";
import { connect } from "react-redux";


const ReactGridLayout = WidthProvider(RGL);

class DynamicMinMaxLayout extends React.PureComponent {
  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    items: 2,
    rowHeight: 30,
    onLayoutChange: function () { },
    cols: 12,
  };

  constructor(props) {
    super(props);
    this.state = {
      size: [{ width: ((window.innerWidth / 12) * 5) - 40, height: 5 * 39 }, { width: ((window.innerWidth / 12) * 5) - 40, height: ((window.innerHeight / 12) * 2.3) - 40 }]
    };
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
    // `oldLayoutItem` contains the state of the item before the resize.
    // You can modify `layoutItem` to enforce constraints.

    console.log('====================================');
    console.log('onResize', { layout }, { layoutItem }, { oldLayoutItem }, { placeholder });
    console.log('====================================');

    if (layoutItem.h < 3 && layoutItem.w > 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }

    if (layoutItem.h >= 3 && layoutItem.w < 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }

    let temp = [...this.state.size]

    temp[layoutItem.i] = { width: (layoutItem.w * (window.innerWidth / 12)) - 40, height: layoutItem.h * 32 }

    this.setState({
      size: temp
    })
  }

  render() {
    return (
      <ReactGridLayout
        onLayoutChange={this.onLayoutChange}
        onResize={this.onResize}
        {...this.props}
      >
        {/* {this.generateDOM()} */}
        <div key={0} data-grid={{ x: 0, y: 6, w: 5, h: 6 }} >

          <Chart
            size={this.state.size[0]}
            index={0}
            openDrawer={() => this.props?.openDrawer(0)}
          />
          {/* </div> */}
        </div>
        <div key={1} data-grid={{ x: 6, y: 6, w: 5, h: 6 }} >

          <Chart
            size={this.state.size[1]}
            index={1}
            openDrawer={() => this.props?.openDrawer(1)}
          />
        </div>
      </ReactGridLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartData: state.chartData,
  };
}

export default connect(mapStateToProps)(DynamicMinMaxLayout);
