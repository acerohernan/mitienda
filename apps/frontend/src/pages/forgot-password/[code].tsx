import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { API } from "../../api";
import RestorePasswordView from "../../views/auth/restore";

const RestorePassword = ({
  isAValidCode,
  code,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <RestorePasswordView isAValidCode={isAValidCode} code={code} />;
};

export const getServerSideProps: GetServerSideProps<{
  isAValidCode: boolean;
  code: string;
}> = async (context) => {
  const { code } = context.params as any;

  try {
    if (!code) throw new Error();

    await API.tenant.verifyRestorePasswordCode(code);

    return {
      props: {
        isAValidCode: true,
        code,
      },
    };
  } catch (err) {
    return {
      props: {
        isAValidCode: false,
        code,
      },
    };
  }
};

export default RestorePassword;
