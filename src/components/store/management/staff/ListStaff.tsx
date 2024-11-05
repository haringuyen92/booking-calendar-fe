import React from "react"

interface ListStaffProps {
    store_id: string
}

const ListStaff: React.FC<ListStaffProps> = ({store_id}) => {
    return (
        <div className="staff">{store_id}</div>
    )
}

export default ListStaff