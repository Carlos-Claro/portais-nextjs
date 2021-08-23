import PropTypes from 'prop-types';
import { Box, Slider, SliderThumb, Stack, Typography  } from "@material-ui/core";
import React from "react"
import { styled } from '@material-ui/core/styles';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BedIcon from '@material-ui/icons/Bed';
import BathtubIcon from '@material-ui/icons/Bathtub';
import OpenInFullIcon from '@material-ui/icons/OpenInFull';
import { handleFiltro } from '../../store/Filtro/Filtro.actions';
import { useDispatch, useSelector } from 'react-redux';

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
                        label: '1+',
                        valor:1
                    },
                    {
                        value:2,
                        label: '2+',
                        valor:2
                    },
                    {
                        value:3,
                        label: '3+',
                        valor:3
                    },
                    {
                        value:4,
                        label: '4+',
                        valor:4
                    },
                ]
            },
    'locacao': {
        min:0,
        max:8,
        default:[0, 8],
        steps: 1,
        marks: [
            {
                value:0,
                label: '',
                valor:0
            },
            {
                value:1,
                label: '500',
                valor:500
            },
            {
                value:2,
                label: '1mil',
                valor:1000
            },
            {
                value:3,
                label: '1.500',
                valor:1500

            },
            {
                value:4,
                label: '2mil',
                valor:2000
            },
            {
                value:5,
                label: '2.500',
                valor:2500
            },
            {
                value:6,
                label: '3mil',
                valor:3000
            },
            {
                value:7,
                label: '5mil',
                valor:5000
            },
            {
                value:8,
                label: '50mil',
                valor:50000
            },
        ]
    },
    'venda': {
        min:0,
        max:8,
        default: [0,8],
        steps: 1,
        marks: [
            {
                value:0,
                label: '',
                valor:0
            },
            {
                value:1,
                label: '100mil',
                valor:100000
            },
            {
                value:2,
                label: '200mil',
                valor:200000
            },
            {
                value:3,
                label: '500mil',
                valor:500000
            },
            {
                value:4,
                label: '1mi',
                valor:1000000
            },
            {
                value:5,
                label: '5mi',
                valor:5000000
            },
            {
                value:6,
                label: '10mi',
                valor:10000000
            },
            {
                value:8,
                label: '50mi',
                valor:50000000
            },
        ]
    },
    'area': {
        min:0,
        max:8,
        default: [0,8],
        steps: 1,
        marks: [
            {
                value:0,
                label: '',
                valor:0
            },
            {
                value:1,
                label: '5m',
                valor:5
            },
            {
                value:2,
                label: '100m',
                valor:100
            },
            {
                value:3,
                label: '200m',
                valor:200
            },
            {
                value:4,
                label: '500m',
                valor:500
            },
            {
                value:5,
                label: '1000m',
                valor:1000
            },
            {
                value:6,
                label: '10milm',
                valor:10000
            },
            {
                value:8,
                label: '50mi',
                valor:50000
            },
        ]
    }
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

  
  const getValueDefault = (item, tipo) => {
    if (Array.isArray(item)){
        const retorno = item.map((i) => {
            const opcao = options[tipo].marks.find((a) => a.valor == i)
            return opcao.value
        })
        return retorno
    } else {
        const valor = options[tipo].marks.find((i) => i.valor == item)
        return valor.value
    }
  }
  const getValorDefault = (item, tipo) => {
      
    if (Array.isArray(item)){
        const retorno = item.map((i) => {
            const opcao = options[tipo].marks.find((a) => a.value == i)
            return opcao.valor
        })
        return retorno
    } else {
        const valor = options[tipo].marks.find((i) => i.value == item)
        return valor.valor
    }
  }
  const getLabelDefault = (item, tipo) => {
    
    if (Array.isArray(item)){
        const retorno = item.map((i) => {
            const opcao = options[tipo].marks.find((a) => a.value == i)
            return opcao.label
        })
        return retorno.join(" até ")
    } else {
        const valor = options[tipo].marks.find((i) => i.value == item)
        return valor.label
    }
    }
  
  export default function Range(props){
      const dispatch = useDispatch()
      const parametro = useSelector(state => state.parametros[props.name])
      const value = parametro ? getValueDefault(parametro, props.tipo) : options[props.tipo].default;
      const handleChange = (evento, newValue) => {
          dispatch(handleFiltro(props.name, getValorDefault(newValue,props.tipo)))
        }

    return (
        <Box>
            <Stack spacing={2}>

                <Typography gutterBottom  >{props.label} : {getLabelDefault(value,props.tipo)}</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>

                    {props.iconeInicio}
                    <AirbnbSlider
                        components={{ Thumb: AirbnbThumbComponent }}
                        
                        defaultValue={value}
                        step={options[props.tipo].steps}
                        valueLabelDisplay="auto"
                        marks={options[props.tipo].marks}
                        min={options[props.tipo].min}
                        max={options[props.tipo].max}
                        onChangeCommitted={handleChange}
                        valueLabelDisplay="off"
                        />
                    {props.iconeFim}
                
                </Stack>
            </Stack>

            
        </Box>
    )
}