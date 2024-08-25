import React from "react";
import DataTable from "./DashboardComponent";
// const developmentUrl = 'https://buy-stuff-six.vercel.app'
const developmentUrl = "http://localhost:3000";
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    const response = await fetch(`${developmentUrl}/api/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const { user } = await response.json();
    console.log(user);
    return {
      props: { user },
    };
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default function Admin() {
  return (
    <>
      <section className="">
        <DataTable/>
      </section>
    </>
  );
}
