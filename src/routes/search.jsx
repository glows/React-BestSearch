import React from 'react'

import Head from "../components/Head"

import { useGetProductListQuery } from '../thunks/products/productsSlice'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { useParams } from "react-router-dom";
import { dateToEN } from "../ultils"



import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Search from '../components/Search';

import "./search.css"

const SearchPage = () => {
    let { keyword } = useParams();
    console.log("params", keyword)

    const { data, isFetching, isSuccess } = useGetProductListQuery(keyword)

    let products = data?.data?.product_trends

    console.log("data", products)
    // let charData = products?.search_msv
    const areaChart = (charData, index) => {
        let color = index % 2 === 0 ? "#8884d8" : "#34ac85"
        return <ResponsiveContainer width={'100%'} height={120}>
            <AreaChart
                width={'auto'}
                height={140}
                data={charData}
                margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <XAxis dataKey="name" /> */}
                {/* <YAxis /> */}
                {/* <Tooltip /> */}
                <Area type="monotone" dataKey="sv" stroke={color} fill={index % 2 === 0 ? "#8884d8" : "#34ac85"} />
            </AreaChart>
        </ResponsiveContainer>
    }

    let content
    if (isFetching) {
        content = <div className='productList'>
            {[1, 2, 3, 4].map((_, index) => <Grid key={index} {...{ xs: 24, sm: 12, md: 8, lg: 8 }}>

                <div className='loading-itemWrap'>
                    <Stack spacing={0.1}>
                        <Skeleton width={180} />
                        <Skeleton width={80} />
                        <Skeleton variant="rectangular" width={220} height={210} />
                    </Stack>
                </div></Grid>
            )}
        </div>
    } else if (isSuccess) {

        content = <div className='productList'>
            {
                products.map((_, index) => <Grid container key={index}>
                    <Grid key={index} {...{ xs: 24, sm: 12, md: 8, lg: 8 }} minHeight={160}>
                        <div className='itemWrap'>
                            {_.name.split(" ").length < 3 ? <div className='product_name'><span style={{ fontWeight: "bold" }}>{_.name}</span></div> : <div className='product_name'>{_.name.split(" ").map((_, index) => <span style={index % 2 !== 0 ? { fontWeight: "bold" } : {}} > {_}</span>)}</div>}
                            <div className='growth'> Growth  {_.growth + '%'}</div>

                            {areaChart(_.search_msv, index)}
                            <div className='chartTime'>
                                {dateToEN(_.search_msv[0].date) + '-' + dateToEN(_.search_msv[_.search_msv.length - 1].date)}
                            </div>
                        </div></Grid>
                </Grid>)
            }
        </div>
    }

    return (
        <>
            <Head>
                <Search initData={keyword} />
            </Head>
            <div className='content'>
                Related product trends
                <div className='productWrap'>
                    {content}
                </div>
            </div>
        </>
    )
}

export default SearchPage