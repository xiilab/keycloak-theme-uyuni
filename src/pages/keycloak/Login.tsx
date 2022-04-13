import React, { useRef, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'; 
import { Button, TextField } from '@mui/material';

import type { KcProps } from 'keycloakify/lib/components/KcProps';
import type { KcContextType } from '@/utils/keycloakManager';

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import back_ground_image from "@/assets/images/login-image.png";
import back_logo_image from "@/assets/images/login-logo.svg";
import back_text_image from "@/assets/images/login-text.png";

type KcContext_Login = Extract<KcContextType, { pageId: 'login.ftl' }>;


//new
const LoginBackLogoBox = styled(Box)`
  padding: 44.5px 56px;
`;
const LoginBackLogoImage = styled.img`
  width: 149.2px;
  height: 24.6px;
`;

const LoginBackTextBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 86.9px;
  margin-bottom: 74px;
`;

const LoginBackTextImage = styled.img`
  width: 628px;
  height: 117px;
`;

const LoginBackGroundBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const LoginBackGroundImage = styled.img`
  width: 335.8px;
  height: 241px;
`;

const LoginBackFooterBox = styled(Box)`
  /* height: 10%; */
  /* display: flex; */
  /* align-items: flex-end; */
  position: absolute;
  width: 100%;
  bottom: 0px;
`;

const LoginFooter = styled(Box)`
  display: flex;
  /* width: 100%; */
  height: 52px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 52px;
  background-image: linear-gradient(to right, #1153a7, #00acff);
`;

const CopyrightText = styled.p`
  color: #ffffff;
  margin: 0px;
`;


const LoginBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Submit = styled(Button)`
  height: 88px;
  /* box-shadow: 0 4px 8px 0 #b4d7ff; */
  box-shadow: none;
  background-color: #04abfc;
  border-radius: 50px;
  margin-bottom: 8px;
`;

const LoginForm = styled.form`
  width: 25rem;
  height: 15rem;
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



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
    
    const [open, setOpen] = React.useState(false);

    const [alert, setAlert] = React.useState<React.ReactElement>();

    
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
        setOpen(true);
        setAlert(
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <h2>{t("success.send.reset.password.email")}</h2>
            {t("success.send.reset.password.email.default")}
          </Alert>
        );
        // toast.success(<Toast title={t('success.send.reset.password.email')} message={t('success.send.reset.password.email.default')} />);
      } else if (message?.summary === 'expiredActionTokenSessionExistsMessage') {
        setOpen(true);
        setAlert(
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            <h2>{t("error.session.expired")}</h2>
            {t("error.session.expired.default")}
          </Alert>
        );
        // toast.error(<Toast title={t('error.session.expired')} message={t('error.session.expired.default')} />);
      } else if (message?.summary === 'accountUpdatedMessage') {
        setOpen(true);
        setAlert(
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <h2>{t("success.account.update")}</h2>
            {t("success.account.update.message")}
          </Alert>
        );
        // toast.success(<Toast title={t('success.account.update')} message={t('success.account.update.message')} />);
      }
    }, []);


    


    
    // const handleClick = () => {
    //   setOpen(true);
    // };
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };



		return (
      <Grid
        data-class="container"
        container
        component="main"
        sx={{
          width: "100%",
          height: "100vh",
          // height: "100vh",
          backgroundImage: "linear-gradient(to left, #04aafb, #136fe4)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <LoginBackLogoBox>
          <LoginBackLogoImage src={back_logo_image} />
        </LoginBackLogoBox>

        <LoginBackTextBox data-class="LoginBackTextBox">
          <LoginBackTextImage src={back_text_image} />
        </LoginBackTextBox>

        <LoginBox>
          <LoginForm ref={form} method="post" action={url.loginAction}>
            <TextField
              sx={{
                backgroundColor: "#fff",
              }}
              margin="normal"
              required
              fullWidth
              // label={t("id")}
              // InputLabelProps={{ shrink: true }}
              id="username"
              name="username"
              autoComplete="username"
              placeholder={t("id")}
              autoFocus
            />
            <TextField
              sx={{
                backgroundColor: "#fff",
              }}
              margin="normal"
              required
              fullWidth
              type="password"
              // label={t("password")}
              // InputLabelProps={{ shrink: true }}
              id="password"
              name="password"
              placeholder={t("password")}
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
        </LoginBox>

        <LoginBackGroundBox>
          <div style={{ width: "410.8px" }}>
            <LoginBackGroundImage src={back_ground_image} />
          </div>
        </LoginBackGroundBox>

        <LoginBackFooterBox data-class="LoginBackFooterBox">
          <LoginFooter data-class="LoginFooter">
            <Copyright sx={{ mt: 5 }} data-class="Copyright" />
          </LoginFooter>
        </LoginBackFooterBox>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {/* <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <h2>This is a success message!</h2>
            This is a success message!
          </Alert> */}
          {alert}
        </Snackbar>
      </Grid>
    );
	},
);

export default Login;
