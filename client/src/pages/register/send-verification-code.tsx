import React, { useEffect } from "react";
import { Link } from "gatsby";
import DefaultLayout from "../../components/layouts/default-layout";
import SEO from "../../components/seo";
import { PageContext } from "../../types/types";
import { useUserHook } from '../../hooks';

const Content: React.FC<{from: string}> = ({ from }) => { 
  const { getUserFn, user } = useUserHook();

  useEffect(() => {
    getUserFn();
  }, []);
  return (
    <>
      {user && 
        <>
          <p>
              Please check your email for the verification code  
          </p>
          <p>
            Once you have recieved it, please use the verification code to <Link to={`/register/verify-email?from=${encodeURIComponent(from)}`}>verify your email</Link>.
          </p>
        </>
      }
    </>
  );
}

// markup
const SendVerificationCode: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const from = params.get('from');

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Verification code sent" />
        <h1>Verification code sent</h1>
        <Content from={from}/>
      </>
    </DefaultLayout>
  );
};

export default SendVerificationCode;
