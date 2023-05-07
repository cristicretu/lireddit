import { Heading } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

export const Post: React.FC = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return <Layout>loading ... </Layout>;
  }

  if (error) {
    return <Layout>{error?.message}</Layout>;
  }

  if (!data?.post) {
    return <Layout>post not found</Layout>;
  }
  return (
    <>
      <Layout>
        <Heading>{data.post.title}</Heading>
        {data.post.text}
        <EditDeletePostButtons id={intId} creatorId={data.post.creator.id} />
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Post);
