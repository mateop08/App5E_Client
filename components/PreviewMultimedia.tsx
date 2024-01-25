
import mime from 'mime'
import PreviewImage from './PreviewImage'
import React from 'react'
import PreviewPDF from './PreviewPDF'
import PreviewVideo from './PreviewVideo'
import PreviewAudio from './PreviewAudio'
import { configApp } from '@/config';
const baseURL = configApp.domain + '/' 

interface PreviewMultimediaFC {
    fileName: string,
    collapse: boolean
}

interface RenderType {
    mimeType: string,
    // eslint-disable-next-line
    Component: React.FC<any>
}

const RenderTypesList: RenderType[] = [
    {
        mimeType: 'image/jpeg',
        Component: PreviewImage
    },
    {
        mimeType: 'image/jpg',
        Component: PreviewImage
    },
    {
        mimeType: 'image/png',
        Component: PreviewImage
    },
    {
        mimeType: 'application/pdf',
        Component: PreviewPDF
    },
    {
        mimeType: 'video/mp4',
        Component: PreviewVideo
    },
    {
        mimeType: 'audio/mpeg',
        Component: PreviewAudio
    }
]

const getPreviewComponent = (mimeType: string) => {
    return RenderTypesList.find((e) => e.mimeType === mimeType)
}

const PreviewMultimedia: React.FC<PreviewMultimediaFC> = ({fileName, collapse}) => {
    
    const extension = fileName?.split('.').pop()
    try {
        if (extension === undefined) throw("No es posbile leer el tipo de archivo")
        const type = mime.getType(extension)
        if (type === null) throw("No es posbile leer el tipo de archivo")
        const Component = getPreviewComponent(type)?.Component
        const source = baseURL + fileName
        if (Component !== undefined) return (<Component source={source} collapse={collapse}/>)
    } catch (error) {
        return <span>Error al cargar archivo</span>
    }
    
}

export default PreviewMultimedia


