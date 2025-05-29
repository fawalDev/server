import type { Request } from 'express'
import multer, { type FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs'


const diskStorage = multer.diskStorage({
    // destination func defining the folder to save the file
    destination: (req, file, cb) => {
        const nowTt = Date.now() // timestamp
        const dt = new Date(nowTt) // datetime

        // organize folder according year/month/date/ to optimize image retrieve
        const dirPath = path.join('public', String(dt.getFullYear()), String(dt.getMonth()), String(dt.getDate()))

        if (!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath, { recursive: true })

        file.originalname = nowTt + '-' + file.originalname

        cb(null, dirPath)
    },
    // filename func naming the file in saving to fs
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})


/// List of image mimetypes: https://www.iana.org/assignments/media-types/media-types.xhtml#image
const imgMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

// Request handler in Express
function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    if (imgMimeTypes.includes(file.mimetype))
        cb(null, true)
    else
        cb(null, false)
}


export const multerImgMw = multer({
    storage: diskStorage,
    fileFilter: fileFilter
}).single('image')


export const multerNoneMw = multer().none()
