import React from "react";

interface SettingActionProps {
    storeId: string
}

const SettingAction: React.FC<SettingActionProps> = ({ storeId }) => {
    return (
        <div>{storeId}</div>
    )
}

export default SettingAction;