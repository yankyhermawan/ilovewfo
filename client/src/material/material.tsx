import { useState } from 'react'
import { convertImage } from '../utility/imageToBase64'
const Material = () => {
    const [base64String, setBase64String] = useState<string | ArrayBuffer>('')

    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (file && file.length > 0) {
            const base64 = await convertImage(file[0])
            if (base64) {
                setBase64String(base64)
            }
        }
    }

    return (
        <>
            {base64String &&
                <img
                    src={base64String as string}
                />
            }
            <input type='file' accept='image/*' onChange={onChangeFile} />
            <button>Submit</button>
        </>
    )
}

export default Material