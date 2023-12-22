import React, { useState, useEffect } from 'react';
import Select, { components } from "react-select";


const CustomInput = (props) => {
    const { maxLength } = props.selectProps;
    const inputProps = { ...props, maxLength };

    return <components.Input {...inputProps} />;
};


const DropdownInput = () => {

    const options = [
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 }
    ];

    return (
        <Select
            options={options}
            components={{ Input: CustomInput }}
            maxLength="4"
        />
    );
};

export default DropdownInput;
