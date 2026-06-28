import React from 'react'
import { DotLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className='fixed inset-0 flex justify-center items-center'>
            <DotLoader />
        </div>
    )
}


/* HTML: <div class="loader"></div> */
