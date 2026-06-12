import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
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
  onClose: () => void
}

export const CreateLocationForm = ({ onClose }: CreateLocationFormProps) => {
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
    <Paper elevation={2} sx={{ p: 3, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Create New Location
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
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

          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={isBusy}
              fullWidth
            >
              Create
            </Button>
            <Button variant="outlined" onClick={onClose} fullWidth>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}
