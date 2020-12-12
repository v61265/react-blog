import styled from "styled-components";
import { ReactComponent as LoadingSVG } from "../../images/loading.svg";

const LoadingWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  position: fixed;
  width: 500px;
  top: 72px;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <LoadingSVG />
    </LoadingWrapper>
  );
}
