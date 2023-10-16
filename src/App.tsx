import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Button, Divider, Grid, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import SubCampaign from './components/SubCampaign';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface AdsInterface {
  id: number,
  name: string,
  quantity: number,
}
export interface SubCampaignInterface {
  id: number,
  title: string,
  isActive: boolean,
  quantity: number,
  ads: AdsInterface[]
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const App = () => {

  const [valueTab, setValueTab] = React.useState(0);
  const [subCampaigns, setSubCampaigns] = useState<SubCampaignInterface[]>([{
    id: 1,
    title: 'Chiến dịch con 1',
    isActive: false,
    quantity: 0,
    ads: [
      {
        id: Math.random(),
        name: 'Quảng cáo 1',
        quantity: 0
      },

    ]
}])
  const [currentCampaign, setCurrentCampaign] = useState(subCampaigns[0] || null)

  const [selected, setSelected] = useState<string[]>([])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const onSubmitHandler = (values: any) => {
    alert('Thành công') 
  }

  useEffect(() => {
    if (errors.campaignName || errors.subCampaignName) {
      alert('Vui lòng điền đúng và đầy đủ thông tin') 
    }
  }, [errors.campaignName, errors.subCampaignName])

  

const handleAddNew = () => {
  setCurrentCampaign({
    id: subCampaigns.length + 1,
    title: `Chiến dịch con ${subCampaigns.length + 1}`,
    isActive: true,
    quantity: 0,
    ads: [
      {
        id: Math.random(),
        name: 'Quảng cáo 1',
        quantity: 0
      },

    ]
  })
    setSubCampaigns([...subCampaigns, {
        id: subCampaigns.length + 1,
        title: `Chiến dịch con ${subCampaigns.length + 1}`,
        isActive: true,
        quantity: 0,
        ads: [
          {
            id: Math.random(),
            name: 'Quảng cáo 1',
            quantity: 0
          },
    
        ]
    }])

}

const handleSelectCurrentCampaign = (currentC: SubCampaignInterface) => {
  setCurrentCampaign(currentC)
}

useEffect(() => {
    if (currentCampaign) {
      setValue('subCampaignName', currentCampaign.title)
      setValue('subCampaignActive', currentCampaign.isActive)
      for (let index = 0; index < currentCampaign.ads.length; index++) {
        const element = currentCampaign.ads[index];
          setValue(`subCampaignAdsName${index}`, element.name)
          setValue(`subCampaignAdsNumber${index}`, element.quantity)
      }
     
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentCampaign])


useEffect(() => {
  if (selected.length > 0) {
    setValue('checkAll', true)
  }else{
    setValue('checkAll', false)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selected])



const handelChangeActive = (e : any) => {
  const newItem = {
    ...currentCampaign,
    isActive: e.target.checked
  }
  const newArray = subCampaigns
  newArray.splice((currentCampaign.id - 1) , 1 ,  newItem)
  setCurrentCampaign(newItem)
  setSubCampaigns(newArray)
}

const handelChangeName = (e: any) => {
  const newItem = {
    ...currentCampaign,
    title: e.target.value
  }

  const newArray = subCampaigns
  newArray.splice((currentCampaign.id - 1) , 1 ,  newItem)
  setSubCampaigns(newArray)
  setCurrentCampaign(newItem)
}

const handleAddAds = () => {
  const newItem = {
    ...currentCampaign,
    ads: [
      ...currentCampaign.ads,
      {
        id: Math.random(),
        name: `Quảng cáo ${currentCampaign.ads.length + 1}`,
        quantity: 0
      }
    ]
  }
  const newArray = subCampaigns
  newArray.splice((currentCampaign.id - 1) , 1 ,  newItem)
  setCurrentCampaign(newItem)
  setSubCampaigns(newArray)
}

useEffect(() => {
  for (let index = 0; index < currentCampaign.ads.length; index++) {
    setValue(`subCampaignAdsCheck${index}`, false)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentCampaign.ads.length])

const handelChangeAll = (e: any) => {
  if (e.target.checked) {
    setSelected(currentCampaign?.ads?.map((item: AdsInterface) => item?.id.toString()))
    for (let index = 0; index < currentCampaign.ads.length; index++) {
      setValue(`subCampaignAdsCheck${index}`, true)
    }
  }else{
    setSelected([])
    for (let index = 0; index < currentCampaign.ads.length; index++) {
      setValue(`subCampaignAdsCheck${index}`, false)
    }
  }

}

const handleSelectAds = (id: number) => {
  if (!selected.includes(id.toString())) {
    setSelected([...selected, id.toString()])
  }else{
    const newSelect = selected.filter(item => item !== id.toString());
    setSelected(newSelect)
  }
  
}

const handleChangeAdsName = (e : any, item: AdsInterface) => {
  const newItemAds = {
    ...item,
    name: e.target.value
  }

  const newArray = currentCampaign.ads
  newArray.splice((item.id - 1) , 1 ,  newItemAds)

  const newItemSubCampaign = {
    ...currentCampaign,
    ads: [...newArray]
  }

  const newArrayCampaigns = subCampaigns
  newArrayCampaigns.splice((currentCampaign.id - 1) , 1 ,  newItemSubCampaign)
  setSubCampaigns(newArrayCampaigns)
  setCurrentCampaign(newItemSubCampaign)
}

const handleChangeAdsQuantity = (e: any, item: AdsInterface) => {
  const newItemAds = {
    ...item,
    quantity: e.target.value
  }

  const newArray = currentCampaign.ads
  newArray.splice((currentCampaign.ads.indexOf(item)) , 1 ,  newItemAds)

  const newItemSubCampaign = {
    ...currentCampaign,
    ads: [...newArray]
  }

  const newArrayCampaigns = subCampaigns
  newArrayCampaigns.splice((currentCampaign.id - 1) , 1 ,  newItemSubCampaign)
  setSubCampaigns(newArrayCampaigns)
  setCurrentCampaign(newItemSubCampaign)
}

const handleDeleteAds = (id: number) => {
  const newArray = currentCampaign.ads.filter(item => item.id.toString() !== id.toString())
  const newItemSubCampaign = {
    ...currentCampaign,
    ads: [...newArray]
  }
  const newArrayCampaigns = subCampaigns
  newArrayCampaigns.splice((currentCampaign.id - 1) , 1 ,  newItemSubCampaign)
  setSubCampaigns(newArrayCampaigns)
  setCurrentCampaign(newItemSubCampaign)

}

const handleMultiDeleteAds  = () => {

  const newArray = currentCampaign.ads
    for( let i = 0; i < selected.length; i++){ 
      let index = currentCampaign.ads.findIndex(x => x.id.toString() === selected[i].toString())
      newArray.splice(index, 1)
    }

  const newItemSubCampaign = {
    ...currentCampaign,
    ads: [...newArray]
  }

  const newArrayCampaigns = subCampaigns
  newArrayCampaigns.splice((currentCampaign.id - 1) , 1 ,  newItemSubCampaign)
  setSubCampaigns(newArrayCampaigns)
  setCurrentCampaign(newItemSubCampaign)

  for (let index = 0; index < currentCampaign.ads.length; index++) {
      setValue(`subCampaignAdsCheck${index}`, false)
  }
  setSelected([])
  setValue('checkAll', false)

}

console.log('select', selected)

  return (
    <>
        <form action="" onSubmit={handleSubmit(onSubmitHandler)} style={{paddingBottom: 30}}>
          <Box sx={{ width: '100%' }}>
            <Container maxWidth="xl">
              <div style={{paddingTop:10, display:'flex', justifyContent:'flex-end'}}>
                <Button variant="contained" type='submit' style={{paddingTop: 10}}>Submit</Button>
              </div>
            </Container>
            <Divider style={{height:2, color:'black', paddingTop: 10, paddingBottom: 10}}/>
            <Container maxWidth="xl" style={{paddingTop: 20}}>
                <div style={{border: '1px solid #e6e4e4', borderTop: 'none',boxShadow: '0px 3px 6px #e6e4e4'}}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Thông tin" {...a11yProps(0)} />
                      <Tab label="Chiến dịch con" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={valueTab} index={0}>
                    <div style={{display: 'inline-grid', width:'100%'}}>
                      <FormControl >
                        <TextField error={errors.campaignName && !errors.campaignName?.message} {...register('campaignName', {
                          required: true,
                        })} name='campaignName'  label="Tên chiến dịch*" variant="standard" helperText={errors.campaignName && !errors.campaignName?.message ? 'Dư liệu không hợp lệ' : null} />
                      </FormControl>
                        <TextField {...register('campaignDescribe')}  label="Mô tả" variant="standard" />
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={valueTab} index={1}>
                    <div className="sub-campaigns-content" style={{display: 'flex', width: '100%',}}>
                        <div style={{paddingRight: 24}}>
                            <IconButton aria-label="delete" size="large" color="error" style={{backgroundColor: '#ececec'}} onClick={handleAddNew}>
                                <AddIcon fontSize="inherit" color="error"/>
                            </IconButton>
                        </div>
                        {subCampaigns && subCampaigns.length > 0 && subCampaigns.map((item: any, index: number) => {
                            return (
                                <SubCampaign id={item?.id} currentCampaign={currentCampaign}  title={item?.title} isActive={item?.isActive} quantity={item?.quantity} key={index} handleSelect={() => handleSelectCurrentCampaign(item)}/>
                            )
                        })}
                        
                    </div>
                    <Grid container spacing={2} style={{paddingTop: 20}}>
                      <Grid item xs={8}>
                        <FormControl style={{width: '100%'}}>
                        <TextField id='subCampaignName'  error={errors.subCampaignName && !errors.subCampaignName?.message} {...register('subCampaignName', {
                          required: true,
                        })} name='subCampaignName'  label="Tên chiến dịch con*" variant="standard" helperText={errors.subCampaignName && !errors.subCampaignName?.message ? 'Dư liệu không hợp lệ' : null}  onChange={handelChangeName} />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <TextField id='subCampaignActive' type='checkbox' {...register('subCampaignActive')} name='subCampaignActive'  className='check-box-input' style={{paddingRight: 10}} onChange={handelChangeActive}/>
                        <span>Đang hoạt động</span>
                      </Grid>
                    </Grid>
                    <h3>DANH SÁCH QUẢNG CÁO</h3>

                    <Grid container spacing={2} style={{paddingTop: 20}}>
                      <Grid item xs={1}>
                        
                        {selected.length === currentCampaign.ads.length || selected.length === 0 ? 
                        <TextField id='checkAll' type='checkbox' {...register('checkAll')} name='checkAll'  className='check-box-input'  onChange={handelChangeAll}/>
                        : 
                        <IconButton aria-label="checkAll" onClick={handelChangeAll} style={{padding: 0}}>
                            <IndeterminateCheckBoxIcon />
                        </IconButton> 
                        }
                      </Grid>
                      <Grid item xs={4}>
                        {selected.length > 0 ? 
                        <IconButton aria-label="delete" onClick={handleMultiDeleteAds}>
                            <DeleteIcon />
                        </IconButton>  : 'Tên quảng cáo*'}
                        
                      </Grid>
                      <Grid item xs={5}>
                        {selected.length !== 0 ? null : 'Tên quảng cáo*'}
                      </Grid>
                      <Grid item xs={2} style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddAds}>
                          Thêm
                        </Button>
                      </Grid>
                    </Grid>

                    {currentCampaign.ads.length > 0 && currentCampaign.ads.map((item, index) => {
                      return (
                        <Grid container spacing={2} style={{paddingTop: 20}}>
                          <Grid item xs={1}>
                            <TextField type='checkbox' {...register(`subCampaignAdsCheck${index}`)} name={`subCampaignAdsCheck${index}`}  className='check-box-input' onChange={() => handleSelectAds(item?.id)}/>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField style={{width: '100%'}} id={`subCampaignAdsName${index}`} {...register(`subCampaignAdsName${index}`)} name={`subCampaignAdsName${index}`}  variant="standard"  onChange={(e) => handleChangeAdsName(e, item)}/>
                          </Grid>
                          <Grid item xs={5}>
                            <TextField style={{width: '100%'}} type='number' {...register(`subCampaignAdsNumber${index}`)} name={`subCampaignAdsNumber${index}`} variant="standard"  className='check-box-input' onChange={(e) => handleChangeAdsQuantity(e, item)}/>
                          </Grid>
                          <Grid item xs={2} style={{display:'flex', justifyContent:'flex-end'}}>
                          <IconButton aria-label="delete" onClick={() => handleDeleteAds(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                          </Grid>
                      </Grid>
                      )
                    })}
                  </CustomTabPanel>
                </div>
              </Container>
            </Box>
        </form>   
    </>
  );
}

export default App;
