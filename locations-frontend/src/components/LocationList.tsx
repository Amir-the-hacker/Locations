import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import InboxIcon from '@mui/icons-material/Inbox'
import type { LocationDto } from '../api/models'
import { CreateLocationForm } from './CreateLocationForm'

interface LocationListProps {
  locations?: LocationDto[]
  onSelectLocation: (id: string) => void
}

export const LocationList = ({
  locations,
  onSelectLocation,
}: LocationListProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false)

  return (
    <Box sx={{ width: '100%' }}>
      <nav aria-label="location list">
        <List
          sx={{
            overflow: 'auto',
            width: '100%',
            bgcolor: 'background.paper',
            maxHeight: 200,
          }}
        >
          {locations && locations.length > 0 ? (
            locations.map((location) => (
              <ListItem key={location.id} disablePadding>
                <ListItemButton onClick={() => onSelectLocation(location.id)}>
                  <ListItemIcon />
                  <ListItemText
                    primary={location.name}
                    secondary={location.address ?? 'no address available'}
                  />
                </ListItemButton>
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

      <Box sx={{ p: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => setShowCreateForm((prev) => !prev)}
        >
          {showCreateForm ? 'Close' : 'Create New'}
        </Button>
      </Box>

      {showCreateForm && (
        <Box sx={{ mt: 1 }}>
          <CreateLocationForm onClose={() => setShowCreateForm(false)} />
        </Box>
      )}
    </Box>
  )
}
