import { Box, Input, InputGroup, InputRightElement, Tag, Text, Textarea, useToast } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import React from 'react';
import { ChatSetting } from '../contract/chatSettings';
import { getValue } from '../helper/eventHelper';
import { settingsToQueryParams } from '../mapper/chatSettingHelper';
import { siteUrl } from '../constant/site';
import { Routes } from '../constant/routes';
import { copyToClipboard } from '../helper/documentHelper';
import { Dropdown } from './dropdown';
import { chatAnimationOptions, chatThemeOptions } from '../constant/chatThemes';
import { hasAnimationDropdown } from '../helper/chatMessageSettingHelper';

interface IProps {
    settings: ChatSetting;
    setSettings: (newSettings: ChatSetting) => void;
}

export const SettingsPanel: React.FC<IProps> = (props: IProps) => {
    const toast = useToast();

    const channelOnChange = (prop: string) => (e: any) => {
        const newValue = getValue(e);
        if (newValue == null) return;

        props.setSettings({ ...props.settings, [prop]: newValue });
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

    return (
        <Box>
            <Box className="channel" mt={5}>
                <Text>Twitch channel</Text>
                <Input
                    variant='outline'
                    placeholder='khaoztopsy'
                    defaultValue={props.settings.twitchChannel}
                    onChange={channelOnChange('twitchChannel')}
                />
            </Box>
            {/* <Box className="channel" mt={5}>
                <Text>Youtube channel id</Text>
                <Input
                    variant='outline'
                    placeholder='khaoztopsy'
                    defaultValue={props.settings.youtubeChannel}
                    onChange={channelOnChange('youtubeChannel')}
                />
            </Box> */}
            <Box className="theme" mt={5}>
                <Text>Theme</Text>
                <Dropdown
                    defaultFirstItem={true}
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
            <Box mt={5} style={hasAnimationDropdown(props.settings.messageTileType)}>
                <Text>New message animation</Text>
                <Dropdown
                    defaultFirstItem={true}
                    placeholder="Select option"
                    options={chatAnimationOptions}
                    onChange={(selectedOption) => {
                        // props.setSettings({ ...props.settings, messageTileType: Number(selectedOption.value) });
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