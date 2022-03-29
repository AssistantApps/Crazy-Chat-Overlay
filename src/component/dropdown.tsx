import { Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { IDropDownOptionProps } from '../contract/props/IDropDownOptionProps';

export interface IDropdownProps {
    placeholder: string;
    defaultToPlaceholder?: boolean;
    options: Array<IDropDownOptionProps>;
    defaultValue?: string;
    onChange: (opt: IDropDownOptionProps) => void;
    trailingPresenter?: (opt: IDropDownOptionProps) => ReactNode;
}


export const Dropdown: React.FC<IDropdownProps> = (props: IDropdownProps) => {
    const defaultSelectedIndex = props.options.findIndex(opt => opt.value === props.defaultValue);
    const calculatedIndex = defaultSelectedIndex < 0 ? 0 : defaultSelectedIndex;

    const [selectedIndex, setSelectedIndex] = useState<number>(calculatedIndex);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    let displayValue = props.options[selectedIndex].name;
    if (props.defaultToPlaceholder === true && props.defaultValue == null) {
        displayValue = props.placeholder;
    }

    const onChange = (opt: IDropDownOptionProps, index: number) => {
        setSelectedIndex(index);
        props.onChange(opt);
    }

    return (
        <Box key={selectedIndex} className="dropdown" onClick={() => setIsOpen(open => !open)}>
            <div className="dropdown-box">
                {displayValue}
                <ChevronDownIcon boxSize={5} />
            </div>

            <ul className={classNames('dropdown-menu', { 'visible': isOpen })}>
                {
                    props.options.map((opt, index) => (
                        <li
                            key={index}
                            value={index}
                            onClick={() => onChange(opt, index)}
                        >
                            {opt.name}
                            {props.trailingPresenter != null &&
                                (
                                    <span className="trailing">
                                        {props.trailingPresenter(opt)}
                                    </span>
                                )}
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}