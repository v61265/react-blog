import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useParams, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { LoadingContext } from "../../contexts";

import { getPosts, getPostsFromPage } from "../../WebAPI";

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #636b46;
  color: #373f27;
`;

const PostDate = styled.div``;

const PostTitle = styled(Link)`
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  font-size: 16px;
  color: #373f27;
  font-weight: bold;
`;

const Pagination = styled(Link)`
  padding: 10px;
  color: #373f27;
  border: 1px solid #373f27;
  background: #e9e7da;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background: #373f27;
    color: #e9e7da;
  }

  & + & {
    margin-left: 5px;
  }

  ${(props) =>
    props.$active &&
    `
  background: #373f27;
  color: #e9e7da;`}
`;

const PaginationWrapper = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

// 分頁邏輯：先抓全部的得到總數 -> render 第一頁和按鈕

export default function HomePage() {
  const location = useLocation().pathname;
  const limit = 5;
  let { page } = useParams();
  if (!page) page = 1;
  const [posts, setPosts] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let pagesNum = useRef();

  useEffect(() => {
    setIsLoading(true);
    getPosts().then((posts) => {
      const postsNum = posts.length;
      pagesNum.current = Math.ceil(postsNum / limit);
      getPostsFromPage(page, limit).then((posts) => {
        setIsLoading(false);
        setPosts(posts);
      });
    });

    return () => {
      setIsLoading(false);
    };
  }, [page]);

  return (
    <>
      {isLoading && <Loading />}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <PaginationWrapper>
        {new Array(pagesNum.current).fill("").map((item, index) => {
          return (
            <Pagination
              key={index}
              to={`/posts/${index + 1}`}
              $active={
                location === `/posts/${index + 1}` ||
                (location === "/" && index === 0)
              }
            >
              {index + 1}
            </Pagination>
          );
        })}
      </PaginationWrapper>
    </>
  );
}
