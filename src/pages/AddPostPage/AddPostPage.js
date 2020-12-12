import { setAuthToken } from "../../utils";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { addPost } from "../../WebAPI";
import { AuthContext } from "../../contexts";
import Loading from "../../components/Loading";
import { LoadingContext } from "../../contexts";

const Input = styled.input`
  color: #373f27;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #cda34f;
  border-radius: 3px;
  width: 95%;
  margin-top: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  color: #373f27;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #cda34f;
  border-radius: 3px;
  width: 95%;
  height: 20rem;
  margin-top: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  background: #e9e7da;
  color: #636b46;
  border: 1px solid #636b46;
  border-radius: 3px;
  margin-top: 10px;

  &:hover {
    color: #373f27;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin-top: 0px;
`;

const ErrMessage = styled.div`
  color: red;
`;

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errMessage, setErrMessage] = useState();
  const history = useHistory();

  // 身分驗證
  if (!user) {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrMessage("");
    addPost(title, content).then((response) => {
      if (response.ok === 0) {
        setIsLoading(false);
        return setErrMessage(response.message);
      }
      alert("發布成功");
      setIsLoading(false);
      history.push("/");
    });
  };

  // 防止這頁還沒跑完其他頁也不能跑
  useEffect(() => {
    return setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Title>發布文章</Title>
      <form onSubmit={handleSubmit}>
        <div>
          標題：
          <br />
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          內文：
          <br />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
        <Button>送出</Button>
      </form>
    </>
  );
}
