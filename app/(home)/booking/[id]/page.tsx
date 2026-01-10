"use client"
import { useParams } from "next/navigation"

const BookingDetailspage = () => {
    const {id} = useParams();
  return (
    <div>{id}</div>
  )
}

export default BookingDetailspage;