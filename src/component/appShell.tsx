import { ReactNode } from "react";
import { Box } from '@chakra-ui/react';

interface IProps {
    children: ReactNode;
}

export const AppShell: React.FC<IProps> = (props: IProps) => {

    return (
        <Box>
            {props.children}
        </Box>
    );
}