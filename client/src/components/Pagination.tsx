import ceil from 'lodash/ceil'
import map from 'lodash/map'
import slice from 'lodash/slice'
import { useState } from 'react'
import noop from 'lodash/noop'

interface PaginationInterface {
    limit: number
    page: number
    total: number
    onChange: (page: number) => (e: React.MouseEvent<HTMLDivElement>) => void
}

const Pagination = (props: PaginationInterface) => {
    const [slide, setSlide] = useState(0)
    const { limit, page: currentPage, total, onChange } = props
    const totalPagination = ceil(total / limit)
    const paginationArray = new Array(totalPagination).fill(0).map((_, key) => key + 1)
    const slicedPagination = slice(paginationArray, slide * 5, (slide + 1) * 5)
    const handleSlide = (type: 'add' | 'sub') => () => {
        if (type === 'add') {
            setSlide(prevSlide => prevSlide + 1)
        }
        if (type === 'sub') {
            setSlide(prevSlide => prevSlide - 1)
        }
    }
    const isLeftArrowVisible = slide !== 0
    const isRightArrowVisible = slide < ceil(paginationArray.length / 5) - 1
    const additionalClass = 'border border-solid border-black cursor-pointer hover:bg-blue-200'
    const activePageClass = 'bg-blue-200'

    return (
        <div className='flex flex-row gap-4'>
            <div
                className={`${isLeftArrowVisible ? additionalClass : ''} text-center h-6 w-6`}
                onClick={isLeftArrowVisible ? handleSlide('sub') : noop}
            >
                {isLeftArrowVisible ? <>&laquo;</> : ''}
            </div>
            {map(slicedPagination, page => (
                <div
                    className={`border border-solid border-black w-6 text-center cursor-pointer ${currentPage === page - 1 ? activePageClass : `hover:bg-blue-200`}`}
                    key={page-1}
                    onClick={onChange(page-1)}
                >
                    {page}
                </div>
            ))}
            <div
                className={`${isRightArrowVisible ? additionalClass : ''} text-center h-6 w-6`}
                onClick={handleSlide('add')}
            >
                {isRightArrowVisible ? <>&raquo;</> : ''}
            </div>
        </div>
    )
}

export default Pagination