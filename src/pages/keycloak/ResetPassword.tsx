import React, { useRef, memo, useEffect } from 'react'
import { KcProps } from 'keycloakify/lib/components/KcProps'
import { KcContextType } from '@/utils/keycloakManager'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Link from '@mui/material/Link'
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import GlobalCss from '../common/GlobalCss'
import back_logo_image from '@/assets/images/login-logo.svg'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import LoginText from '@/pages/keycloak/login-text'
import TextField from '@mui/material/TextField'
import back_ground_image from '@/assets/images/login-image.png'
import Snackbar from '@mui/material/Snackbar'
import { useTranslation } from 'react-i18next'

type KcContext_UpdatePassword = Extract<
  KcContextType,
  { pageId: 'login-update-password.ftl' }
>
const theme = createTheme({})

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

const ResetPassword = memo(
  ({
    kcContext,
    ...props
  }: { kcContext: KcContext_UpdatePassword } & KcProps) => {
    // url : 전송할 주소
    const { url, message, realm } = kcContext

    const form = useRef<HTMLFormElement>(null)
    const { t } = useTranslation()
    const [open, setOpen] = React.useState(false)

    const [alert, setAlert] = React.useState<React.ReactElement>()

    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen(false)
    }

    useEffect(() => {
      setOpen(true)
      setAlert(
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          <AlertTitle>패스워드 변경</AlertTitle>
          계정을 활성화하려면 비밀번호를 변경해야 합니다.
        </Alert>
      )
    }, [])

    return (
      <ThemeProvider theme={theme}>
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
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                placeholder={t('password')}
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
                id="password-confirm"
                name="password-confirm"
                placeholder={t('password.confirm')}
                autoComplete="current-password"
              />

              <Submit
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('password.change')}
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
      </ThemeProvider>
    )
  }
)

export default ResetPassword

const AlertTitle = styled.h2`
  margin-top: 0;
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
