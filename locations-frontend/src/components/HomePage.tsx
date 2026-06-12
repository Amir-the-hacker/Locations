import { useState } from 'react'
import { Container, Grid } from '@mui/material'
import { LocationList } from './LocationList'
import { UpdateLocationModal } from './UpdateLocationModal'
import { useLocationsControllerFindAll } from '../api/endpoints/locations/locations'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { LocationMap } from './LocationMap'
import type { LocationDto } from '../api/models'

export const HomePage = () => {
  const { data } = useLocationsControllerFindAll(
    {},
    {
      query: {
        enabled: true,
      },
    }
  )

  const [selectedLocation, setSelectedLocation] = useState<LocationDto | null>(
    null
  )
  const [updateModalOpen, setUpdateModalOpen] = useState(false)

  const handleSelectLocation = (id: string) => {
    const found = data?.data?.find((loc) => loc.id === id) ?? null
    setSelectedLocation(found)
    setUpdateModalOpen(true)
  }

  const handleCloseModal = () => {
    setUpdateModalOpen(false)
    setSelectedLocation(null)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Location App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ justifyContent: 'center', mt: 4 }}>
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <LocationMap locations={data?.data} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <LocationList
              locations={data?.data}
              onSelectLocation={handleSelectLocation}
            />
          </Grid>
        </Grid>
      </Container>

      <UpdateLocationModal
        open={updateModalOpen}
        location={selectedLocation}
        onClose={handleCloseModal}
      />
    </>
  )
}
