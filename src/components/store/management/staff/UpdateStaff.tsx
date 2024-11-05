import React from "react"

interface UpdateStaffProps {
    store_id: string
}

const UpdateStaff: React.FC<UpdateStaffProps> = ({ store_id}) => {
    return (
        <div>{store_id}</div>
    )
}

export default UpdateStaff;