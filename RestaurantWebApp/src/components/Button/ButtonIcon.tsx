import { cilList, cilPen, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

interface IButtonIconProps {
  type?: string;
  iconClass?: string;
  buttonClass?: string;
  handleClick?: React.MouseEventHandler;
}

const ButtonIcon = (props: IButtonIconProps) => {
  const getButton = (type: string = 'add') => {
    let classBtn = '';
    let icon;
    switch (type) {
      case 'add':
        classBtn = 'btn-outline-info';
        icon = cilPlus;
        break;
      case 'edit':
        classBtn = 'btn-outline-info';
        icon = cilPen;
        break;
      case 'delete':
        classBtn = 'btn-outline-danger';
        icon = cilTrash;
        break;
      default:
        classBtn = 'btn-outline-primary';
        icon = cilList;
        break;
    }
    return (
      <button
        type="button"
        className={`btn btn-sm ${classBtn} ${props?.buttonClass}`}
        onClick={props?.handleClick}
      >
        <span>
          <CIcon icon={icon} className={`${props?.iconClass}`} size="sm" />
        </span>
      </button>
    );
  };

  return getButton(props?.type);
};

export default ButtonIcon;
