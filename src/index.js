import * as d3 from "d3";
import 'd3-selection-multi'

import styles from './index.scss'

const square = d3.selectAll("rect");
square.style("fill", "orange");

function testyMctesterson(x) {
    return x + 3
}

export default testyMctesterson