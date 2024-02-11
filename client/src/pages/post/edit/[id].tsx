import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { Formik, Form, Field, } from 'formik'
import { useRouter } from 'next/router';
import { usePostQuery, usePostsQuery, useUpdatePostMutation } from '../../../generated/graphql';
import Layout from '../../../components/Layout';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import InputFiled from '../../../components/InputFiled'
import { Button, } from "@chakra-ui/react"

const EditPost = ({ }) => {

    const router = useRouter()

    const id = typeof router.query.id == "string" ? parseInt(router.query.id) : -1;


    const [, updatePost] = useUpdatePostMutation()

    const [{ data, error, fetching }] = usePostQuery({
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
        <Layout varient="small">
            <Formik
                initialValues={{ title: data.post.title, text: data.post.text }}
                onSubmit={async (values, { setErrors }) => {

                    const post = await updatePost({ id: id, title: values.title, text: values.text });

                    if (post) {
                        router.back();
                    }

                }}>

                {(props) => (
                    <Form>
                        <InputFiled name="title" placeholder="title" label="Title" />

                        <InputFiled textarea name="text" placeholder="text..." label="Body" />
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Edit Post
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient)(EditPost)