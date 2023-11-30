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
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { withUrqlClient } from 'next-urql';
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import UpdootSection from '../components/UpdootSection';
import NextLink from 'next/link';
import { useState } from 'react';

const Index = () => {

  const [variables, setvariables] = useState({ limit: 15, cursor: null as null | string });
  const [{ data, fetching }] = usePostsQuery({ variables });

  console.log()

  if (!fetching && !data) {
    return (<Layout> data query failed </Layout>)
  }



  return (
    <Layout>
      <Flex align="center">
        <Heading>
          Reddit
        </Heading>
        <NextLink href="create-post">
          <Link ml="auto">
            Create Post
          </Link>
        </NextLink>
      </Flex>
      <br />

      {!data ? <div> loading...</div> :

        <Stack spacing={8}>
          {data.posts.posts.map(post => (
            <Flex p={5} shadow='md' borderWidth='1px' key={post.id}>
              <UpdootSection post={post} />
              <Box>
                <Heading fontSize='xl'>{post.title}</Heading>
                <Text>posted by {post.creator.username}</Text>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
          {/* <div key={post.id}> {post.title} - {post.text}</div> */}
        </Stack>}

      {data && data.posts.hasMore ?
        <Flex mt={8}>
          <Button onClick={() => { setvariables({ limit: variables.limit, cursor: data.posts.posts[data.posts.posts.length - 1].createdAt }) }} isLoading={fetching} m="auto">load more</Button>
        </Flex> : null}


    </Layout>

  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
