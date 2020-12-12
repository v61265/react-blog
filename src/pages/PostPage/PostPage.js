import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";

import { getPost } from "../../WebAPI";

const InfoContainer = styled.div`
  font-size: 16px;
  color: #373f27;
`;

const PostAuthor = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

const PostDate = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

const PostTitle = styled.div`
  text-decoration: none;
  font-size: 32px;
  color: #373f27;
  font-weight: bold;
`;

const Body = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 2rem;
  white-space: pre-wrap;
`;

function Post({ post, author }) {
  return (
    <>
      <InfoContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostAuthor>作者：{author}</PostAuthor>
        <PostDate>
          日期：
          {new Date(post.createdAt).toLocaleString()}
        </PostDate>
      </InfoContainer>
      <Body>{post.body}</Body>
    </>
  );
}

Post.propType = {
  post: PropTypes.object,
};

export default function PostPage() {
  const [post, setPost] = useState([]);
  const [author, setAuthor] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPost(id).then((post) => {
      setPost(post[0]);
      setIsLoading(false);
      setAuthor(post[0].user.nickname);
    });

    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Post key={post.id} post={post} author={author} />
    </>
  );
}

Post.propType = {
  post: PropTypes.object,
  author: PropTypes.string,
};
