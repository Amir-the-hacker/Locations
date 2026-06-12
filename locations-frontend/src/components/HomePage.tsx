import { Container, Grid } from '@mui/material'
import { LocationList } from './LocationList'
import { useLocationsControllerFindAll } from '../api/endpoints/locations/locations'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { LocationMap } from './LocationMap'
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
      <Container sx={{ mt: 4, justifyContent: 'center' }}>
        <Typography variant="h5" sx={{}}>
          test
        </Typography>

        <Grid>
          <LocationMap locations={data?.data} />
          {/* <LocationList data={data} /> */}
        </Grid>
      </Container>
    </>
  )
}
