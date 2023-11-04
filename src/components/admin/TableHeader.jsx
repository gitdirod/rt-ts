import React from 'react'

export default function TableHeader({ columns, style='base-th-class', z='z-0'}) {
    return (
      // <thead className={`w-full sticky top-0 text-sm  ${z}`} >
      <thead className={`w-full sticky top-0 text-sm font-poppins-regular  ${z} `} >
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className={`${style} ${column.className} ${index === 0 ? 'rounded-l-lg' : ''} ${index === columns.length - 1 ? 'rounded-r-lg' : ''}`}
            >
              <div className='flex justify-center items-center'>{column.title}</div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }