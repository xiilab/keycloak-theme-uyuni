import React, { useRef, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import type { KcProps } from 'keycloakify/lib/components/KcProps'
import type { KcContextType } from '@/utils/keycloakManager'
import back_ground_image from '@/assets/images/login-image.png'
import back_logo_image from '@/assets/images/login-logo.svg'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import LoginText from './login-text'
import GlobalCss from '../common/GlobalCss'

type KcContext_Login = Extract<KcContextType, { pageId: 'login.ftl' }>

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function Copyright(props: any) {
  return (
    <CopyrightText variant="body2" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://xiilab.com/main">
        Xiilab.
      </Link>{' '}
      All Rights Reserved.
    </CopyrightText>
  )
}

export const Login = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_Login } & KcProps) => {
    const [open, setOpen] = React.useState(false)

    const [alert, setAlert] = React.useState<React.ReactElement>()

    const { t } = useTranslation()
    const form = useRef<HTMLFormElement>(null)
    const {
      // social,
      url,
      message,
      realm,
    } = kcContext
    // const isSessionOut =
    //   message?.summary.includes('attempt timed out') ||
    //   message?.summary.includes('Timeout')

    // const handleSubmit = () => {
    //   console.log(form)
    //   form?.current?.submit()
    // }

    useEffect(() => {
      if (message?.summary === 'emailSentMessage') {
        setOpen(true)
        setAlert(
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            <AlertTitle>{t('success.send.reset.password.email')}</AlertTitle>
            {t('success.send.reset.password.email.default')}
          </Alert>
        )
        // toast.success(<Toast title={t('success.send.reset.password.email')} message={t('success.send.reset.password.email.default')} />);
      } else if (
        message?.summary === 'expiredActionTokenSessionExistsMessage'
      ) {
        setOpen(true)
        setAlert(
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <AlertTitle>{t('error.session.expired')}</AlertTitle>
            {t('error.session.expired.default')}
          </Alert>
        )
        // toast.error(<Toast title={t('error.session.expired')} message={t('error.session.expired.default')} />);
      } else if (
        message?.summary === 'Account is disabled, contact your administrator.'
      ) {
        setOpen(true)
        setAlert(
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <AlertTitle>
              {t('Account is disabled, contact your administrator.')}
            </AlertTitle>
            {t('Account is disabled, contact your administrator.')}
          </Alert>
        )
        // toast.error(<Toast title={t('error.session.expired')} message={t('error.session.expired.default')} />);
      } else if (message?.summary === 'accountUpdatedMessage') {
        setOpen(true)
        setAlert(
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            <AlertTitle>{t('success.account.update')}</AlertTitle>
            {t('success.account.update.message')}
          </Alert>
        )
        // toast.success(<Toast title={t('success.account.update')} message={t('success.account.update.message')} />);
      } else if (message?.summary === 'Invalid username or password.') {
        setOpen(true)
        setAlert(
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <AlertTitle>{t('invalid.login.title')}</AlertTitle>
            {t('invalid.username.or.password')}
          </Alert>
        )
        // toast.success(<Toast title={t('success.account.update')} message={t('success.account.update.message')} />);
      } else if (
        message?.summary ===
        'Your login attempt timed out. Login will start from the beginning.'
      ) {
        setOpen(true)
        setAlert(
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <AlertTitle>{t('invalid.login.title')}</AlertTitle>
            {t(
              'Your login attempt timed out. Login will start from the beginning.'
            )}
          </Alert>
        )
        // toast.success(<Toast title={t('success.account.update')} message={t('success.account.update.message')} />);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen(false)
    }

    return (
      <>
        <GlobalCss />
        <LoginBackLogoBox>
          <LoginBackLogoImage src={back_logo_image} />
        </LoginBackLogoBox>
        <Container component="main" maxWidth="sm" data-class="Container">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            data-class="Box1"
          >
            <LoginBackTextBox data-class="LoginBackTextBox">
              {/*<LoginBackTextImage src={back_text_image}/>*/}
              <LoginText />
            </LoginBackTextBox>
            <LoginForm ref={form} method="post" action={url.loginAction}>
              <TextField
                sx={{
                  backgroundColor: '#fff',
                }}
                margin="normal"
                required
                fullWidth
                id="username"
                name="username"
                autoComplete="username"
                placeholder={t('id')}
                autoFocus
              />
              <TextField
                sx={{
                  backgroundColor: '#fff',
                }}
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                placeholder={t('password')}
                autoComplete="current-password"
              />
              {realm.registrationAllowed && (
                <RegistrationButton
                  fullWidth
                  variant="contained"
                  href={url.registrationUrl}
                  sx={{ mt: 3, mb: 0 }}
                >
                  {t('registration')}
                </RegistrationButton>
              )}

              <Submit
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('login')}
              </Submit>
            </LoginForm>
          </Box>
        </Container>

        <LoginBackGroundBox>
          <div style={{ width: '410.8px' }}>
            <LoginBackGroundImage src={back_ground_image} />
          </div>
        </LoginBackGroundBox>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {alert}
        </Snackbar>

        <LoginBackFooterBox data-class="LoginBackFooterBox">
          <LoginFooter data-class="LoginFooter">
            <Copyright sx={{ mt: 5 }} data-class="Copyright" />
          </LoginFooter>
        </LoginBackFooterBox>
      </>
    )
  }
)

export default Login

const AlertTitle = styled.h2`
  margin-top: 0;
`

const RegistrationButton = styled(Button)`
  height: 88px;
  box-shadow: none;
  background-color: #04abfc;
  border-radius: 50px;
  margin-bottom: 8px;
`

const LoginBackGroundBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: right;
  position: absolute;
  bottom: 100px;
  z-index: -1;
`

const LoginBackGroundImage = styled.img`
  width: 335.8px;
  height: 241px;
`

const LoginBackLogoBox = styled(Box)`
  padding: 44.5px 56px 30px;
`
const LoginBackLogoImage = styled.img`
  width: 149.2px;
  height: 24.6px;
`

const CopyrightText = styled.p`
  color: #ffffff;
  margin: 0px;
`

const LoginBackFooterBox = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const LoginFooter = styled(Box)`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 52px;
  background-image: linear-gradient(to right, #1153a7, #00acff);
`

const LoginBackTextBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 86.9px;
  margin-bottom: 74px;
`

const LoginForm = styled.form`
  width: 25rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .MuiFormControl-root {
    border-radius: 4px;
  }
`

const Submit = styled(Button)`
  height: 88px;
  box-shadow: none;
  background-color: #04abfc;
  border-radius: 50px;
  margin-bottom: 8px;
`
