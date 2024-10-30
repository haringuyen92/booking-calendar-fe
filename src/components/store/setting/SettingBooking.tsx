import React from "react";

interface SettingBookingProps {
    storeId: string;
}

const SettingBooking: React.FC<SettingBookingProps> = ({ storeId }) => {
    return (
        <div>{storeId}</div>
    )
}

export default SettingBooking;