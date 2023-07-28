import React, { useRef } from 'react';
import styled from 'styled-components';
import { HStack, IconButton } from '@chakra-ui/react';
import { WithContext as ReactTags } from 'react-tag-input';
import { BsFillStickyFill } from 'react-icons/bs';
import { IoIosSave } from 'react-icons/io';

interface ITag {
  id: string;
  text: string;
}

interface Props {
  isTagReadMode: boolean;
  setTagReadMode: Function;
}

const NodeFooterContainer = styled.div`
  margin-top: 10px;

  .tag-container {
    width: 90%;
    position: relative;

    .save-button {
      opacity: 0;
      transform: scale(0);
      font-size: 14px;
      position: absolute;
      right: 2px;
      top: 5px;
      color: #d8d8d8;
      min-width: 1rem;
      height: 1rem;
      transition-duration: 10ms;
      :hover {
        color: #0042d9;
        background-color: transparent;
      }
    }

    &.edit {
      border: 0.5px solid #d8d8d8;
      border-radius: 5px;
      padding: 5px 18px 5px 4px;
      background: white;
      .save-button {
        opacity: 1;
        transform: scale(1);
      }
    }

    // tags styles
    .ReactTags__tags {
      flex: 1;
      overflow: hidden;

      .ReactTags__selected {
        display: flex;
        flex-wrap: wrap;
        font-size: 10px;
        gap: 5px;

        .ReactTags__tag {
          font-weight: 530;
          color: #1f4de3;
          background-color: #f1f5fe;
          padding: 2px 8px;
          border-radius: 10px;
          :hover {
            cursor: pointer !important;
          }
          .ReactTags__remove {
            margin-left: 5px;
            font-weight: 600;
            color: #7787ab;
            :focus {
              outline: 0;
            }
          }
        }
      }
    }

    // tag input styles
    .ReactTags__tagInput {
      // display: none;
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: 3px;
      min-width: 2.5rem;
      input {
        flex: 1;
        font-size: 10px;
        // border: 1px solid #e5e5e8;
        // border-radius: 5px;
        :focus {
          outline: 0;
        }
      }
    }
  }

  // note-button styles
  .note-button {
    font-size: 14px;
    color: #d8d8d8;
    min-width: 1rem;
    height: 1rem;
    :hover {
      background-color: transparent;
      color: #0042d9;
    }
    :active {
      background-color: transparent;
      color: #0042d9;
    }
  }
`;

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const MindmapNodeFooter = ({ isTagReadMode, setTagReadMode }: Props) => {
  const [tags, setTags] = React.useState<ITag[]>([
    { id: '1', text: 'Introduction' },
    { id: '2', text: 'Todo' },
  ]);

  const handleSaveTags = () => {
    setTagReadMode(true);
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags, tag]);
  };

  //   const handleDrag = (tag: any, currPos: any, newPos: any) => {
  //     const newTags = tags.slice();

  //     newTags.splice(currPos, 1);
  //     newTags.splice(newPos, 0, tag);

  //     // re-render
  //     setTags(newTags);
  //   };

  const handleTagClick = () => {
    setTagReadMode(false);
  };

  return (
    <NodeFooterContainer>
      <HStack justify={'space-between'} align={'flex-start'}>
        <div className={isTagReadMode ? 'tag-container' : 'tag-container edit'}>
          <IconButton
            aria-label="save tags"
            icon={<IoIosSave />}
            variant="ghost"
            className="save-button"
            onClick={handleSaveTags}
          />
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            // handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="inline"
            readOnly={isTagReadMode}
            allowDragDrop={false}
            placeholder="Add tag"
          />
        </div>
        <div>
          <IconButton
            aria-label="choose color"
            icon={<BsFillStickyFill />}
            variant="ghost"
            className="note-button"
          />
        </div>
      </HStack>
    </NodeFooterContainer>
  );
};

export default MindmapNodeFooter;
