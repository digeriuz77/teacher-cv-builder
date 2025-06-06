import styled from '@emotion/styled';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';

const RoundedImage = styled.img`
  border-radius: 50%;
  border: 0.5px solid ${(props) => props.theme.fontColor};
`;

export const ProfileImage = ({
  src,
  height = '108px',
  width = '108px',
  imageWrapperClassname = '',
}: {
  src: string;
  height?: string;
  width?: string;
  imageWrapperClassname?: string;
}) => {
  const placeholder = (
    <Tooltip title="Paste your LinkedIn picture URL in Basic > Contacts > Image URL">
      <div
        className="flex items-center justify-center bg-gray-200 text-gray-500"
        style={{ borderRadius: '50%', border: '0.5px solid', height, width }}
      >
        <AiOutlineInfoCircle />
      </div>
    </Tooltip>
  );

  return (
    <div className={imageWrapperClassname}>
      {src ? (
        <RoundedImage alt="Profile image" src={src} height={height} width={width} />
      ) : (
        placeholder
      )}
    </div>
  );
};
