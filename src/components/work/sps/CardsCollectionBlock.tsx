import { LayoutGroup } from 'framer-motion';
import { FC } from 'react';

import { Sps2x4, Sps3x4, Sps4, Sps4x2, Sps4x4 } from '../../ui/icons';

import CardItem, { CardItemPostType } from './CardItem';

export const mapLayoutPropToLayout = {
  '3over4': {
    title: <Sps3x4 />,
    layout: [
      [1, 1, 1],
      [1, 1, 2, 3],
    ],
  },
  '2over4': {
    title: <Sps2x4 />,
    layout: [
      [1, 1],
      [1, 1, 3, 3],
    ],
  },
  '4over4': {
    title: <Sps4x4 />,
    layout: [
      [1, 1, 1, 1],
      [1, 1, 3, 3],
    ],
  },
  4: {
    title: <Sps4 />,
    layout: [[1, 1, 3, 3]],
  },
  '4of2': {
    title: <Sps4x2 />,
    layout: [[2, 2, 2, 2]],
  },
};

export interface CardsCollectionBlockProps {
  posts: CardItemPostType[];
  layout: keyof typeof mapLayoutPropToLayout;
  animated: boolean;
}

const CardsCollectionBlock: FC<CardsCollectionBlockProps> = ({
  posts,
  layout: layoutProp = '3over4',
  animated = false,
}) => {
  const layout = mapLayoutPropToLayout[layoutProp].layout;
  let currentPostIndex = 0;
  return (
    <LayoutGroup>
      <div className="containerAlias">
        {layout.map((row: number[], rowIndex: number) => {
          const cardsInRow = row.reduce((a, b) => a + b, 0);
          return (
            <div key={`row-${rowIndex}`} className="flex flex-wrap">
              {row.map((cardsInCell, colIndex) => {
                const postsRemaining = posts.length - currentPostIndex;
                if (postsRemaining > 0) {
                  let size = 'base';
                  if (cardsInCell > 1 && postsRemaining > 1) {
                    size = 'sm';
                  } else {
                    if (cardsInRow <= 3) {
                      size = 'lg';
                    }
                  }
                  const cardPosts: CardItemPostType[] = [];
                  for (let i = 0; i < cardsInCell; i++) {
                    if (currentPostIndex < posts.length) {
                      const post = posts[currentPostIndex];
                      cardPosts.push(post);
                      currentPostIndex++;
                    }
                  }
                  return (
                    <div
                      key={`col-${colIndex}`}
                      className="flex grow basis-0 flex-col space-y-1 px-1 sm:space-y-2 sm:px-2"
                    >
                      {cardPosts.map((post) => (
                        <CardItem
                          key={`card-${post.id}`}
                          post={post}
                          size={size}
                          animated={animated}
                        />
                      ))}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default CardsCollectionBlock;
