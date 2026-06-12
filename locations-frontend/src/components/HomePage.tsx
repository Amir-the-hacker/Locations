import { Container, Grid, Typography } from '@mui/material'
import { LocationList } from './LocationList'
import { useLocationsControllerFindAll } from '../api/endpoints/locations/locations'

export const HomePage = () => {
  const { data } = useLocationsControllerFindAll(
    {},
    {
      query: {
        enabled: true,
      },
    }
  )

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        test
      </Typography>

      {data?.data.map((location) => (
        <Typography key={location.id}>{location.address}</Typography>
      ))}

      <LocationList />
    </Container>
  )
}
