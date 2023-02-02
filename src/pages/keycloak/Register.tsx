import React, { useRef, memo, useEffect } from 'react'
import { styled } from '@mui/system'
import type { KcProps } from 'keycloakify/lib/components/KcProps'
import type { KcContextType } from '@/utils/keycloakManager'
import {
  Button,
  TextField,
  Box,
  Typography,
  Link,
  FormControl,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Container from '@mui/material/Container'
import GlobalCss from '../common/GlobalCss'
import back_logo_image from '@/assets/images/login-logo.svg'
import back_ground_image from '@/assets/images/login-image.png'
import axios from 'axios'

type KcContext_Register = Extract<KcContextType, { pageId: 'register.ftl' }>

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

type FORM = {
  userName: string
  firstName: string
  lastName: string
  password: string
  email: string
  groupName: string | null
  password_confirm: string
  auth: 'ROLE_USER'
}

export const Register = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_Register } & KcProps) => {
    const { t } = useTranslation()

    const [resData, setResData] = React.useState<FORM>({
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      groupName: null,
      password_confirm: '',
      auth: 'ROLE_USER',
    })

    const {
      url,
      register: { formData },
      message,
    } = kcContext
    const form = useRef<HTMLFormElement>(null)

    // console.log({ firstName, displayName, lastName, email, username })
    // console.log(message)

    const handleCancel = () => {
      window.location.href = url.loginUrl
    }

    useEffect(() => {
      if (
        message?.type === 'error' &&
        message?.summary?.includes('emailExistsMessage')
      ) {
        // toast.error(<Toast title={t('error.register')} message={`${caution} ${t('error.register.help')}`} />);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = React.useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const resisterURL = url.registrationAction;
        const resisterURL = `/api/v1/manager/user`
        axios.post(resisterURL, resData).then((res) => {
          alert('회원가입이 완료되었습니다.')
          window.location.href = url.loginUrl
        })
      },
      [resData, url.loginUrl]
    )

    return (
      <>
        <GlobalCss />
        <LoginBackLogoBox>
          <LoginBackLogoImage src={back_logo_image} />
        </LoginBackLogoBox>
        <Container component="main" maxWidth="sm" data-class="Container">
          <InputContainer>
            <TitleBox>
              <Title variant="h3" gutterBottom>
                <h6> {t('join')} </h6>
              </Title>
            </TitleBox>
            <RegisterForm ref={form} method="post" onSubmit={onSubmit}>
              <InputBox>
                <FormContent>
                  <Input
                    margin="normal"
                    fullWidth
                    required
                    label={t('username')}
                    id="username"
                    name="username"
                    variant="filled"
                    value={resData.userName}
                    onChange={(e) => {
                      setResData((prev) => ({
                        ...prev,
                        userName: e.target.value,
                      }))
                    }}
                  />
                  <Input
                    type="password"
                    margin="normal"
                    fullWidth
                    required
                    label={t('password')}
                    id="password"
                    name="password"
                    variant="filled"
                    value={resData.password}
                    onChange={(e) => {
                      setResData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }}
                  />
                  <Input
                    margin="normal"
                    type="password"
                    fullWidth
                    required
                    label={t('password-confirm')}
                    id="password-confirm"
                    name="password-confirm"
                    variant="filled"
                    helperText={
                      message?.summary?.includes('match') &&
                      t('input-error-password-confirm')
                    }
                    value={resData.password_confirm}
                    onChange={(e) => {
                      setResData((prev) => ({
                        ...prev,
                        password_confirm: e.target.value,
                      }))
                    }}
                  />
                </FormContent>
                <FormContent>
                  <Input
                    margin="normal"
                    fullWidth
                    required
                    label={t('firstName')}
                    id="firstName"
                    name="firstName"
                    variant="filled"
                    value={resData.firstName}
                    onChange={(e) => {
                      setResData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }}
                  />
                  <Input
                    margin="normal"
                    fullWidth
                    required
                    label={t('lastName')}
                    id="lastName"
                    name="lastName"
                    variant="filled"
                    value={resData.lastName}
                    onChange={(e) => {
                      setResData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }}
                  />
                  <Input
                    type="email"
                    margin="normal"
                    fullWidth
                    required
                    label={t('email')}
                    id="email"
                    name="email"
                    variant="filled"
                    helperText={
                      message?.summary?.includes('email') &&
                      t('input-error-email')
                    }
                    value={resData.email}
                    onChange={(e) => {
                      setResData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }}
                  />
                </FormContent>
              </InputBox>

              <Action className="button-group">
                <CancelButton
                  variant="outlined"
                  type="button"
                  onClick={handleCancel}
                >
                  {t('cancel')}
                </CancelButton>
                <SubmitButton type="submit" variant="contained">
                  {' '}
                  {t('register')}
                </SubmitButton>
              </Action>
            </RegisterForm>
          </InputContainer>
        </Container>
        <LoginBackGroundBox>
          <div style={{ width: '410.8px' }}>
            <LoginBackGroundImage src={back_ground_image} />
          </div>
        </LoginBackGroundBox>

        <LoginBackFooterBox data-class="LoginBackFooterBox">
          <LoginFooter data-class="LoginFooter">
            <Copyright sx={{ mt: 5 }} data-class="Copyright" />
          </LoginFooter>
        </LoginBackFooterBox>
      </>
    )
  }
)

const LoginBackLogoBox = styled(Box)`
  padding: 44.5px 56px 30px;
`
const LoginBackLogoImage = styled('img')`
  width: 149.2px;
  height: 24.6px;
`

const LoginBackGroundBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: right;
  position: absolute;
  bottom: 100px;
  z-index: -1;
`

const LoginBackGroundImage = styled('img')`
  width: 335.8px;
  height: 241px;
`

const TitleBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Title = styled(Typography)`
  color: #fff;
  margin-bottom: 0;
  line-height: 0rem;
`
const InputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const RegisterForm = styled('form')`
  width: 100%;
  margin: 0;
`
const InputBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`

const FormContent = styled(FormControl)`
  width: calc(50% - 1rem);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

const Input = styled(TextField)`
  background-color: #fff;
  /* label[data-shrink='true'] {
    color: #000000;
  } */
  p.MuiFormHelperText-root {
    border: none;
    color: red;
    position: absolute;
    right: 0;
  }
`
const Action = styled(Box)`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const CancelButton = styled(Button)`
  height: 3rem;
  box-shadow: none;
  background-color: #46baf4;
  border-radius: 50px;
  margin-bottom: 8px;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`
const SubmitButton = styled(Button)`
  height: 3rem;
  box-shadow: none;
  background-color: #04abfc;
  border-radius: 50px;
  margin-bottom: 8px;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`

const LoginBackFooterBox = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const LoginFooter = styled(Box)`
  display: flex;
  /* width: 100%; */
  height: 52px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 52px;
  background-image: linear-gradient(to right, #1153a7, #00acff);
`

const CopyrightText = styled('p')`
  color: #ffffff;
  margin: 0px;
  margin-top: 0px !important;
`

export default Register
