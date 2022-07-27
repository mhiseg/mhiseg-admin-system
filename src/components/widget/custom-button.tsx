import { Button, ButtonKind } from "carbon-components-react";
import React from "react";

export interface CustomButtonProps {
    className?: string;
    onClick: () => void;
    kind: ButtonKind;
    buttonName: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    className,
    onClick,
    kind,
    buttonName,
}) => {


    return (
        <Button
            className={className}
            kind={kind}
            isSelected={true}
            onClick={(e) => {onClick()}}>
            {buttonName}
        </Button>
    );
}