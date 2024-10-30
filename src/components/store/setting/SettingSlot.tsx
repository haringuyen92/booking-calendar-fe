import React from "react";

interface SettingSlotProps {
    storeId: string;
}

const SettingSlot: React.FC<SettingSlotProps> = ({ storeId }) => {
    return (
        <div>{storeId}</div>
    )
}

export default SettingSlot;