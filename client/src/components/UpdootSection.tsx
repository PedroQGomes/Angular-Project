import {
    Flex,
} from '@chakra-ui/react'

import { IconButton } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { PostSnippetFragment, VoteMutationVariables, useVoteMutation } from "../generated/graphql"
import React, { useState } from 'react'

interface UpdootSectionProps {
    post: PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [{ fetching }, vote] = useVoteMutation();
    return (
        <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
            <IconButton
                onClick={async () => {
                    await vote({
                        postId: post.id,
                        value: 1,
                    })
                }}
                isLoading={fetching}
                icon={<ChevronUpIcon />}
            />
            {post.points}
            <IconButton
                onClick={async () => {
                    await vote({
                        postId: post.id,
                        value: -1,
                    })
                }}
                isLoading={fetching}
                icon={<ChevronDownIcon />} />
        </Flex>
    )
}

export default UpdootSection
