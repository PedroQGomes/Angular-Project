import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useRouter } from 'next/router';
import { usePostQuery, usePostsQuery } from '../../generated/graphql';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';


const Post = ({ }) => {

    const router = useRouter()

    const id = typeof router.query.id == "string" ? parseInt(router.query.id) : -1;

    const [{ data, fetching }] = usePostQuery({
        pause: id === -1,
        variables: {
            id: id
        }
    })

    if (fetching) {
        return < Layout > <div>loading...</div> </Layout>
    }


    if (!data?.post) {
        return <Layout> <div>Post not found</div> </Layout>
    }

    return (
        <Layout>
            <Heading>
                {data.post.title}
            </Heading>
            <div>
                {data.post.text}
            </div>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)