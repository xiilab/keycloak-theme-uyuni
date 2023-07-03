import React, { memo, useRef } from 'react'

import { Box, Tabs, Tab, TextField, Button } from '@mui/material'
import { Layout } from '@/components'
import { KcContextType } from '@/utils/keycloakManager'
import type { KcProps } from 'keycloakify/lib'

type KcContext_Account = Extract<
  KcContextType,
  { pageId: 'login-update-profile.ftl' }
>

const Account = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_Account } & KcProps) => {
    const { username, email, firstName, lastName } = kcContext.user
    const { loginAction } = kcContext.url
    const form = useRef<HTMLFormElement>(null)
    return (
      <Layout>
        <>
          <Box sx={{ bgcolor: 'background.paper' }}>
            <Tabs value={0} centered>
              <Tab label="Account" />
              <Tab label="Authenticator" />
              <Tab label="Sessions" />
              <Tab label="Applications" />
            </Tabs>
          </Box>
          <Box
            component={'form'}
            action={loginAction}
            ref={form}
            sx={{
              mt: 5,
              '& .MuiTextField-root': {
                m: 1,
                pl: '8px',
                pr: '8px',
              },
              '& .MuiFormControl-root': {
                ml: 0,
                mr: 0,
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ width: '100%' }}>
              <TextField
                id="username"
                name={'username'}
                label="Username"
                value={username}
                onChange={() => false}
                margin="none"
                fullWidth
              />
              <TextField
                required
                id="email"
                label="Email"
                name={'email'}
                defaultValue={email}
                margin="none"
                fullWidth
              />
              <TextField
                required
                id="firstName"
                name={'firstName'}
                label="First name"
                defaultValue={firstName}
                margin="none"
                fullWidth
              />
              <TextField
                required
                id="lastName"
                name={'lastName'}
                label="Last name"
                defaultValue={lastName}
                margin="none"
                fullWidth
              />
              <Box
                sx={{
                  mt: 3,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                <Button
                  type={'submit'}
                  variant="contained"
                  color="primary"
                  size="large"
                  value={'Save'}
                >
                  Save
                </Button>
                <Button
                  type={'submit'}
                  variant="contained"
                  color="error"
                  size="large"
                  value={'Cancer'}
                >
                  Cancer
                </Button>
              </Box>
            </div>
          </Box>
        </>
      </Layout>
    )
  }
)

export default Account
