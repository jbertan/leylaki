import Head from "next/head";
import { useState, useRef, FormEvent, useEffect } from "react";
import { SignInResponse, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { hashPassword } from "@/components/util/hash";
enum loadingStatusEnum {
  loading = "loading",
  authenticated = "authenticated",
  unauthanticated = "unauthenticated",
}
const Admin = () => {
  const [loadingStatus, setLoadingStatus] = useState<loadingStatusEnum>(
    loadingStatusEnum.unauthanticated
  );
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userName = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(`Kullanıcı adı: ${userName} ve şifre ${password}`);
    const hashedPass = hashPassword(password!);
    console.log(hashedPass);

    signIn("credentials", {
      redirect: false,
      userName,
      password,
    }).then(() => setLoading(false));

    if (usernameRef.current && passwordRef.current) {
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/admin/upload");
    }
    {
      if (status === "authenticated") {
        console.log("we re in");
        console.log(session.user?.email);
        setLoadingStatus(loadingStatusEnum.authenticated);
      }
      if (status === "loading") {
        setLoadingStatus(loadingStatusEnum.loading);
        console.log("loading");
        //console.log(session.user?.email);
      }
      if (status === "unauthenticated") {
        setLoadingStatus(loadingStatusEnum.unauthanticated);
        console.log("unauthanticated");
        //console.log(session.user?.email);
      }
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Admin Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`admin ${loading && "loading-bg"}`}>
        <form className="admin__container">
          <div className="admin__container__button__wrap">
            <button
              className="admin__container__button"
              onClick={submitHandler}
              type="submit"
            >
              {loading
                ? "Wait"
                : loadingStatus === "unauthenticated"
                ? "Login"
                : loadingStatus === "loading"
                ? "loading"
                : "Ok!"}
            </button>
          </div>
          <div className="admin__container__group">
            <input
              type="text"
              className="admin__container__input"
              id="username"
              ref={usernameRef}
              placeholder="username"
              disabled={loading}
            />
            <label htmlFor="username" className="admin__container__label">
              username
            </label>
          </div>
          <div className="admin__container__group">
            <input
              type="password"
              className="admin__container__input"
              id="password"
              ref={passwordRef}
              placeholder="password"
              disabled={loading}
            />
            <label htmlFor="password" className="admin__container__label">
              password
            </label>
          </div>
        </form>
      </section>
    </>
  );
};
export default Admin;
