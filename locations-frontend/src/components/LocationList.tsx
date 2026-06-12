import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/Inbox'
import type { LocationDto } from '../api/models'

interface LocationListProps {
  locations?: LocationDto[]
}

export const LocationList = ({ locations }: LocationListProps) => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'gray' }}>
      <nav aria-label="main mailbox folders">
        <List sx={{ overflow: 'auto', maxHeight: 100 }}>
          {locations ? (
            locations.map((location) => (
              <ListItem disablePadding>
                <ListItemButton key={location.id}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={location.name}
                    secondary={location.address}
                  />
                </ListItemButton>{' '}
              </ListItem>
            ))
          ) : (
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="there are no points" />
            </ListItemButton>
          )}
        </List>
      </nav>
      <Divider />
    </Box>
  )
}
