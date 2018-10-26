import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls =[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(x=><BuildControl added={() => props.ingredientAdded(x.type)} key={x.label} label={x.label}></BuildControl>)}
        </div>
    );
};

export default BuildControls;