import { AppBar, Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ViewAnswers from './ViewAnswers';

function ViewAnswersTab() {
    const local = "http://localhost:8080/";
    const server = "https://swd022-kyselypalvelu-back.herokuapp.com/";
    const url = local;

    let tabIndex = -1

    const [status, setStatus] = useState('fetching...')
    const [queries, setQueries] = useState([])
    const [tabNumber, setTabNumber] = useState(0)

    const fetchQueries = async () => {
        try {
            const connection = await fetch(url + 'queries')
            const json = await connection.json()
            setQueries(json)
            setStatus('')
        } catch (error) {
            
        }
    }

    const changeTab = (e, val) => {
        setTabNumber(val)
    }

    useEffect(() => {
        fetchQueries()
        // eslint-disable-next-line
    },[])

 
    if (status.length === 0) {
        return (
            <Box>
                <AppBar position="sticky">
                    <Tabs variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        value={tabNumber}
                        onChange={changeTab} 
                        sx={{ flexGrow: 1, textAling: 'center', backgroundColor: '#fff' }} 
                        textColor='primary'>
                        {queries.map(query => {
                            return (
                                <Tab key={query.id} sx={{width: '30%'}} label={query.title} icon={<AutoStoriesIcon color="primary"></AutoStoriesIcon>}></Tab>        
                                )
                            })}
                    </Tabs>
                </AppBar>
                {queries.map(query => {
                    tabIndex++
                    return (
                    <Box key={query.id}>
                        {tabNumber === tabIndex && <ViewAnswers id={query.id}></ViewAnswers>}
                    </Box>
                    )
                })}
                
            </Box>
        )
    }
    
}

export default ViewAnswersTab;