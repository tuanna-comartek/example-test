import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip } from "@mui/material";
import { SubCampaignInterface } from "../App";

interface Props{
    id: number
    title: string,
    isActive: boolean, 
    quantity: number,
    currentCampaign: SubCampaignInterface, 
    handleSelect: () => void , 
}


const SubCampaign  = ({title, isActive, quantity,handleSelect , currentCampaign, id} : Props) => {
    return (
        <>
            <div className="sub-campaign-content" style={{ borderRadius: 6, marginRight: 10, border: `${currentCampaign.id === id ? '2px solid #1976d2' : '1px solid #cfcfcf'}`}} onClick={handleSelect}>
                <div style={{ paddingTop: 10, width: 230, textAlign:'center'}}>
                {title && 
                    <Tooltip title={title}>
                        <span style={{margin: 10, fontSize: '1.25rem', color: 'red'}}>{title}</span>
                    </Tooltip>
                }
                    <CheckCircleIcon style={{color: `${isActive ? 'green' : 'gray'}`, fontSize: 15}} />
                </div>
                <Tooltip title='Số lượng'>
                    <h5 style={{textAlign:'center', fontSize: '1.5rem', marginTop: 0, }}>{quantity}</h5>
                </Tooltip>
            </div>
        </>
    )
}

export default SubCampaign