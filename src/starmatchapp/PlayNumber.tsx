import Colors from "./colors";

const PlayNumber = (props: { 
    status: Colors;
    number: number; 
    onClick: Function;
  }) => {
  return (
    <button 
      className="number" 
      style={{ backgroundColor: props.status }}
      onClick={ () => props.onClick(props.number, props.status) }
    >
      {props.number}
    </button>
  );
};

export default PlayNumber;