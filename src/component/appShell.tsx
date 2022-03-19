import { ReactNode } from "react";
import { Box } from '@chakra-ui/react';
import { Navbar } from "./layout/navbar";

interface IProps {
    children: ReactNode;
}

export const AppShell: React.FC<IProps> = (props: IProps) => {

    return (
        <>
            <Navbar />
            <Box className="content">
                {props.children}
            </Box>
        </>
    );
}