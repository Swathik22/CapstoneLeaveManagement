import { useEffect, useState } from "react"
import { getAllHolidays } from "../../managers/holidayManager"
import { Table } from "reactstrap"

export const Holiday=()=>{
    const[holidays,setHolidays]=useState([])

    useEffect(()=>{
        getAllHolidays().then((data)=>{
            setHolidays(data)
        })
    },[])
    return (
        <>       
      <div className="userprofile-container">
        
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Holiday</th>
            </tr>
          </thead>
          <tbody>
            {holidays?.map((l) => (
              <tr key={l.id}>
                <td>
                  {new Date(l.date).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {l.name}
                </td>               
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
        </>
    )
}