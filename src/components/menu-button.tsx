import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type Actions = {
    title: string    
    action: () => void; 
    disabled: boolean       
}

type Props = {
    actions: Actions[]
    children: React.ReactNode
}

export const MenuButton = ({ actions, children }:Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <div 
          onClick={handleClick}
        >
          {children}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
            {actions.map(({action, title, disabled ,...rest}) => (
                <MenuItem 
                  disabled={disabled}
                  key={title}
                  onClick={ () => {
                    handleClose();
                    action();
                  }} 
                  {...rest}
                >
                    {title}
                </MenuItem>                    
            ))}
        </Menu>
      </div>
    );
}
