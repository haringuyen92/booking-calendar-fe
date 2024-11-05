import React from "react"

interface BookingListProps {
    store_id: string
}

const ListBooking: React.FC<BookingListProps> = ({store_id}) => {
    return (
        <div>{store_id}</div>
    )
}

export default ListBooking