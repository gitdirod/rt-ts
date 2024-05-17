import React, { memo } from 'react'


const Tbody = ({ items, renderRow }) => (
    <>
    <tbody className='w-full'>
      {items?.map(item => renderRow(item))}
    </tbody>
    </>
);

export default memo(Tbody)
