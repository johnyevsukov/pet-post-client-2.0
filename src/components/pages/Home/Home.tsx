/**
 * Home page.
 * Provides the user options to sign up,
 * log in, or demo PetPost (via a test account).
 * Also provides links to john.engineering
 * and the project source code.
 */

import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { PageWrapper } from "../../atoms/PageWrapper/PageWrapper";
import { PageContentColumn } from "../../atoms/PageContentColumn/PageContentColumn";
import { TitleTypedSubtext } from "../../organisms/TitleTypedSubtext/TitleTypedSubtext";
import { LinkButton } from "../../molecules/Button/Button";
import { Button } from "../../molecules/Button/Button";
import { VStack } from "../../atoms/VStack/VStack";
import { Loader } from "../../atoms/Loader/Loader";
import { FlexBox } from "../../atoms/FlexBox/FlexBox";
import { Icon } from "../../atoms/Icon/Icon";

import * as styles from "./styles";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    axios
      .post("https://pet-post.herokuapp.com/api/auth/login", {
        username: "Demo",
        password: "123",
      })
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        navigate(`/profile/${res.data.user_id}`);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
        console.warn(err);
      });
  };

  return (
    <PageWrapper>
      <styles.WebsiteBanner>
        <styles.TextLink
          as="a"
          href="https://www.johnyevsukov.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Site
        </styles.TextLink>
      </styles.WebsiteBanner>
      <PageContentColumn $mobileAlignItems="flex-end">
        <TitleTypedSubtext
          title="PetPost"
          iconName="hamster"
          typedSubtext="Log in or sign up to connect with your pals!"
          minMobileHeight={110}
        />
      </PageContentColumn>
      <PageContentColumn $mobileAlignItems="flex-start" $background="offWhite">
        <VStack $spacing={20} $width="auto">
          <FlexBox>
            {isLoading ? (
              <Loader $width={25} />
            ) : (
              <Button $variant="textBlue" onClick={handleDemoLogin}>
                Demo
              </Button>
            )}
            {error && <Icon name="warning" width={26} />}
          </FlexBox>
          <LinkButton $variant="blue" to="signup">
            Sign up
          </LinkButton>
          <LinkButton $variant="textBlue" to="login">
            Log in
          </LinkButton>
        </VStack>
      </PageContentColumn>
      <styles.GithubLink
        href="https://github.com/johnyevsukov/pet-post-client"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="github" width={55} />
      </styles.GithubLink>
      <styles.FigmaLink
        href="https://www.figma.com/file/S1QPEz3rVQNjMLCspnZqYz/PetPost?type=design&node-id=0-1&mode=design&t=yD9XkKgQq5gVULbn-0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <styles.FigmaIconWrapper>
          <Icon name="figma" width={43} />
        </styles.FigmaIconWrapper>
      </styles.FigmaLink>
    </PageWrapper>
  );
};
