import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import React from "react";
export const LoadingIcon = () => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;
  return <ClipLoader color={"blue"} loading={true} css={override} size={150} />;
};
