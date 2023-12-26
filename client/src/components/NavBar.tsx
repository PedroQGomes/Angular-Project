import { Box, Flex, Link } from '@chakra-ui/layout'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { Button } from "@chakra-ui/react"
import { isServer } from '../utils/isServer'

const NavBar = () => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery();

    let body = null;
    if (!data?.me) { // nao esta logado ou fetching
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>

                <NextLink href="/register">
                    <Link>Register</Link>
                </NextLink>
            </>
        )
    } else { // esta logado
        body = (
            <Flex>
                <Box mr={2}>{data.me.username} </Box>
                <Button onClick={
                    () => {
                        logout();
                    }
                }
                    isLoading={logoutFetching}
                    variant="link">logout</Button>
            </Flex>
        )

    }

    return (
        <Flex position="sticky" top={0} zIndex={1} bg="tan" p={4}>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
}

export default NavBar
