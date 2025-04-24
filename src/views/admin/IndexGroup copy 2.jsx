import { useState } from 'react'
import IsLoading from '/src/components/store/common/IsLoading'
import { GroupService } from '/src/services/GroupService'
import { CategoryService } from '/src/services/CategoryService'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BACKEND from '/src/data/backend'


export default function IndexGroup (){

    const { data:groups, mutate:mutateGroups } = GroupService.useAllGroups() 
    const { data:categories } = CategoryService.useAllCategories() 
    
    if(groups === undefined) return(<IsLoading/>)
    return (
    <div className='overflow-y-hidden flex flex-col flex-1'>
        <Box sx={{display:'flex', my:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
          <Stack direction="row" flexShrink={0} alignItems="center">
            <CategoryIcon color="primary" fontSize="large"/>
            <Typography 
              component="div" 
              sx={{ fontWeight: 'bold', fontSize:'1.8rem', color:'grey.800' }}
            >
              Grupos y categorias <Chip label={groups.length || 0} color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
            </Typography>

          </Stack>
          
          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} 
            onClick={() => {
            // Agregar grupo
          }}
          >
            Nuevo
          </Button>
        </Box>
        
        <div className='flex flex-col gap-1 max-h-[calc(100vh-150px)] overflow-y-auto'>
            {groups?.map(group => (
                <div
                    key={group.id}
                    className='bg-white flex content-center flex-col  p-4 border border-grey-300 rounded-lg '
                >
                    <span className='font-bold'>{group.name}</span>
                    {
                        group.categories.length > 0 && (
                            <div className='flex gap-2   flex-wrap'>
                                {group?.categories?.map(cat =>(
                                    <div key={cat.id} className='flex shrink justify-content-center alig_items-center flex-col w-40 h-40 border rounded-lg' >
                                        <span className='w-full text-center'>{cat.name}</span>
                                            <img 
                                                src={BACKEND.CATEGORIES.URL + cat?.images[0]?.['name']} 
                                                alt="save" 
                                                className='object-contain w-full h-full' 
                                         
                                            />

                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            ))}
            
        </div>
        
    </div>
  )
}
