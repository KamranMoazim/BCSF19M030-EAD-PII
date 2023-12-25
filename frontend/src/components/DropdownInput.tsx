import React, { useState, useEffect } from 'react';
import Select, { components } from "react-select";
import CreatableSelect from 'react-select/creatable';

const CustomInput = (props:any) => {
    const { maxLength } = props.selectProps;
    const inputProps = { ...props, maxLength };

    return <components.Input {...inputProps} />;
};


interface Option {
    label: string;
    value: number;
}

interface Props {
    options : Option[]
    onInterestChange: (selectedOption: { label: string; value: number } | null) => void;
    defaultOption: Option
}


const MyDropdownInput = ({defaultOption, options, onInterestChange}:Props) => {

    return (
        <CreatableSelect
            options={options}
            components={{ Input: CustomInput }}
            onChange={onInterestChange}
            defaultValue={defaultOption}
            isClearable
            isSearchable
        />
    );
};

export default MyDropdownInput;
