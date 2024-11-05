import React from "react"

interface CreateStaffProps {
    store_id: string
}

const CreateStaff: React.FC<CreateStaffProps> = ({store_id}) => {
    return (
        <div className="createStaff">{store_id}</div>
    )
}

export default CreateStaff