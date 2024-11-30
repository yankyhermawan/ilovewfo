const convertImage = (jpgFile: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(jpgFile)
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = (() => {
            reject(new Error('Could not read image'))
        })
    })
}

export { convertImage }