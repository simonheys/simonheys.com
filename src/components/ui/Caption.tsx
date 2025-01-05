import { FC } from 'react';

export interface CaptionProps {
  caption?: string;
}

const Caption: FC<CaptionProps> = ({ caption }) => {
  if (!caption) {
    return null;
  }
  return (
    <div className="row">
      <div className="col h6 mb-4 font-bold text-gray-600 dark:text-inherit">
        {caption}
      </div>
    </div>
  );
};

export default Caption;
