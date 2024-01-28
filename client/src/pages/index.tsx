import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Link,
  Stack,
  Box,
  Heading,
  Flex,
  Button,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon, SearchIcon, DeleteIcon } from '@chakra-ui/icons'
import { withUrqlClient } from 'next-urql';
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useDeletePostMutation, usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import UpdootSection from '../components/UpdootSection';
import NextLink from 'next/link';
import { useState } from 'react';

const Index = () => {

  const [variables, setvariables] = useState({ limit: 15, cursor: null as null | string });
  const [{ data, fetching }] = usePostsQuery({ variables });
  const [, deletePost] = useDeletePostMutation()

  if (!fetching && !data) {
    return (<Layout> data query failed </Layout>)
  }



  return (
    <Layout>
      <br />

      {!data ? <div> loading...</div> :

        <Stack spacing={8}>
          {data.posts.posts.map(post => !post ? null : (
            <Flex p={5} shadow='md' borderWidth='1px' key={post.id}>
              <UpdootSection post={post} />
              <Box flex={1}>
                <Flex align="center">
                  <Box flex={1}>
                    <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                      <Link>
                        <Heading fontSize='xl'>{post.title}</Heading>
                      </Link>
                    </NextLink>
                  </Box>
                  <IconButton
                    icon={<DeleteIcon />}
                    mt={4}
                    aria-label='Search database'
                    color="red"
                    onClick={() => {
                      deletePost({ id: post.id })
                    }}
                  >
                    Delete Post
                  </IconButton>
                </Flex>
                <Text>posted by {post.creator.username}</Text>
                <Text mt={4} flex={1}>{post.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>}

      {data && data.posts.hasMore ?
        <Flex mt={8}>
          <Button onClick={() => { setvariables({ limit: variables.limit, cursor: data.posts.posts[data.posts.posts.length - 1].createdAt }) }} isLoading={fetching} m="auto">load more</Button>
        </Flex> : null}


    </Layout>

  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
