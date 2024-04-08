// import { inspect } from 'util';
// inspect

// this component is responsible for the 
// way that we get inputs from the customer
export function GameInput(props) {
  // console.log(`Game input props ${inspect(props)}`);

  return (
    <div>
      <label>{props.labelText}</label>
      <input type="text" onChange={(e) => {
        // when someone makes a change, tell whoever passed in props
        // about the new value
        props.setValue(e.target.value);
      }} />
    </div>
  );
}
