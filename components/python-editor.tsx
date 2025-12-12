import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";

const PythonEditor = ({ value, id }: { value: string; id: string }) => {
  return (
    <AceEditor
      mode="python"
      theme="one_dark"
      name={id}
      value={value}
      height="200px"
      width="100%"
      style={{
        borderRadius: "10px",
        overflow: "hidden",
      }}
    />
  );
};

export default PythonEditor;
