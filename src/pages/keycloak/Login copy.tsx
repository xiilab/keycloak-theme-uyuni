import React, { useRef, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'; 
import { Button, TextField } from '@mui/material';

import type { KcProps } from 'keycloakify/lib/components/KcProps';
import type { KcContextType } from '@/utils/keycloakManager';

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import back_ground_image from "@/assets/images/login-image.png";
import back_logo_image from "@/assets/images/login-logo.svg";
import back_text_image from "@/assets/images/login-text.png";

type KcContext_Login = Extract<KcContextType, { pageId: 'login.ftl' }>;


// login

export const LoginText = styled(Typography)`
  font-family: Roboto;
  font-size: 40px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #04abfc;
`;

export const LeftContainer = styled(Grid)`
  display: flex;
  flex-direction: column !important;
  background-color: #2184ff;
  justify-content: flex-start;
  @media screen and (max-width: 599px) {
    display: none;
  }
  @media screen and (max-width: 899px) {
    display: none;
  }
`;

export const RightContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginBackGroundImage = styled.img`
  margin-top: 124.5px;
  width: 335.8px;
  height: 241px;
`;
export const LoginBackGroundBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

export const LoginBackTextImage = styled.img`
  width: 628px;
  height: 117px;
  text-align: center;
`;

export const LoginBackLogoImage = styled.img`
  width: 149.2px;
  height: 24.6px;
`;
export const LoginBackLogoBox = styled(Box)`
  padding-top: 44px;
  padding-left: 56px;
  padding-right: 56px;
  height: 10%;
`;

export const LoginBackFooterBox = styled(Box)`
  height: 10%;
  display: flex;
  align-items: flex-end;
`;
export const LoginFooter = styled(Box)`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 52px;
  background-image: linear-gradient(to right, #136fe4, #04abfc);
`;

export const CopyrightText = styled.p`
  color: #ffffff;
  margin: 0px;
`;

export const Submit = styled(Button)`
  height: 68px;
  box-shadow: 0 4px 8px 0 #b4d7ff;
  background-color: #04abfc;
  border-radius: 50px;
`;

// login



const LoginForm = styled.form`
  width: 25rem;
  height: 15rem;
  background-color: white;
  /* border-radius: 5px; */
  /* box-shadow: 2px 2px 8px 0px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


function Copyright(props: any) {
  return (
    <CopyrightText variant="body2" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://xiilab.com/main">
        system Corp.
      </Link>{" "}
      All Rights Reserved.
    </CopyrightText>
  );
}

export const Login = memo(
	({ kcContext, ...props }: { kcContext: KcContext_Login } & KcProps) => {
    const { t } = useTranslation();
    const form = useRef<HTMLFormElement>(null);
		const { social, url, message, realm, } = kcContext;
    const isSessionOut = message?.summary.includes('attempt timed out') || message?.summary.includes('Timeout');

    console.log(kcContext);

    const handleSubmit = () => {
      console.log(form);
      form?.current?.submit();
    };

    useEffect(() => {
      if (message?.summary === 'emailSentMessage') {
        // toast.success(<Toast title={t('success.send.reset.password.email')} message={t('success.send.reset.password.email.default')} />);
      } else if (message?.summary === 'expiredActionTokenSessionExistsMessage') {
        // toast.error(<Toast title={t('error.session.expired')} message={t('error.session.expired.default')} />);
      } else if (message?.summary === 'accountUpdatedMessage') {
        // toast.success(<Toast title={t('success.account.update')} message={t('success.account.update.message')} />);
      }
    }, []);

		return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <LeftContainer
          item
          xs={false}
          sm={false}
          md={9}
          sx={{}}
          data-class="LeftContainer"
        >
          <LoginBackLogoBox data-class="LoginBackLogoBox">
            <LoginBackLogoImage
              src={back_logo_image}
              data-class="LoginBackLogoImage"
            />
          </LoginBackLogoBox>
          <LoginBackGroundBox data-class="LoginBackGroundBox">
            <LoginBackTextImage
              src={back_text_image}
              data-class="LoginBackTextImage"
            />
            <LoginBackGroundImage
              src={back_ground_image}
              data-class="LoginBackGroundImage"
            />
          </LoginBackGroundBox>
          <LoginBackFooterBox data-class="LoginBackFooterBox">
            <LoginFooter data-class="LoginFooter">
              <Copyright sx={{ mt: 5 }} data-class="Copyright" />
            </LoginFooter>
          </LoginBackFooterBox>
        </LeftContainer>

        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RightContainer
            sx={{
              my: 8,
              mx: 4,
            }}
          >
            <LoginText variant="h5">Login</LoginText>
            <LoginForm ref={form} method="post" action={url.loginAction}>
              <TextField
                margin="normal"
                required
                fullWidth
                label={t("id")}
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label={t("password")}
                id="password"
                name="password"
                autoComplete="current-password"
              />
              
              <Submit
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("login")}
              </Submit>
              
            </LoginForm>
          </RightContainer>
        </Grid>
      </Grid>
    );
	},
);

export default Login;
