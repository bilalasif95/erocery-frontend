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
  <img src={contentState.getEntity(entityKey).getData().href} alt={contentState.getEntity(entityKey).getData().alt} />
);

export default LinkEntity;
