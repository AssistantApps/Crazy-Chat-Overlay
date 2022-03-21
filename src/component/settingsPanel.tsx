import { Box, Input, InputGroup, InputRightElement, Select, Text, Textarea, useToast } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import React from 'react';
import { MessageTileType } from '../constant/messageTileType';
import { ChatSetting } from '../contract/chatSettings';
import { getValue } from '../helper/eventHelper';
import { settingsToQueryParams } from '../mapper/chatSettingHelper';
import { siteUrl } from '../constant/site';
import { Routes } from '../constant/routes';

interface IProps {
    settings: ChatSetting;
    setSettings: (newSettings: ChatSetting) => void;
}

export const SettingsPanel: React.FC<IProps> = (props: IProps) => {
    const toast = useToast()

    const channelOnChange = (e: any) => {
        const newValue = getValue(e);
        if (newValue == null) return;

        props.setSettings({ ...props.settings, twitchChannel: newValue });
    }

    const messageTileOnChange = (e: any) => {
        const newValue = getValue(e);
        if (newValue == null) return;
        if (isNaN(newValue as any)) return;

        props.setSettings({ ...props.settings, messageTileType: Number(newValue) });
    }

    return (
        <Box>
            <Box className="channel" mt={5}>
                <Text>Twitch channel</Text>
                <Input
                    variant='outline'
                    placeholder='khaoztopsy'
                    defaultValue={props.settings.twitchChannel}
                    onChange={channelOnChange}
                />
            </Box>
            <Box className="theme" mt={5}>
                <Text>Theme</Text>
                <Select placeholder='Select option'
                    data-value={props.settings.messageTileType}
                    value={props.settings.messageTileType}
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
            <Box className="url" mt={5}>
                <Text>Overlay url</Text>
                <InputGroup key={settingsToQueryParams(props.settings)}>
                    <Textarea
                        variant='filled'
                        rows={3}
                        defaultValue={siteUrl + '#' + Routes.display + settingsToQueryParams(props.settings)}
                    />
                    <InputRightElement className="pointer" children={
                        <CopyIcon color='green.500'
                            onClick={() =>
                                toast({
                                    title: 'Copied!',
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                })
                            }
                        />
                    } />
                </InputGroup>
            </Box>
        </Box>
    );
}