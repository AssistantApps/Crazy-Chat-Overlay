import { Box, Input, InputGroup, InputRightElement, Tag, Text, Textarea, useToast } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import React from 'react';

import { ChatSetting, ChatSettingAdditionalKey } from '../contract/chatSettings';
import { getValue } from '../helper/eventHelper';
import { settingsToQueryParams } from '../mapper/chatSettingHelper';
import { siteUrl } from '../constant/site';
import { Routes } from '../constant/routes';
import { copyToClipboard } from '../helper/documentHelper';
import { Dropdown } from './dropdown';
import { chatThemeOptions } from '../constant/chatThemes';
import { getAnimationValue, hasAnimationDropdown } from '../helper/chatMessageSettingHelper';
import { chatAnimationOptions } from '../constant/chatAnimations';
import classNames from 'classnames';

interface IProps {
    settings: ChatSetting;
    setSettings: (newSettings: ChatSetting) => void;
}

export const SettingsPanel: React.FC<IProps> = (props: IProps) => {
    const toast = useToast();

    const channelOnChange = (e: any) => {
        const newValue = getValue(e);
        if (newValue == null) return;

        props.setSettings({ ...props.settings, twitchChannel: newValue });
    }

    const displayUrl = siteUrl + '#' + Routes.display + settingsToQueryParams(props.settings);
    const onClickCopy = () => {
        const copied = copyToClipboard(displayUrl);
        if (copied) {
            toast({
                title: 'Copied!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const setAdditionalProperty = (key: string, value: string) => {
        props.setSettings({
            ...props.settings,
            additional: {
                ...props.settings.additional,
                [key]: value,
            }
        });
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
                <Dropdown
                    placeholder="Select option"
                    options={chatThemeOptions.map(theme => ({
                        name: theme.name,
                        value: theme.type.toString(),
                        aditional: theme,
                    }))}
                    onChange={(selectedOption) => {
                        props.setSettings({ ...props.settings, messageTileType: Number(selectedOption.value) });
                    }}
                    trailingPresenter={(selectedOption) => {
                        if (selectedOption.aditional.isPremium !== true) return null;
                        return (<Tag variant='solid' colorScheme='purple'>Premium</Tag>);
                    }}
                />
            </Box>
            <Box mt={5} className={classNames({ 'not-visible': !hasAnimationDropdown(props.settings.messageTileType) })}>
                <Text>New message animation</Text>
                <Dropdown
                    placeholder="Select option"
                    options={chatAnimationOptions}
                    defaultValue={getAnimationValue(props.settings)}
                    onChange={(selectedOption) => {
                        setAdditionalProperty(ChatSettingAdditionalKey.animation, selectedOption.value);
                    }}
                />
            </Box>
            <Box className="url" mt={5}>
                <Text>Overlay url</Text>
                <InputGroup key={settingsToQueryParams(props.settings)}>
                    <Textarea
                        variant='filled'
                        rows={3}
                        defaultValue={displayUrl}
                    />
                    <InputRightElement
                        className="pointer"
                        children={<CopyIcon color='green.500' onClick={onClickCopy} />}
                    />
                </InputGroup>
            </Box>
        </Box>
    );
}