import { memo } from 'react'
import { defaultKcProps } from 'keycloakify'
// import { useTranslation } from 'react-i18next'
import type { KcContextType } from '@/utils/keycloakManager'

import Login from '@/pages/keycloak/Login'
import Register from '@/pages/keycloak/Register'
import ResetPassword from '@/pages/keycloak/ResetPassword'
// import Info from '@/pages/keycloak/Info';
import Error404 from '@/pages/common/Error404'
// import Error500 from '@/pages/common/Error500';

import Account from '@/pages/keycloak/Account'

import './KeycloakApp.scss'

export const KeycloakApp = memo(
  ({ kcContext }: { kcContext: KcContextType }) => {
    // const { t } = useTranslation()

    switch (kcContext.pageId) {
      /**
       * 로그인
       */
      case 'login.ftl':
        return <Login {...{ kcContext, ...defaultKcProps }} />

      /**
       * 회원가입
       */
      case 'register.ftl':
        return <Register {...{ kcContext, ...defaultKcProps }} />

      /**
       * 로그인시 패스워드 변경
       */
      // @ts-ignore
      case 'login-update-password.ftl':
        return <ResetPassword {...{ kcContext, ...defaultKcProps }} />

      // case 'error.ftl':
      //   return <Error500 guide={t(`error.${kcContext?.message?.summary || 'internalservererror'}`)} link={kcContext?.client?.baseUrl}/>;

      // case 'info.ftl':
      //   return <Info {...{ kcContext, ...defaultKcProps }} />;

      /**
       * 유저 정보 변경 페이지
       */
      case 'login-update-profile.ftl':
        return <Account {...{ kcContext, ...defaultKcProps }} />

      default:
        return <Error404 />
    }
  }
)

export default KeycloakApp
