import { useState, useEffect } from 'react'
import { createCompany, getCompany, updateCompany } from './action'
import { Company as CompanyInterface } from './interface'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { Input, Button } from '../components/input'

const Company = () => {
    const [defaultCompanyData, setDefaultCompanyData] = useState<CompanyInterface>({})
    const [companyData, setCompanyData] = useState<CompanyInterface>({})

    const handleChangeCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setCompanyData(prev => ({
            ...prev,
            name
        }))
    }

    const handleGetData = async () => {
        const res = await getCompany({ user_id: 2 })
        if (res.data) {
            setCompanyData(res.data)
            setDefaultCompanyData(res.data)
        }
    }

    const handleButton = () => {
        if (!isEmpty(defaultCompanyData) && companyData.id && companyData.name) {
            updateCompany({ id: companyData.id, name: companyData.name })
            handleGetData()
        }
        else if (companyData.name) {
            createCompany({ name: companyData.name })
            handleGetData()
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])
    
    return (
        <div className='w-screen h-screen'>
            <div className='flex h-screen max-w-72 m-auto justify-center items-center'>
                <div className='flex flex-col h-fit gap-2 border border-black border-solid p-4 rounded-xl'>
                    <a href='/room/list' className='text-sm text-right'>View Room List &rArr;</a>
                    <div className='flex flex-col gap-8'>
                        <Input
                            onChange={handleChangeCompanyName}
                            label='Company Name'
                            value={companyData.name}
                        />
                        <Button
                            placeholder={isEmpty(defaultCompanyData) ? 'Create' : 'Update'}
                            disabled={isEqual(defaultCompanyData, companyData)}
                            onClick={handleButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Company