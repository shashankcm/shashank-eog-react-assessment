import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const MetricsDropDown = () => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      placeholder="select metrics..."
      isMulti
      options={[]}
    />
  );
};

export default MetricsDropDown;
