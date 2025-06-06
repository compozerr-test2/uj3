import React from "react";

interface Props {
   name: string;
}

const Uj3Component = (props: Props) => {
   return (
      <div>
         Hello {props.name}
      </div>
   );
}

export default Uj3Component;