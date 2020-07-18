import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const LoadingComponent:React.FC<{}> = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  );
};
export default LoadingComponent;