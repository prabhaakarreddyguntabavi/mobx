import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ReactSelect = () => (
  <div className="mt-[50px] w-[50%] mx-auto">
    <Select
      options={options}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "blue" : "#CBD5E1",
          marginBottom: "20px",
          padding: "3px 4px",
        }),
        option: (styles, { isSelected }) => {
          return {
            ...styles,
            backgroundColor: isSelected ? "#EFF6FF" : "white",
            padding: "5px",
            margin: "1px",
            borderRadius: "10px",
            color: "black",
            width: "95%",
            marginLeft: "5px",
            ":hover": {
              // ...styles[":active"],
              backgroundColor: "#EFF6FF",
              color: "black",
            },
          };
        },
      }}
    />
    <CreatableSelect
      isMulti
      options={options}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      controlShouldRenderValue={true} // need to show selected options or not
      maxMenuHeight={100}
      className="h-5 w-[100%]"
    />
  </div>
);

export default ReactSelect;

/* styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "blue" : "#CBD5E1",
          padding: "3px 4px",
        }),
        option: (styles, { isSelected }) => {
          return {
            ...styles,
            backgroundColor: isSelected ? "#EFF6FF" : "white",
            padding: "5px",
            margin: "1px",
            borderRadius: "10px",
            color: "black",
            width: "95%",
            marginLeft: "5px",
            ":hover": {
              // ...styles[":active"],
              backgroundColor: "#EFF6FF",
              color: "black",
            },
          };
        },
        multiValue: (styles) => {
          return {
            ...styles,
            backgroundColor: "#DBEAFE",
            color: "#1E40AF",
            borderRadius: "6px",
          };
        },
        multiValueLabel: (styles) => ({
          ...styles,
          color: "#1E40AF",
        }),
        multiValueRemove: (styles) => ({
          ...styles,
          ":hover": {
            backgroundColor: "blue",
            color: "white",
          },
        }),
      }}*/
