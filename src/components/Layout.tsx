import React from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  GlobalStyles,
  Toolbar,
} from '@mui/material'
import { ReactComponent as WhiteLogo } from '@/assets/icons/logo-white.svg'

interface IProps {
  children:
    | React.ReactElement
    | React.ReactChildren
    | string
    | boolean
    | null
    | undefined
}

const Layout = ({ children }: IProps) => {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          background: `#122C44`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ flexGrow: 1 }}>
            <WhiteLogo />
          </Box>

          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5, color: '#fff', borderColor: '#fff' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {children}
      </Container>
    </React.Fragment>
  )
}

export default Layout
