import React from "react";

interface Props {
   name: string;
}

const TemplateComponent = (props: Props) => {
   return (
      <div>
         Hello {props.name}
      </div>
   );
}

export default TemplateComponent;