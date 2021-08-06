import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

export default function ScrollTop(props){

    const trigger = useScrollTrigger({
      disableHysteresis:true,
      threshold:100
    })
    const handleClick = (event) => {
      
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#top',
      );
        
      if (anchor) {
        anchor.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {props.children}
        </Box>
      </Zoom>
    )
  

  }
  