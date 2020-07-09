import { ContentState } from "draft-js";
import React from "react";

interface LinkEntityProps {
  children: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
}

export const LinkEntity: React.FC<LinkEntityProps> = ({
    children,
    contentState,
    entityKey,
}) => (
  <a style={{color: "#3f51b5"}} href={contentState.getEntity(entityKey).getData().url} target="_blank"><u>{children}</u></a>
);

export default LinkEntity;
