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
    <>
      {' '}
      <nav aria-label="main mailbox folders">
        <List
          sx={{
            overflow: 'auto',
            width: '100%',
            bgcolor: 'background.paper',
            maxHeight: 200,
          }}
        >
          {locations ? (
            locations.map((location) => (
              <ListItem disablePadding>
                <ListItemButton key={location.id} onClick={}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={location.name}
                    secondary={location.address ?? 'no address available'}
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
    </>
  )
}
