// Define the styles object outside the component
const dateTimePicker = {
  textField: {
    variant: 'standard' as const,
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      sx: {
        color: 'white',
        placeholderColor: 'white',
        fontSize: '0.9rem',
        backgroundColor: 'transparent',
        '&:before': {
          display: 'none',
        },
        '&:after': {
          display: 'none',
        },
      },
    },
    sx: {
      '& .MuiInputBase-root': {
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        borderRadius: '9999px',
      },
      '& .MuiInput-underline:before': {
        borderBottom: 'none',
      },
      '& .MuiInput-underline:after': {
        borderBottom: 'none',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: 'none',
      },
    },
  },
}

export default dateTimePicker
