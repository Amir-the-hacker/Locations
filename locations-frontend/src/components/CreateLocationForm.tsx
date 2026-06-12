import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { LocationsControllerCreateBody } from '../api/endpoints/locations/locations.zod'
import { useLocationsControllerCreate } from '../api/endpoints/locations/locations'
import { useQueryClient } from '@tanstack/react-query'
import type { z } from 'zod'

type CreateFormValues = z.infer<typeof LocationsControllerCreateBody>

const CATEGORIES = [
  { value: 'office', label: 'Office' },
  { value: 'store', label: 'Store' },
  { value: 'landmark', label: 'Landmark' },
] as const

interface CreateLocationFormProps {
  open: boolean
  onClose: () => void
}

export const CreateLocationForm = ({ open, onClose }: CreateLocationFormProps) => {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateFormValues>({
    resolver: zodResolver(LocationsControllerCreateBody),
    defaultValues: {
      name: '',
      category: 'office',
      coordinates: { lon: 0, lat: 0 },
      address: '',
      notes: '',
    },
  })

  const createMutation = useLocationsControllerCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/locations'] })
        reset()
        onClose()
      },
    },
  })

  const onSubmit = (data: CreateFormValues) => {
    createMutation.mutate({ data })
  }

  const isBusy = isSubmitting || createMutation.isPending

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Location</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <DialogContent dividers>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Category"
                  fullWidth
                  error={Boolean(errors.category)}
                  helperText={errors.category?.message}
                >
                  {CATEGORIES.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Stack direction="row" spacing={2}>
              <Controller
                name="coordinates.lon"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    label="Longitude"
                    type="number"
                    fullWidth
                    slotProps={{
                      htmlInput: { min: -180, max: 180, step: 'any' },
                    }}
                    error={Boolean(errors.coordinates?.lon)}
                    helperText={errors.coordinates?.lon?.message}
                  />
                )}
              />

              <Controller
                name="coordinates.lat"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    label="Latitude"
                    type="number"
                    fullWidth
                    slotProps={{
                      htmlInput: { min: -90, max: 90, step: 'any' },
                    }}
                    error={Boolean(errors.coordinates?.lat)}
                    helperText={errors.coordinates?.lat?.message}
                  />
                )}
              />
            </Stack>

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes"
                  fullWidth
                  multiline
                  minRows={2}
                  error={Boolean(errors.notes)}
                  helperText={errors.notes?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isBusy}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
