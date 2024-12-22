import toUpper from 'lodash/toUpper'

const Title = ({ title }: { title: string }) => {
    return (
        <div className='w-full p-4 bg-white/10 rounded-t-xl text-center font-semibold text-xl'>
            {toUpper(title)}
        </div>
    )
}

export default Title