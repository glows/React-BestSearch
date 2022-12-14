import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput } from '@mui/material';
import './Search.css';

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';
import { useDebounceFn } from 'ahooks';


export default function SearchWrap(props) {
    let navigate = useNavigate();

    const [input, setInput] = useState(props?.initData ? props?.initData : "")

    const handleSubmit = (str) => {
        if (str.trim().length === 0 || str === '') return
        if (str.trim().split(' ').length > 0) {
            let param = str.split(" ").join('+')
            navigate(`/search/${param}`)
        } else {
            navigate(`/search/${str}`)
        }
    }

    const { run } = useDebounceFn(
        () => handleSubmit(input),
        {
            wait: 300,
        },
    );


    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                // 👇️ call submit function here
                handleSubmit(input)
            }
        };
        document.addEventListener("keydown", keyDownHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    })
    return (
        <>
            <div className='searchWrap'>
                <OutlinedInput
                    value={input}
                    size="small" onChange={(event) => {
                        setInput(event.target.value)
                    }} placeholder='Search for new products in 961k store' fullWidth={true} />

                <div className='searchBtn'>
                    <Button variant="outlined" size="large" onClick={run}> <SearchIcon /> </Button>
                </div>
            </div>

        </>
    );
}