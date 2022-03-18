import { Box, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MessageTileType } from '../constant/messageTileType';
import { getValue } from '../helper/eventHelper';


export const SettingsPanel: React.FC = () => {
    const [messageType, setMessageType] = useState<number>(MessageTileType.Default);

    const messageTileOnChange = (e: any) => {
        const newValue = getValue(e);
        if (newValue == null) return;
        if (isNaN(newValue as any)) return;

        setMessageType(Number(newValue));
    }

    return (
        <Box>
            <Text>Theme</Text>
            <Select placeholder='Select option'
                data-value={messageType}
                value={messageType}
                onChange={messageTileOnChange}
            >
                {
                    Object.keys(MessageTileType)
                        .filter((item) => isNaN(Number(item)))
                        .map((value, index) => (
                            <option
                                key={index}
                                value={index}
                            >
                                {value}
                            </option>
                        ))
                }
            </Select>
        </Box>
    );
}