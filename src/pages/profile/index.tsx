import UserNotFound from '@/components/commonItems/UserNotFound';
import { getServerAuthSession } from '@/server/auth';
import Layout from '@/components/layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import React, { ReactElement } from 'react'

const Profile = () => {
    const { data } = useSession();
    console.log(data);
    if (!data) return <UserNotFound />
    return (
        <div>
            Profile
        </div>
    )
}


Profile.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export async function getServerSideProps({
    req,
    res,
}: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) {
    const session = await getServerAuthSession({
        req,
        res,
    });
    return {
        props: { user: session?.user ?? null }, // Will be passed to the page component as props
    };
}

export default Profile
