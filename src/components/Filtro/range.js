import PropTypes from 'prop-types';
import { Box, Slider, SliderThumb, Stack, Typography  } from "@material-ui/core";
import React from "react"
import { styled } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';



const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {
      height: 3,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,
      height: 3,
    },
  }));


  const options = {
    'unidade': {
            min: 1,
            max: 4,
            default:1,
            steps: 1,
            marks: [
                    {
                        value:1,
                        label: '1+'
                    },
                    {
                        value:2,
                        label: '2+'
                    },
                    {
                        value:3,
                        label: '3+'
                    },
                    {
                        value:4,
                        label: '4+'
                    },
                ]
            },
    'locacao': {
        min:0,
        max:15000,
        default:[200, 15000],
        steps: 200,
        marks: [
            {
                value:500,
                label: '500,00'
            },
            {
                value:1000,
                label: '1.000,00'
            },
            {
                value:1500,
                label: '1.500,00'
            },
            {
                value:2000,
                label: '2.000,00'
            },
            {
                value:2500,
                label: '2.500,00'
            },
            {
                value:3000,
                label: '3.000,00'
            },
            {
                value:5000,
                label: '5.000,00'
            },
        ]
    },
    'venda': {
        min:1000,
        max:15000000,
        default: [10000,14000000],
        steps: 2000,
        marks: [
            {
                value:100000,
                label: '100mil'
            },
            {
                value:200000,
                label: '200mil'
            },
            {
                value:300000,
                label: '300mil'
            },
            {
                value:500000,
                label: '500mil'
            },
            {
                value:1000000,
                label: '1mi'
            },
            {
                value:2000000,
                label: '2mi'
            },
            {
                value:5000000,
                label: '5mi'
            },
            {
                value:10000000,
                label: '10mi'
            },
        ]
    },
  }



function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }
  
  AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
  };

export default function Range(props){
    const [value, setValue] = React.useState([options[props.tipo].default])
    const handleChange = (event, newValue) => {
        console.log(event);
        console.log(newValue);
        setValue(newValue)
    }

    return (
        <Box>
            <Typography gutterBottom  >{props.label} : {value}</Typography>
            <Stack direction="row" alignItems="center" >

            <AttachMoneyIcon fontSize="small" />
            <Slider
                components={{ Thumb: AirbnbThumbComponent }}
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                defaultValue={value}
                onChange={handleChange}
                getAriaLabel={() => props.label}
                value={value}
                step={options[props.tipo].steps}
                valueLabelDisplay="auto"
                marks={options[props.tipo].marks}
                min={options[props.tipo].min}
                max={options[props.tipo].max}
            />

            <AttachMoneyIcon fontSize="large" />
            </Stack>

            
        </Box>
    )
}