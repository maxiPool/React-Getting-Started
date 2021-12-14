import './style/styling.css';
import utils from "./utils";

const StarsDisplay = (props: { count: any; }) => {
  return (
    // empty JSX tag represents a React.fragment
    <>
      {utils.range(1, props.count).map(starId => 
        <div key={starId} className="star" />)}
    </>
  );
};

export default StarsDisplay;